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

        await page.goto(`${URL}pricing`, { waitUntil: 'networkidle' })
        await page.waitForTimeout(2200)
        await page.screenshot({ path: path.join(OUT, `${device}_pricing.png`) })

        await page.goto(`${URL}how-we-work`, { waitUntil: 'networkidle' })
        await page.waitForTimeout(2200)
        await page.screenshot({ path: path.join(OUT, `${device}_hww.png`) })
        // advance the step deck a couple of slides
        const next = page.locator('.hwwSwiper .swiper-button-next')
        if (await next.isVisible().catch(() => false)) {
            await next.click()
            await next.click()
        } else {
            await page.locator('.hwwSwiper').hover()
            await page.mouse.wheel(0, 0)
            await page.locator('.hwwSwiper .swiper-pagination-bullet').nth(2).click()
        }
        await page.waitForTimeout(1200)
        await page.screenshot({ path: path.join(OUT, `${device}_hww_slide3.png`) })

        await page.goto(`${URL}about-us`, { waitUntil: 'networkidle' })
        await page.waitForTimeout(2200)
        await page.screenshot({ path: path.join(OUT, `${device}_about.png`) })
        await page.evaluate(() => {
            document.querySelector('.auTeam').scrollIntoView({ block: 'center' })
        })
        await page.waitForTimeout(1500)
        await page.screenshot({ path: path.join(OUT, `${device}_about_team.png`) })

        await page.goto(`${URL}contact-us`, { waitUntil: 'domcontentloaded' })
        await page.waitForTimeout(2500)
        await page.screenshot({ path: path.join(OUT, `${device}_contact.png`) })
        if (device === 'mobile') {
            await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight))
            await page.waitForTimeout(1500)
            await page.screenshot({ path: path.join(OUT, `${device}_pricing_bottom.png`) })
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
