import React, { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { Stars, shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import './cosmic.css'

// Banded gas-giant surface with day/night terminator and golden rim light.
const PlanetMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorDeep: new THREE.Color('#120e2e'),
        uColorBand: new THREE.Color('#4633a8'),
        uColorHaze: new THREE.Color('#8b6cff'),
        uRim: new THREE.Color('#ffc878'),
        uLightDir: new THREE.Vector3(-2.5, 1.2, 2.0),
    },
    `
    varying vec3 vNormalW;
    varying vec3 vNormalV;
    varying vec2 vUv;
    void main() {
        vUv = uv;
        vNormalW = normalize(mat3(modelMatrix) * normal);
        vNormalV = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    `
    uniform float uTime;
    uniform vec3 uColorDeep;
    uniform vec3 uColorBand;
    uniform vec3 uColorHaze;
    uniform vec3 uRim;
    uniform vec3 uLightDir;
    varying vec3 vNormalW;
    varying vec3 vNormalV;
    varying vec2 vUv;

    float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }
    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
            mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
            u.y
        );
    }

    void main() {
        float drift = uTime * 0.012;
        float n = noise(vec2(vUv.x * 5.0 + drift, vUv.y * 9.0));
        float bands = sin(vUv.y * 24.0 + n * 4.0 + uTime * 0.05) * 0.5 + 0.5;
        bands = smoothstep(0.15, 0.85, bands);
        vec3 base = mix(uColorDeep, uColorBand, bands);
        base = mix(base, uColorHaze, noise(vec2(vUv.x * 3.0 - drift, vUv.y * 4.0)) * 0.25);

        float diff = clamp(dot(vNormalW, normalize(uLightDir)), 0.0, 1.0);
        vec3 col = base * (0.16 + diff * 1.25);

        float fres = pow(1.0 - clamp(dot(vNormalV, vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 2.6);
        col += uRim * fres * (0.35 + diff * 0.85);

        gl_FragColor = vec4(col, 1.0);
    }
    `
)

// Saturn-style ring: gold near the planet fading to violet, with radial streaks.
const RingMaterial = shaderMaterial(
    {
        uColorA: new THREE.Color('#ffc878'),
        uColorB: new THREE.Color('#8b6cff'),
    },
    `
    varying vec3 vPos;
    void main() {
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    `
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying vec3 vPos;

    float hash(float p) {
        return fract(sin(p * 127.1) * 43758.5453123);
    }

    void main() {
        float r = length(vPos.xy);
        float band = smoothstep(2.6, 2.78, r) * (1.0 - smoothstep(4.35, 4.6, r));
        float gap = 1.0 - smoothstep(3.35, 3.42, r) * (1.0 - smoothstep(3.52, 3.6, r));
        float streaks = 0.45 + 0.55 * hash(floor(r * 30.0));
        vec3 col = mix(uColorA, uColorB, smoothstep(2.6, 4.6, r));
        float alpha = band * gap * streaks * 0.55;
        gl_FragColor = vec4(col, alpha);
    }
    `
)

extend({ PlanetMaterial, RingMaterial })

const makeRadialTexture = (stops) => {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    stops.forEach(([offset, color]) => gradient.addColorStop(offset, color))
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    return new THREE.CanvasTexture(canvas)
}

const GlowSprite = ({ position, scale, stops, opacity = 1 }) => {
    const texture = useMemo(() => makeRadialTexture(stops), [stops])
    return (
        <sprite position={position} scale={[scale, scale, 1]}>
            <spriteMaterial
                map={texture}
                transparent
                opacity={opacity}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </sprite>
    )
}

const HALO_STOPS = [
    [0, 'rgba(139, 108, 255, 0.5)'],
    [0.5, 'rgba(139, 108, 255, 0.16)'],
    [1, 'rgba(139, 108, 255, 0)'],
]

const Planet = ({ isMobile }) => {
    const group = useRef()
    const sphere = useRef()
    const planetMat = useRef()
    const moon = useRef()

    const basePosition = useMemo(
        () => (isMobile ? [0, 2.7, -3.4] : [3.6, -0.5, -1.2]),
        [isMobile]
    )

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime
        if (sphere.current) sphere.current.rotation.y += delta * 0.05
        if (planetMat.current) planetMat.current.uTime = t
        if (group.current) {
            group.current.position.y =
                basePosition[1] +
                Math.sin(t * 0.35) * 0.12 +
                window.scrollY * (isMobile ? 0.0024 : 0.0014)
            group.current.rotation.z = -0.1 + Math.sin(t * 0.08) * 0.05
        }
        if (moon.current) {
            moon.current.position.set(
                Math.cos(t * 0.22) * 3.6,
                Math.sin(t * 0.22) * 0.5,
                Math.sin(t * 0.22) * 1.6
            )
        }
    })

    return (
        <group ref={group} position={basePosition} scale={isMobile ? 0.6 : 1}>
            <GlowSprite position={[0, 0, -0.8]} scale={7.2} stops={HALO_STOPS} />
            <mesh ref={sphere}>
                <sphereGeometry args={[2, 64, 64]} />
                <planetMaterial ref={planetMat} key={PlanetMaterial.key} />
            </mesh>
            <mesh rotation={[Math.PI / 2.35, 0, 0.4]}>
                <ringMaterial key={RingMaterial.key} transparent side={THREE.DoubleSide} depthWrite={false} />
                <ringGeometry args={[2.6, 4.6, 128]} />
            </mesh>
            <mesh ref={moon}>
                <sphereGeometry args={[0.22, 24, 24]} />
                <meshStandardMaterial color="#cfc6bb" roughness={0.9} />
            </mesh>
        </group>
    )
}

// Eases the camera toward the pointer and dips it as the page scrolls.
const Rig = () => {
    const mouse = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const onMove = (event) => {
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = (event.clientY / window.innerHeight) * 2 - 1
        }
        window.addEventListener('mousemove', onMove)
        return () => window.removeEventListener('mousemove', onMove)
    }, [])

    useFrame((state) => {
        const camera = state.camera
        const targetX = mouse.current.x * 0.5
        const targetY = -mouse.current.y * 0.3 - Math.min(window.scrollY * 0.0006, 1)
        camera.position.x += (targetX - camera.position.x) * 0.045
        camera.position.y += (targetY - camera.position.y) * 0.045
        camera.lookAt(0, 0, -1)
    })

    return null
}

const SUN_STOPS = [
    [0, 'rgba(255, 232, 196, 0.9)'],
    [0.12, 'rgba(255, 200, 120, 0.5)'],
    [0.4, 'rgba(255, 170, 80, 0.12)'],
    [1, 'rgba(255, 170, 80, 0)'],
]

const NEBULA_GOLD_STOPS = [
    [0, 'rgba(255, 180, 87, 0.28)'],
    [0.4, 'rgba(255, 180, 87, 0.1)'],
    [1, 'rgba(255, 180, 87, 0)'],
]

const NEBULA_VIOLET_STOPS = [
    [0, 'rgba(123, 92, 255, 0.3)'],
    [0.4, 'rgba(123, 92, 255, 0.1)'],
    [1, 'rgba(123, 92, 255, 0)'],
]

const NEBULA_TEAL_STOPS = [
    [0, 'rgba(45, 212, 255, 0.16)'],
    [0.5, 'rgba(45, 212, 255, 0.05)'],
    [1, 'rgba(45, 212, 255, 0)'],
]

export const CosmicScene = () => {
    const isMobile = window.innerWidth <= 900
    return (
        <div className="cosmicSceneFixed" aria-hidden="true">
            <Canvas
                dpr={[1, isMobile ? 1.5 : 1.75]}
                camera={{ position: [0, 0, 9], fov: 48 }}
                gl={{ antialias: true }}
            >
                <color attach="background" args={['#030210']} />
                <ambientLight intensity={0.3} />
                <directionalLight position={[-6, 3, 4]} intensity={1.6} color="#ffd9a6" />
                <Stars
                    radius={240}
                    depth={70}
                    count={isMobile ? 2200 : 4500}
                    factor={5}
                    saturation={0}
                    fade
                    speed={0.6}
                />
                <GlowSprite position={[-10, 5, -16]} scale={12} stops={SUN_STOPS} />
                <GlowSprite position={[-8, 3, -18]} scale={20} stops={NEBULA_GOLD_STOPS} />
                <GlowSprite position={[9, -5, -18]} scale={24} stops={NEBULA_VIOLET_STOPS} />
                <GlowSprite position={[2, 8, -20]} scale={17} stops={NEBULA_TEAL_STOPS} />
                <Planet isMobile={isMobile} />
                <Rig />
            </Canvas>
        </div>
    )
}
