'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import './routeProgress.css'

// A thin top-of-page loading bar that gives feedback during client-side route
// changes. App Router navigations (both `router.push` and <Link>) go through
// the History API, so we hook pushState/popstate to know when a navigation
// begins, and finish the bar once the new pathname commits (i.e. the server
// component for the destination has rendered).
export function RouteProgress() {
    const pathname = usePathname()
    const [progress, setProgress] = useState(0)
    const [active, setActive] = useState(false)
    const trickle = useRef(null)
    const hideTimer = useRef(null)
    const firstRender = useRef(true)

    const start = () => {
        clearTimeout(hideTimer.current)
        clearInterval(trickle.current)
        setActive(true)
        setProgress(10)
        // Creep towards 90% so the bar always feels alive while we wait on the
        // server, but never completes until the route actually changes.
        trickle.current = setInterval(() => {
            setProgress((p) => (p < 90 ? p + Math.max(0.5, (90 - p) * 0.08) : p))
        }, 200)
    }

    const done = () => {
        clearInterval(trickle.current)
        setProgress(100)
        hideTimer.current = setTimeout(() => {
            setActive(false)
            setProgress(0)
        }, 350)
    }

    // Hook navigation starts once on mount.
    useEffect(() => {
        // pushState may be invoked from inside React's insertion-effect phase
        // (Link/router navigations), where scheduling a state update synchronously
        // throws "useInsertionEffect must not schedule updates". Defer to a
        // microtask so the bar starts just after that phase settles.
        const scheduleStart = () => queueMicrotask(start)

        const origPush = window.history.pushState
        window.history.pushState = function (data, unused, url) {
            try {
                const target = new URL(url, window.location.href)
                const changed =
                    target.pathname !== window.location.pathname ||
                    target.search !== window.location.search
                if (changed) scheduleStart()
            } catch (_) {
                scheduleStart()
            }
            return origPush.apply(this, arguments)
        }
        const onPop = () => scheduleStart()
        window.addEventListener('popstate', onPop)
        return () => {
            window.history.pushState = origPush
            window.removeEventListener('popstate', onPop)
            clearInterval(trickle.current)
            clearTimeout(hideTimer.current)
        }
    }, [])

    // Finish whenever the committed pathname changes (skip the initial mount).
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        done()
    }, [pathname])

    if (!active) return null

    return (
        <div className="routeProgress" aria-hidden="true">
            <div
                className="routeProgressBar"
                style={{ width: `${progress}%`, opacity: progress >= 100 ? 0 : 1 }}
            />
        </div>
    )
}
