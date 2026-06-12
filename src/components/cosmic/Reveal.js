import React, { useEffect, useRef } from 'react'
import './cosmic.css'

// Fades / lifts / un-blurs children when they scroll into view (once).
export const Reveal = ({ children, delay = 0, threshold = 0.18, className = '', style = {} }) => {
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('revealed')
                    observer.disconnect()
                }
            },
            { threshold }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [threshold])

    return (
        <div ref={ref} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}s`, ...style }}>
            {children}
        </div>
    )
}

// Translates children vertically against scroll for a depth-layer effect.
export const Parallax = ({ children, speed = 0.12, className = '', style = {}, ...rest }) => {
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        let frame = 0
        let current = null
        // Measure the (untransformed) parent — measuring the element itself would
        // include its own translate and feed back into the next offset.
        // Continuous eased loop so discrete wheel steps glide instead of jumping.
        const tick = () => {
            const rect = (el.parentElement || el).getBoundingClientRect()
            const target = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed
            current = current === null ? target : current + (target - current) * 0.1
            el.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`
            frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame)
    }, [speed])

    return (
        <div ref={ref} className={className} style={{ willChange: 'transform', ...style }} {...rest}>
            {children}
        </div>
    )
}
