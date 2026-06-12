import React, { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Line } from '@react-three/drei'
import * as THREE from 'three'
import './cosmic.css'

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

// ---------------- comet on a scroll-driven trajectory ----------------

const COMET_HEAD_STOPS = [
    [0, 'rgba(240, 252, 255, 1)'],
    [0.18, 'rgba(170, 226, 255, 0.7)'],
    [0.5, 'rgba(120, 190, 255, 0.18)'],
    [1, 'rgba(120, 190, 255, 0)'],
]

const COMET_TRAIL_STOPS = [
    [0, 'rgba(170, 226, 255, 0.85)'],
    [0.5, 'rgba(130, 180, 255, 0.2)'],
    [1, 'rgba(130, 180, 255, 0)'],
]

const TRAIL_COUNT = 26
const TRAIL_SPACING = 0.011

const scrollProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    return max > 0 ? window.scrollY / max : 0
}

const Comet = ({ isMobile }) => {
    const head = useRef()
    const trailRefs = useRef([])
    const progress = useRef(0)

    const curve = useMemo(() => {
        const points = isMobile
            ? [
                new THREE.Vector3(-5, 6, -4),
                new THREE.Vector3(-2.2, 3, -3),
                new THREE.Vector3(1.6, 0, -2.5),
                new THREE.Vector3(-1.5, -3, -3.5),
                new THREE.Vector3(4, -6, -5),
            ]
            : [
                new THREE.Vector3(-11, 5, -4),
                new THREE.Vector3(-4.5, 2.6, -2.5),
                new THREE.Vector3(1.5, 0.6, -2),
                new THREE.Vector3(7, -1.8, -3),
                new THREE.Vector3(12.5, -4.5, -6),
            ]
        return new THREE.CatmullRomCurve3(points)
    }, [isMobile])

    const pathPoints = useMemo(() => curve.getPoints(140), [curve])

    const headTexture = useMemo(() => makeRadialTexture(COMET_HEAD_STOPS), [])
    const trailTexture = useMemo(() => makeRadialTexture(COMET_TRAIL_STOPS), [])

    useFrame((state, delta) => {
        // frame-rate independent easing toward the scroll position
        progress.current += (scrollProgress() - progress.current) * Math.min(1, delta * 4.5)
        const t = THREE.MathUtils.clamp(progress.current, 0, 1)

        if (head.current) head.current.position.copy(curve.getPoint(t))

        for (let i = 0; i < TRAIL_COUNT; i++) {
            const sprite = trailRefs.current[i]
            if (!sprite) continue
            const ti = t - (i + 1) * TRAIL_SPACING
            const fade = 1 - (i + 1) / TRAIL_COUNT
            if (ti <= 0) {
                sprite.material.opacity = 0
                continue
            }
            sprite.position.copy(curve.getPoint(ti))
            sprite.material.opacity = 0.5 * fade
            const s = 0.55 * fade + 0.06
            sprite.scale.set(s, s, 1)
        }
    })

    return (
        <group>
            <Line
                points={pathPoints}
                color="#9fd8ff"
                transparent
                opacity={0.12}
                dashed
                dashSize={0.3}
                gapSize={0.22}
                lineWidth={1}
            />
            <sprite ref={head} scale={[1.5, 1.5, 1]}>
                <spriteMaterial
                    map={headTexture}
                    transparent
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </sprite>
            {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
                <sprite key={i} ref={(el) => (trailRefs.current[i] = el)}>
                    <spriteMaterial
                        map={trailTexture}
                        transparent
                        opacity={0}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </sprite>
            ))}
        </group>
    )
}

// Eases the camera toward the pointer and dips it as the page scrolls.
const Rig = () => {
    const mouse = useRef({ x: 0, y: 0 })
    const smoothScroll = useRef(0)

    useEffect(() => {
        const onMove = (event) => {
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = (event.clientY / window.innerHeight) * 2 - 1
        }
        window.addEventListener('mousemove', onMove)
        return () => window.removeEventListener('mousemove', onMove)
    }, [])

    useFrame((state, delta) => {
        const camera = state.camera
        smoothScroll.current += (window.scrollY - smoothScroll.current) * Math.min(1, delta * 5)
        const targetX = mouse.current.x * 0.5
        const targetY = -mouse.current.y * 0.3 - Math.min(smoothScroll.current * 0.0006, 1)
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
                <Comet isMobile={isMobile} />
                <Rig />
            </Canvas>
        </div>
    )
}
