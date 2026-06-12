// Dev-only helper: drives installed Chrome over the production build and
// captures each landing-page section at desktop + mobile widths.
// Usage: node scripts/screenshot-landing.js [outDir]
const { chromium } = require('playwright-core')
const path = require('path')
const fs = require('fs')

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const URL = 'http://localhost:5050/'
const OUT = process.argv[2] || path.join(__dirname, '..', '.screenshots')

const SECTIONS = [
    ['hero', '.cosmicHero'],
    ['timebound', '.timeBoundSection'],
    ['journey', '.journeySection'],
    ['finalcta', '.finalCtaSection'],
]

const run = async () => {
    fs.mkdirSync(OUT, { recursive: true })
    const browser = await chromium.launch({
        executablePath: CHROME,
        headless: true,
        args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--hide-scrollbars'],
    })

    for (const [device, viewport] of [
        ['desktop', { width: 1440, height: 900 }],
        ['mobile', { width: 390, height: 844 }],
    ]) {
        const page = await browser.newPage({ viewport })
        const errors = []
        page.on('console', (msg) => {
            if (msg.type() === 'error') errors.push(msg.text())
        })
        page.on('pageerror', (err) => errors.push(String(err)))

        await page.goto(URL, { waitUntil: 'networkidle' })
        await page.waitForTimeout(2500)

        for (const [name, selector] of SECTIONS) {
            const el = page.locator(selector)
            await el.scrollIntoViewIfNeeded()
            await page.waitForTimeout(1800) // let reveals + canvas settle
            await page.screenshot({ path: path.join(OUT, `${device}_${name}.png`) })
        }

        console.log(`${device}: done. console errors: ${errors.length}`)
        errors.slice(0, 10).forEach((e) => console.log('  ERR:', e))
        await page.close()
    }

    await browser.close()
}

run().catch((err) => {
    console.error(err)
    process.exit(1)
})
