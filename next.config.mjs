/** @type {import('next').NextConfig} */
const nextConfig = {
    // The app is animation/effect heavy (intro overlay, 3D scenes) with effects
    // that assume a single mount, so we keep StrictMode's dev double-invoke off.
    reactStrictMode: false,
    // Hide the Next.js dev-tools indicator (the logo button in the bottom-left).
    devIndicators: false,
};

export default nextConfig;
