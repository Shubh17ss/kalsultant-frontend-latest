import React, { useEffect, useRef, useState } from 'react'
import './intro.css'

/* ------------------------------------------------------------------
   First-load cinematic intro:
     1. typewriter — "KalSultant" then "Consult your Kaal" on black
     2. forming    — the text collapses into a glowing ball
     3. dropping   — the ball falls with a gravity bounce
     4. illuminate — light spreads radially from the ball, revealing
                     the hero behind, then the curtain dissolves
   onDone() fires once the sequence (or a skip / reduced-motion) ends.
   ------------------------------------------------------------------ */

const BRAND = 'KalSultant'
const TAGLINE = 'Consult your Kaal'
const BRAND_CHAR_MS = 90
const TAGLINE_CHAR_MS = 55

export const IntroOverlay = ({ onDone }) => {
    const [brand, setBrand] = useState('')
    const [tagline, setTagline] = useState('')
    const [caret, setCaret] = useState('brand') // 'brand' | 'tagline' | 'none'
    const [stage, setStage] = useState('typing') // typing | forming | dropping | illuminate
    const timers = useRef([])
    const done = useRef(false)

    const push = (fn, ms) => {
        const id = setTimeout(fn, ms)
        timers.current.push(id)
        return id
    }

    const finish = () => {
        if (done.current) return
        done.current = true
        timers.current.forEach(clearTimeout)
        onDone?.()
    }

    // lock scroll for the duration
    useEffect(() => {
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        window.scrollTo(0, 0)
        return () => { document.body.style.overflow = prev }
    }, [])

    // type the two lines, then kick off the stage chain
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            finish()
            return
        }

        let b = 0
        const typeBrand = () => {
            b += 1
            setBrand(BRAND.slice(0, b))
            if (b < BRAND.length) push(typeBrand, BRAND_CHAR_MS)
            else push(startTagline, 480)
        }
        let t = 0
        const startTagline = () => {
            setCaret('tagline')
            typeTagline()
        }
        const typeTagline = () => {
            t += 1
            setTagline(TAGLINE.slice(0, t))
            if (t < TAGLINE.length) push(typeTagline, TAGLINE_CHAR_MS)
            else {
                setCaret('none')
                push(() => setStage('forming'), 900)
            }
        }
        push(typeBrand, 500)

        return () => timers.current.forEach(clearTimeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // advance forming -> dropping -> illuminate -> done
    useEffect(() => {
        if (stage === 'forming') push(() => setStage('dropping'), 820)
        else if (stage === 'dropping') push(() => setStage('illuminate'), 1050)
        else if (stage === 'illuminate') push(finish, 1850)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stage])

    return (
        <div className={`intro intro--${stage}`} role="presentation" onClick={finish}>
            <div className="introBlackout" aria-hidden="true" />
            <div className="introOrb" aria-hidden="true" />
            <div className="introGlow" aria-hidden="true" />

            <div className="introText">
                <span className="introBrand">
                    {brand}
                    {caret === 'brand' && <i className="introCaret" />}
                </span>
                <span className="introTagline">
                    {tagline}
                    {caret === 'tagline' && <i className="introCaret" />}
                </span>
            </div>

            <button type="button" className="introSkip" onClick={finish}>Skip</button>
        </div>
    )
}
