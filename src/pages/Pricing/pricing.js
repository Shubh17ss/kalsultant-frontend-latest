import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/navbar/navbar'
import { Footer } from '../../components/footer/footer'
import { MdCheck, MdArrowRightAlt } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { Reveal } from '../../components/cosmic/Reveal'
import './pricing.css'

// Pricing configuration
const PRICING_CONFIG = {
  INR: {
    currency: '₹',
    currencyCode: 'INR',
    session: 1100,
    monthly: 3499,
    premium: 7999,
  },
  USD: {
    currency: '$',
    currencyCode: 'USD',
    session: 29,
    monthly: 89,
    premium: 199,
  },
}

const buildPlans = (pricing) => [
  {
    id: 'session',
    tag: 'Pay as you go',
    name: 'Single Session',
    price: pricing.session,
    period: '/ session',
    blurb: 'One focused hour with your chart. No commitment.',
    features: [
      'One-hour private consultation',
      'Up to 4 birth charts analysed',
      'Pay only after your session',
    ],
    cta: 'Book a session',
    to: '/schedule-session',
    style: 'standard',
  },
  {
    id: 'monthly',
    tag: 'Most popular',
    name: 'Monthly',
    price: pricing.monthly,
    period: '/ month',
    blurb: 'The stars on retainer — guidance that follows your life.',
    features: [
      'Two sessions every month',
      'Priority scheduling',
      'Follow-up questions between sessions',
      'Month-ahead timing guidance',
    ],
    cta: 'Start monthly',
    to: '/schedule-session',
    style: 'popular',
  },
  {
    id: 'premium',
    tag: 'For families',
    name: 'Premium',
    price: pricing.premium,
    period: '/ month',
    blurb: 'One consultant for your whole house — up to 4 members.',
    features: [
      'Everything in Monthly',
      'Covers up to 4 family members',
      'Individual charts for each member',
      'Dedicated senior consultant',
    ],
    cta: 'Talk to us',
    to: '/contact-us',
    style: 'premium',
  },
]

export const Pricing = () => {
  const [pricing, setPricing] = useState(PRICING_CONFIG.INR)
  const navigate = useNavigate()

  // Detect user location and set pricing
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        if (data.country_code === 'IN') {
          setPricing(PRICING_CONFIG.INR)
        } else {
          setPricing(PRICING_CONFIG.USD)
        }
      } catch (error) {
        // Default to INR if location detection fails
        setPricing(PRICING_CONFIG.INR)
      }
    }
    detectLocation()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const plans = buildPlans(pricing)

  return (
    <div className="pricingPage">
      <Navbar />
      <section className="pricingHero">
        <Reveal>
          <div className="cosmicEyebrow">✦ Pricing</div>
        </Reveal>
        <Reveal delay={0.12}>
          <h1 className="cosmicH2 pricingTitle">
            One sky. <em className="goldShimmer">Three ways to read it.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.22}>
          <p className="cosmicSerif pricingSub">
            Start with a single session, keep the stars on retainer, or bring
            your whole family under one consultant.
          </p>
        </Reveal>

        <div className="plansGrid">
          {plans.map((plan, index) => (
            <Reveal key={plan.id} delay={0.15 + index * 0.13} className="planCardWrap">
              <article className={`planCard ${plan.style}`}>
                <span className="planTag">{plan.tag}</span>
                <h2 className="planName">{plan.name}</h2>
                <div className="planPriceRow">
                  <span className="planPrice">
                    {pricing.currency}
                    {plan.price.toLocaleString()}
                  </span>
                  <span className="planPeriod">{plan.period}</span>
                </div>
                <p className="planBlurb">{plan.blurb}</p>
                <div className="planDivider"></div>
                <ul className="planFeatures">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <MdCheck size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={plan.style === 'popular' ? 'ctaPrimary planCta' : 'ctaGhost planCta'}
                  onClick={() => navigate(plan.to)}
                >
                  {plan.cta} <MdArrowRightAlt size={20} />
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="pricingFootnote">
            Single sessions are billed only after the session ends. Prices shown
            in {pricing.currencyCode}.
          </p>
        </Reveal>
      </section>
      <Footer />
    </div>
  )
}
