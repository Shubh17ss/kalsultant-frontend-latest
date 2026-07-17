import '../index.css'
import '../App.css'
import { Providers } from './providers'
import { Background } from './Background'

export const metadata = {
    title: 'KalSultant',
    description: 'KalSultant — Vedic Astrology',
    icons: { icon: '/logo.png', apple: '/logo.png' },
    manifest: '/manifest.json',
}

export const viewport = {
    themeColor: '#000000',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Background />
                    {children}
                </Providers>
            </body>
        </html>
    )
}
