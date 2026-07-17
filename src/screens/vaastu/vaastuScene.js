import React, { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { GlowSprite } from '../../components/cosmic/CosmicScene'
import '../../components/cosmic/cosmic.css'

// Eased page-scroll progress shared by every animated part.
const scrollProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    return max > 0 ? window.scrollY / max : 0
}

// How far through the page each piece of the house assembles.
const STAGES = {
    platform: [0.02, 0.12],
    walls: [0.1, 0.28],
    roof: [0.26, 0.42],
    door: [0.4, 0.52],
    windows: [0.5, 0.64],
    chimney: [0.62, 0.74],
    compass: [0.74, 0.9],
}

const stage = (p, [start, end]) => THREE.MathUtils.smoothstep(p, start, end)

const WIRE_WHITE = '#e9e4d8'
const WIRE_GOLD = '#f0b85c'

const Part = React.forwardRef(({ position, rotation, color = WIRE_WHITE, children }, ref) => (
    <mesh ref={ref} position={position} rotation={rotation}>
        {children}
        <meshBasicMaterial wireframe transparent opacity={0} color={color} />
    </mesh>
))

const House = ({ isMobile }) => {
    const group = useRef()
    const progress = useRef(0)

    const platform = useRef()
    const walls = useRef()
    const roof = useRef()
    const door = useRef()
    const windowRefs = useRef([])
    const chimneyRefs = useRef([])
    const compassRing = useRef()
    const compassMarks = useRef([])
    const glow = useRef()

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime
        progress.current += (scrollProgress() - progress.current) * Math.min(1, delta * 4.5)
        const p = progress.current

        if (group.current) {
            group.current.rotation.y = t * 0.12 + p * 1.2
        }

        const fade = (ref, range) => {
            if (ref.current) ref.current.material.opacity = stage(p, range)
        }

        // platform: faintly present from the start, solidifies on first scroll
        if (platform.current) {
            const s = stage(p, STAGES.platform)
            platform.current.material.opacity = 0.3 + s * 0.7
            platform.current.position.y = -1.69 - (1 - s) * 0.5
        }
        // walls grow upward
        if (walls.current) {
            const s = stage(p, STAGES.walls)
            walls.current.material.opacity = s
            walls.current.scale.y = 0.05 + s * 0.95
            walls.current.position.y = -1.5 + (0.05 + s * 0.95) * 1.5
        }
        // roof drops into place
        if (roof.current) {
            const s = stage(p, STAGES.roof)
            roof.current.material.opacity = s
            roof.current.position.y = 2.5 + (1 - s) * 2.2
        }
        fade(door, STAGES.door)
        windowRefs.current.forEach((ref) => {
            if (ref) ref.material.opacity = stage(p, STAGES.windows)
        })
        chimneyRefs.current.forEach((ref) => {
            if (ref) ref.material.opacity = stage(p, STAGES.chimney)
        })

        // compass ring spins up at the finale
        const c = stage(p, STAGES.compass)
        if (compassRing.current) {
            compassRing.current.material.opacity = c * 0.7
            compassRing.current.rotation.z = t * 0.15
        }
        compassMarks.current.forEach((ref) => {
            if (ref) ref.material.opacity = c * 0.9
        })
        if (glow.current) {
            glow.current.material.opacity = c * 0.28
        }
    })

    return (
        <group
            ref={group}
            position={isMobile ? [-2.7, 0.5, -4.2] : [3.3, -0.4, 0]}
            scale={isMobile ? 0.5 : 0.72}
        >
            {/* foundation platform */}
            <Part ref={platform} position={[0, -1.69, 0]} color={WIRE_GOLD}>
                <boxGeometry args={[5.4, 0.18, 5.4]} />
            </Part>

            {/* main walls */}
            <Part ref={walls} position={[0, 0, 0]}>
                <boxGeometry args={[4, 3, 4]} />
            </Part>

            {/* roof */}
            <Part ref={roof} position={[0, 2.5, 0]} rotation={[0, Math.PI / 4, 0]} color={WIRE_GOLD}>
                <coneGeometry args={[3.2, 2, 4]} />
            </Part>

            {/* door */}
            <Part ref={door} position={[0, -0.75, 2.01]}>
                <boxGeometry args={[1, 1.5, 0.08]} />
            </Part>

            {/* windows */}
            {[
                [-1.3, 0.55, 2.01, false],
                [1.3, 0.55, 2.01, false],
                [-2.01, 0.55, 0, true],
                [2.01, 0.55, 0, true],
            ].map(([x, y, z, side], index) => (
                <mesh key={index} ref={(el) => (windowRefs.current[index] = el)} position={[x, y, z]}>
                    <boxGeometry args={side ? [0.08, 0.8, 0.8] : [0.8, 0.8, 0.08]} />
                    <meshBasicMaterial wireframe transparent opacity={0} color={WIRE_WHITE} />
                </mesh>
            ))}

            {/* chimney */}
            <mesh ref={(el) => (chimneyRefs.current[0] = el)} position={[1.1, 3, -1.1]}>
                <boxGeometry args={[0.5, 1.2, 0.5]} />
                <meshBasicMaterial wireframe transparent opacity={0} color={WIRE_WHITE} />
            </mesh>
            <mesh ref={(el) => (chimneyRefs.current[1] = el)} position={[1.1, 3.65, -1.1]}>
                <boxGeometry args={[0.62, 0.12, 0.62]} />
                <meshBasicMaterial wireframe transparent opacity={0} color={WIRE_GOLD} />
            </mesh>

            {/* vaastu compass ring + cardinal markers */}
            <mesh ref={compassRing} position={[0, -1.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[3.7, 3.78, 72]} />
                <meshBasicMaterial transparent opacity={0} color={WIRE_GOLD} side={THREE.DoubleSide} />
            </mesh>
            {[
                [0, -3.74],
                [3.74, 0],
                [0, 3.74],
                [-3.74, 0],
            ].map(([x, z], index) => (
                <mesh key={index} ref={(el) => (compassMarks.current[index] = el)} position={[x, -1.55, z]}>
                    <sphereGeometry args={[0.09, 12, 12]} />
                    <meshBasicMaterial transparent opacity={0} color={WIRE_GOLD} />
                </mesh>
            ))}

            {/* soft ground glow for the finale */}
            <sprite ref={glow} position={[0, -1.4, 0]} scale={[9, 4.5, 1]}>
                <spriteMaterial
                    transparent
                    opacity={0}
                    color="#f0b85c"
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </sprite>
        </group>
    )
}

// Gentle pointer parallax, mirroring the landing scene's camera feel.
const Rig = ({ isMobile }) => {
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
        const targetX = 7.5 + mouse.current.x * 0.6
        const targetY = 4.4 - mouse.current.y * 0.4
        camera.position.x += (targetX - camera.position.x) * 0.04
        camera.position.y += (targetY - camera.position.y) * 0.04
        camera.lookAt(isMobile ? 0 : 1.1, 0.3, 0)
    })

    return null
}

const NEBULA_VIOLET_STOPS = [
    [0, 'rgba(123, 92, 255, 0.25)'],
    [0.4, 'rgba(123, 92, 255, 0.08)'],
    [1, 'rgba(123, 92, 255, 0)'],
]

const NEBULA_GOLD_STOPS = [
    [0, 'rgba(255, 180, 87, 0.22)'],
    [0.4, 'rgba(255, 180, 87, 0.08)'],
    [1, 'rgba(255, 180, 87, 0)'],
]

export const VaastuScene = () => {
    const isMobile = window.innerWidth <= 900
    return (
        <div className="cosmicSceneFixed" aria-hidden="true">
            <Canvas
                dpr={[1, isMobile ? 1.5 : 1.75]}
                camera={{ position: [7.5, 4.4, 11], fov: 46 }}
                gl={{ antialias: true }}
            >
                <color attach="background" args={['#030210']} />
                <Stars
                    radius={220}
                    depth={60}
                    count={isMobile ? 1500 : 3000}
                    factor={4.5}
                    saturation={0}
                    fade
                    speed={0.5}
                />
                <GlowSprite position={[-9, 6, -16]} scale={18} stops={NEBULA_GOLD_STOPS} />
                <GlowSprite position={[10, -4, -18]} scale={20} stops={NEBULA_VIOLET_STOPS} />
                <House isMobile={isMobile} />
                <Rig isMobile={isMobile} />
            </Canvas>
        </div>
    )
}
