/** Origin every /api/* call is proxied to. The frontend only ever calls
 *  relative /api/... paths, so switching backends is this one value — no code
 *  change, no rebuild of call sites.
 *
 *  NOTE: localhost only resolves where the process itself runs. It works under
 *  `next dev` on your machine; on a Vercel deployment it points at Vercel's own
 *  container, not your laptop, so /api calls there fail until this is set to a
 *  publicly reachable backend URL (Vercel env var QUEUE_API_ORIGIN).
 */
const QUEUE_API_ORIGIN = process.env.QUEUE_API_ORIGIN || 'http://localhost:4100';

/** @type {import('next').NextConfig} */
const nextConfig = {
    // The app is animation/effect heavy (intro overlay, 3D scenes) with effects
    // that assume a single mount, so we keep StrictMode's dev double-invoke off.
    reactStrictMode: false,
    // Hide the Next.js dev-tools indicator (the logo button in the bottom-left).
    devIndicators: false,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${QUEUE_API_ORIGIN}/api/:path*`,
            },
        ];
    },
};

export default nextConfig;
