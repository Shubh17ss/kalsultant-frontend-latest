'use client'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

// tsparticles touches the DOM, so it must never render on the server.
const ParticlesBackground = dynamic(
    () => import('../components/particlesBg/Particles/particlesBackground').then((m) => m.ParticlesBackground),
    { ssr: false }
)

// Home and Vaastu render their own richer 3D backdrops, so the flat particles
// layer is only used on the other routes (mirrors the old App.js logic).
export function Background() {
    const pathname = usePathname()
    if (pathname === '/' || pathname === '/vaastu') return null
    return <ParticlesBackground />
}
