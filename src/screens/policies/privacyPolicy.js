import React, { useEffect, useState } from 'react'
import { BsJournalArrowUp } from 'react-icons/bs';
import { Navbar } from '../../components/navbar/navbar'
import { Footer } from '../../components/footer/footer'
import './policies.css';


export const PrivacyPolicy = () => {

    const data = [
        {
            heading: 'SCOPE',
            content: 'This privacy policy covers how Kalsultant LLC or Kalsultant LLC affiliated company collects, maintains and shares data for users who interact with us on our websites on any device, through an application on your mobile device or in person (including via phone).',
            content2: '',
            content3: '',
            content4: '',
            content5: '',
            content6: '',
        },
        {
            heading: 'PERSONAL DATA',
            content: 'Personal Data means the data that directly identifies you such as your name and also the data which does not directly identify but that can be reasonably used to identify you. We may collect personal data from users in different ways which include but may not be limited to; when a user registers on our site(or application) when a user visit our website to book services, advertises or endorses their products or services on our website(or application), subscribe to an electronic (or physical) newsletter or may engage with us in regards with any other activities, services or features we make available on our website.',
            content2: 'Users may however visit our site anonymously if they wish to do so however they may not be able to avail full access to the website and its features unless they are registered users.',
            content3: 'At Kalsultant LLC we respect the fundamental privacy rights of all individuals and users have can always decline to provide their personal data, however this may prevent them from complete access to our website or any other form of web application.',
            content4: 'The user hereby represents and confirms that the information provided to the website is authentic, correct, current and updated the website. The website and its entities shall not be responsible for the authenticity of the information that the user may provide. The user shall be personally liable and indemnify the website for the breach of any provision.',
            content5: '',
            content6: '',

        },
        {
            heading: 'NON-PERSONAL DATA',
            content: 'Non-personal data or information may include technical information such as the browser used to access our website or the type of mobile device used to engage with our application. This may also include the operating system of the device, the internet service providers, location information or any similar technical information which may assist to enhance our user experience.',
            content2: '',
            content3: '',
            content4: '',
            content5: '',
            content6: '',

        },
        {
            heading: 'COOKIES',
            content: 'Our Website may use “cookies” to enhance user experience, a cookie is a web based file which is stored on the hard drive of an electronic device when a user visits a website, this file “cookie” records information when a user visits a website, in this way when a website already recognizes a user if they had browsed the website before. This is used to keep a record of items or web pages which may have been of interest to the user on previous occasions.',
            content2: 'Users may set their website settings to refuse cookies or to be alerted when cookies are being used by a particular website; please be noted that if a user disallows cookies some parts of the website may not function properly.',
            content3: '',
            content4: '',
            content5: '',
            content6: '',
        },
        {
            heading: 'HOW WE USE COLLECTED INFORMATION',
            content: 'Kalsultant USA LLC uses personal data:',
            content2: '1. To improve and personalize user experience, to process any transactions.',
            content3: '2. To communicate with our users.',
            content4: '3. For security reasons and fraud prevention.',
            content5: '4. To send periodic newsletters or surveys, Users can unsubscribe to this if they wish to do so.',
            content6: '5. We may also use other purposes with your consent.',
        },
        {
            heading: 'HOW WE PROTECT YOUR INFORMATION',
            content: 'We use appropriate data collection, storing, processing practices and security measures to protect data against unauthorized access, altercation disclosure and destruction of all data that we collect.',
            content2: 'Confidential data exchange between the site and users is done over a SSL secure communication channel and is encrypted with digital signatures or symbols.',
            content3: '',
            content4: '',
            content5: '',
            content6: '',
        },
        {
            heading: 'SHARING YOUR PERSONAL INFORMATION',
            content: 'We do not sell, trade or rent personal data to other parties. We may share generic demographic or other non-personal information with our business partners, trusted associates and advertisers for the reasons as advised above, we may share your personal information with any of our trusted associates only after you have provided your consent to do so. This may be done for limited purposes only such as surveys or sending out news letters.',
            content2: '',
            content3: '',
            content4: '',
            content5: '',
            content6: ''
        },
        {
            heading: 'SECURITY MEASURES',
            content: 'The security of the personal information supplied by the user is very important to the website and the website for the purposes of securing the information takes reasonable steps such as physical and security measures to guard against the unauthorized access to the information. The personal information of a user is collected on a secured server.',
            content2: 'The payment details are entered on the website checkout payment gateway on a secured SSL and the user may be redirected to their respective bank’s payment gateway page. The data is transferred between bank’s page and website payment gateway’s page in an encrypted manner.',
            content3: 'However please note that no data transmission can be guaranteed to be completely secure. Hence the user is advised to take precautions and care against any sharing of the details submitted on the website including the log-in details as generated on registration. The website is not responsible for the security and confidentiality of the communications the user may send through the internet using email messages etc.',
            content4: 'Please note that we will not send any payment links to your email address and we advise to stay cautious regarding any payment or refund links to your email or mobile phone.',
            content5: '',
            content6: ''
        },
        {
            heading: 'CHANGES TO THIS PRIVACY POLICY & USER CONSENT',
            content: 'Kalsultant LLC reserves the right to amend or update this privacy policy at our discretion when we feel it is necessary to do so in order to comply with laws or otherwise, when we make any changes to this privacy policy, we will notify our users of the same. We advise all our users to frequently check our notifications page to stay updated on our services. As a user it is your responsibility to review this privacy policy periodically to stay informed on how we collect, use and protect your personal data.',
            content2: '',
            content3: '',
            content4: '',
            content5: '',
            content6: '',
        },
        {
            heading: 'YOUR ACCEPTANCE TO TERMS IN THIS PRIVACY POLICY',
            content: 'By using this website, you signify your acceptance of this policy and terms of service, if you continue to use our website following any changes to this policy, it will be deemed as your acceptance to those changes.',
            content2: '',
            content3: '',
            content4: '',
            content5: '',
            content6: ''
        },
        {
            heading: 'DISCLAIMER',
            content: 'The website is not responsible for any communication between the user and any third party website, the user is advised to read the privacy policy and terms and conditions of any third party website and this website shall not be held liable for any such usage made only because a link to the third party website was provided on the page of this website.',
            content2: 'The User hereby consents, expresses and agrees that the User has read and fully understand the Privacy Policy of the Website. The User further consents that the terms and contents of such Privacy policy is acceptable to the User inclusive of any update/alteration/change made and duly displayed on the Website.',
            content3: '',
            content4: '',
            content5: '',
            content6: ''

        }



    ]

    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener('scroll', () => {
            if (window.scrollY > 700)
                setScroll(true);
            else if (window.scrollY <= 700)
                setScroll(false);
        })
    }, []);
    const takeToTop = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div style={{ overflowX: 'hidden', position: 'relative', width: '100%', minHeight: '100vh', height: 'fitContent', textAlign: 'center' }}>
            <Navbar />
            <div className='legal_container'>
                <div className='legal_content_area'>
                    <strong>Privacy Policy Statement.</strong>
                    <h3 style={{ marginTop: '2.5rem' }}>
                        This privacy policy statement describes how Kalsultant USA LLC referred to as ‘Kalsultant’ or
                        ‘Kalsultant LLC’ or ‘we’ or ‘website’collect, maintains, uses and shares user specific information collected
                        from its users..
                    </h3>

                    {data.map((item, index) => (
                        <div className='each_content_section'>
                            <h2>{index + 1}. {item.heading}</h2>
                            <h3>{item.content}</h3>
                            {item.content2.length > 0 ?
                                <h3>{item.content2}</h3>
                                :
                                <></>}
                            {item.content3.length > 0 ?
                                <h3>{item.content3}</h3>
                                :
                                <></>
                            }
                            {item.content4.length > 0 ?
                                <h3>{item.content4}</h3>
                                :
                                <></>
                            }
                            {item.content5.length > 0 ?
                                <h3>{item.content5}</h3>
                                :
                                <></>
                            }
                            {item.content6.length > 0 ?
                                <h3>{item.content6}</h3>
                                :
                                <></>
                            }

                        </div>
                    ))}

                </div>
                <BsJournalArrowUp
                    style={{
                        position: 'fixed',
                        bottom: 40,
                        right: 40,
                        fontSize: '28px',
                        cursor: 'pointer',
                        opacity: scroll ? 1 : 0,
                        color: '#f9f6eecc'
                    }}

                    onClick={takeToTop}
                />
            </div>
            <Footer />
        </div>
    )
}

