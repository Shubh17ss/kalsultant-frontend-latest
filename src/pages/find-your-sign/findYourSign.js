import React, { useEffect, useState } from 'react'
import './findYourSign.css'
import { Navbar } from '../../components/navbar/navbar'
import { Footer } from '../../components/footer/footer'
import { Reveal } from '../../components/cosmic/Reveal'
import { CosmicSelect } from '../../components/cosmic/CosmicSelect'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { MdArrowRightAlt, MdArrowBack } from 'react-icons/md'

/* Western sun-sign date ranges. Each entry: [sign, glyph, element, [startMonth, startDay]].
   A date belongs to a sign if it falls on/after that sign's start and before the next. */
const SIGNS = [
    { name: 'Capricorn', glyph: '♑', element: 'Earth', start: [1, 1] },
    { name: 'Aquarius', glyph: '♒', element: 'Air', start: [1, 20] },
    { name: 'Pisces', glyph: '♓', element: 'Water', start: [2, 19] },
    { name: 'Aries', glyph: '♈', element: 'Fire', start: [3, 21] },
    { name: 'Taurus', glyph: '♉', element: 'Earth', start: [4, 20] },
    { name: 'Gemini', glyph: '♊', element: 'Air', start: [5, 21] },
    { name: 'Cancer', glyph: '♋', element: 'Water', start: [6, 21] },
    { name: 'Leo', glyph: '♌', element: 'Fire', start: [7, 23] },
    { name: 'Virgo', glyph: '♍', element: 'Earth', start: [8, 23] },
    { name: 'Libra', glyph: '♎', element: 'Air', start: [9, 23] },
    { name: 'Scorpio', glyph: '♏', element: 'Water', start: [10, 23] },
    { name: 'Sagittarius', glyph: '♐', element: 'Fire', start: [11, 22] },
    { name: 'Capricorn', glyph: '♑', element: 'Earth', start: [12, 22] },
]

const getZodiacSign = (month, day) => {
    // Walk the ranges; the last entry whose start is <= the given date wins.
    let match = SIGNS[0]
    for (const sign of SIGNS) {
        const [m, d] = sign.start
        if (month > m || (month === m && day >= d)) {
            match = sign
        }
    }
    return match
}

export const FindYourSign = () => {
    const navigate = useNavigate()
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [result, setResult] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const d = Number(day)
        const m = Number(month)
        if (!d || !m || m < 1 || m > 12 || d < 1 || d > 31) {
            toast.error('Please enter a valid day and month')
            return
        }
        const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        if (d > daysInMonth[m - 1]) {
            toast.error('That day does not exist in the selected month')
            return
        }
        setResult(getZodiacSign(m, d))
    }

    return (
        <div className="findSignPage">
            <Navbar />

            <section className="findSignHero">
                <Reveal>
                    <div className="cosmicEyebrow">✦ Discover your sign</div>
                </Reveal>
                <Reveal delay={0.12}>
                    <h1 className="cosmicH2 findSignTitle">
                        Born under a <em className="goldShimmer">certain sky.</em>
                    </h1>
                </Reveal>
                <Reveal delay={0.22}>
                    <p className="cosmicSerif findSignSub">
                        Enter the day and month you were born, and we'll reveal the sun
                        sign the heavens assigned you.
                    </p>
                </Reveal>
            </section>

            <section className="findSignSection">
                <Reveal delay={0.1} className="findSignPanelWrap">
                    <div className="findSignPanel">
                        <form className="findSignForm" onSubmit={handleSubmit}>
                            <div className="findSignFields">
                                <input
                                    type="number"
                                    min="1"
                                    max="31"
                                    className="findSignInput"
                                    placeholder="Day"
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}
                                />
                                <div className="findSignSelectWrap">
                                    <CosmicSelect
                                        value={month}
                                        onChange={setMonth}
                                        placeholder="Month"
                                        ariaLabel="Birth month"
                                        shape="pill"
                                        height={54}
                                        options={['January', 'February', 'March', 'April', 'May', 'June',
                                            'July', 'August', 'September', 'October', 'November', 'December'
                                        ].map((name, i) => ({ value: i + 1, label: name }))}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="ctaPrimary findSignSubmit">
                                Reveal my sign <MdArrowRightAlt size={20} />
                            </button>
                        </form>

                        {result && (
                            <div className="findSignResult" key={result.name}>
                                <span className="findSignGlyph" aria-hidden="true">{result.glyph}</span>
                                <span className="findSignResultLabel">Your sun sign is</span>
                                <h2 className="findSignResultName goldShimmer">{result.name}</h2>
                                <span className="findSignElement">{result.element} sign</span>
                                <button
                                    type="button"
                                    className="ctaGhost findSignUseBtn"
                                    onClick={() =>
                                        navigate('/', { state: { zodiac: result.name } })
                                    }
                                >
                                    Back to newsletter <MdArrowRightAlt size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                </Reveal>

                <Reveal delay={0.22}>
                    <button className="findSignBackLink" onClick={() => navigate(-1)}>
                        <MdArrowBack size={16} /> Go back
                    </button>
                </Reveal>
            </section>

            <Footer />
        </div>
    )
}
