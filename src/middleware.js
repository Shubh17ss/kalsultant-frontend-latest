import { NextResponse } from 'next/server'

/* ngrok's free tier answers any browser-looking User-Agent with an HTML
   interstitial ("You are about to visit...") instead of proxying to the
   backend. The /api rewrite in next.config.mjs forwards the visitor's own
   User-Agent verbatim, so without this every /api call would come back as
   ngrok's HTML page rather than JSON.

   This header is ngrok's documented opt-out. It is inert for any other
   backend, so it can stay until queue_backend has a real home — at which
   point this whole file can go. */
export function middleware(request) {
    const headers = new Headers(request.headers)
    headers.set('ngrok-skip-browser-warning', 'true')
    return NextResponse.next({ request: { headers } })
}

export const config = {
    matcher: '/api/:path*',
}
