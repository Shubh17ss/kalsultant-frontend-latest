import React, { useEffect, useState } from 'react'
import { BsJournalArrowUp } from 'react-icons/bs';
import {Navbar} from '../../components/navbar/navbar'
import {Footer} from '../../components/footer/footer'
import './policies.css';


export const TermsAndConditions = () => {

    const data = [
        {
            heading: 'UPDATES AND CHANGES',
            content: 'The Website may update/amend/modify these Terms of Usage from time to time. The User is responsible to check the Terms of Usage periodically to remain in compliance with these terms.',
            content2: '',
            content3: '',
            content4: '',
            content5: '',
            content6: '',
            content7: '',
            content8: '',
            content9: '',
        },
        {
            heading: 'USER CONSENT',
            content: 'By accessing the Website and using it, you (“Member”, “You”, “Your”) indicate that you understand the terms and you unconditionally & expressly consent to the Terms of Usage of this Website. If you do not agree with the Terms of Usage, please do not select the option that ‘I have read and understood the terms and conditions on the sign up page. The User is advised to read the Terms of Usage carefully before using or registering on the Website or accessing any material, information or services through the Website. Your use and continued usage of the Website (irrespective of the amendments made from time to time) shall signify your acceptance of the terms of usage and your agreement to be legally bound by the same.',
            content2: '',
            content3: '',
            content4: '',
            content5: '',
            content6: '',
            content7: '',
            content8: '',
            content9: '',

        },
        {
            heading: 'GENERAL DESCRIPTION',
            content: 'The Website is an internet-based portal having its existence on World Wide Web, Application and other electronic medium and provides astrological content, reports, data, telephone, video and email consultations (hereinafter referred as “Content”). The Website is offering “Paid Services” (referred as “Services”). For accessing the personalised astrological services and/or receive additional Content and get access to Paid Services, You are required to register as a member on the portal. By registering for Paid Services, a Member agrees to: To provide current, complete, and accurate information about himself/herself as prompted to do so by the Website. To maintain and update the above information as required and submitted by you with the view to maintain the accuracy of the information being current and complete. The user must not register on behalf of someone else without express consent from ‘Kalsultant’.',
            content2: '',
            content3: '',
            content4: '',
            content5: '',
            content6: '',
            content7: '',
            content8: '',
            content9: '',
        },
        {
            heading: 'REGISTRATION AND ELIGIBILITY',
            content: "A minor under the age of eighteen (18) in most jurisdiction, are not permitted to avail the services provided on the Website without a legal guardian in accordance with the applicable laws. The Website would not be held responsible for any misuse that may occur by virtue of any person including a minor using the services provided through the Website. For the User to avail the services, the User will be directed to Register as a Member on the Website whereby You (User) agree to provide and update, current and accurate information while filling up the registration or sign-up form. All information that you fill and provide to the Website and all updates thereto are referred to in these Terms of Usage as “Registration Data“. The User while creating an account hereby represents and warrants that all the information provided by the User is current, accurate and complete and that the User will maintain the accuracy and keep the information updated from time to time. Use of another User’s account information for availing the services is expressly prohibited. If in case it is found that the information so supplied on the Website is inaccurate, incomplete, untrue and not current, the Website has the right to suspend or terminate the User’s account and restrict/refuse the use of the Website by such User in future. The right to use this Website is personal to the User and is not transferable to any other person or entity without express consent of Kalsultant. The User would be responsible for protecting the confidentiality of User’s passwords and other information required for the purposes of registration. The User would be fully responsible for all the activities that occur under the User’s account with the Website. The Website cannot and will not be liable for any loss or damage arising from the User’s failure to maintain secrecy and confidentiality. The User shall notify the Website immediately if they become aware of any unauthorised use of their Account(s) or breach of any security. The User must log out from its account at the end of the session. The User while availing any service shall be informed whether the service so rendered is personal to the Website or is available from a Third party. The Website shall have no control or monitoring on the information disseminated to any third party via the Website.",
            content2: 'The User agrees, understands and confirms that his/ her personal data including without limitation to details relating to debit card/ credit card transmitted over the Internet may be susceptible to misuse, hacking, theft and/ or fraud and that the Website or the Payment Service Provider(s) have no control over such matters. The Website does not permit the use of the Services by any User under the following conditions:',
            content3: 'If the User is a resident of any jurisdiction that may prohibit the use of the Services rendered by the Website. If the User is a resident of any State/Country that prohibits by way of law, regulation, treaty or administrative act for entering into trade relations or/and o Due to any religious practices. If the User has created multiple accounts using various email address. The User may not have more than one active account with the Website.',
            content4: '',
            content5: '',
            content6: '',
            content7: '',
            content8: '',
            content9: '',
        },
        {
            heading: 'WEBSITE CONTENT',
            content: 'The Website and any individual Websites which may be available through external hyperlinks with the Website are private property. All interaction on this Website inclusive of the guidance and advice received directly from the service provider must comply with these Terms of Usage. The User shall not post or transmit through this Website any material which violates or infringes in any way upon the rights of others, or any material which is unlawful, abusive, defamatory, invasive of privacy, vulgar, obscene, profane or otherwise objectionable, which encourages conduct that would constitute a criminal offence, give rise to civil liability or otherwise violate any law. The Website shall have a right to suspend or terminate access by such User or terminate the User’s registration and such User shall not gain access to the Website.',
            content2: 'The Website reserves the right to terminate the access or to change or discontinue any aspect or feature of the Website including, but not limited to, content, graphics, deals, offers, settings, etc. Any information other the guidance and advice, received directly from the Service Provider, the educational, graphics, research sources and other incidental information on the Site, the content, should not be considered as medical advice. The Website does not take guarantee regarding any medical or financial advice provided, by the service provider through the site. The User should always talk to an appropriately qualified health care professional for diagnosis and treatment including information regarding which medications or treatment may be appropriate for the User. None of the Content represents or warrants that any particular medication or treatment is safe, appropriate, or effective for you. Kalsultant does not endorse any specific tests, medications, products or procedures or occult practices.',
            content3: 'The Website does not take guarantee of any untoward incident that may happen with the User after seeking the Service. The Website or the Service Provider providing the advice is not liable and does not guarantee any results as expected by the User and accessing the Website in such scenario is purely at the risk of the User. By using the Site, Application or Services, User hereby agrees that any legal remedy or liability that you seek to obtain for actions or omissions of other Members inclusive of the service provider registered with the Website or other third parties linked with the Website, shall be limited to claim against such particular party who may have caused any harm. You agree not to attempt to impose liability on or seek any legal remedy from the Website with respect to such actions or omissions.',
            content4: '',
            content5: '',
            content6: '',
            content7: '',
            content8: '',
            content9: '',
        },
        {
            heading: 'USER ACCOUNT ACCESS',
            content: 'The Website shall have access to the account and the information created by the User for ensuring and maintaining the high-quality services provided by the Website and for addressing the need of the customer in the most effective manner. User hereby consents for the unconditional access of the account by the Website, its employees, agents and other appointed person in such regard. For the purpose of addressing the complaints (if any received) and any suspected abuse reported, the Website shall investigate on case-to-case basis from the records available. The User is directed to read the terms provided in the Privacy Policy as regards such records.',
            content2: '',
            content3: '',
            content4: '',
            content5: '',
            content6: '',
            content7: '',
            content8: '',
            content9: '',
        },
        {
            heading: 'BREACH AND TERMINATION',
            content: 'The Website may, in whole or in part, without informing the User, modify, discontinue, change or alter the services ordered on the Account of the User registered with the Website. The Website may or may not issue notice or provide any reason for such action taken by the Website.',
            content2: 'Violation of any conditions mentioned in this Terms of Usage shall lead to immediate cancellation of the Registration of the User, if registered with the Website. The Website reserves right to terminate and initiate action immediately, if:',
            content3: 'The Website is not able to verify and authenticate the Registration data or any other relevant information provided by the User. The Website believes that the actions of the User may cause legal liability for the Website, other Users or any service provider linked with the Website. The Website believes that the User has provided the Website with false and misleading Registration Data or there is interference with the other Users or the administration of the services, or have violated the privacy policy as listed by the Website.',
            content4: '',
            content5: '',
            content6: '',
            content7: '',
            content8: '',
            content9: '',
        },
        {
            heading: 'USER OBLIGATION',
            content: 'The User under an obligation not to violate the privacy policy, terms and conditions and any other terms as defined on the Website. The User represents that he is an individual and not a corporation or other legal business entity. The rights to use the Website’s services is personal to the User.The User shall while using the Website and engaged in any form of communication on any of the forums inclusive of the products listed on the Website shall not violate the terms and conditions which are inclusive of',
            content2: 'The User shall not collect screen names and email addresses of members who are registered on the Website for purposes of advertisement, solicitation or spam. The User shall not send unsolicited email, junk mail, spam, or chain letters, or promotions or advertisements for products or services. The User shall not upload or distribute files that contain viruses, corrupted files, or any other similar software or programs that may damage the operation of the Website or another’s computer. The User shall not engage in any activity that interferes with or disrupts access to the Website. The User shall not attempt to gain unauthorized access to any portion or feature of the Website, any other systems or networks connected to the Website, to any of the services offered on or through the Website, by hacking, password mining or any other illegitimate means.',
            content3: 'The User shall not violate any applicable laws or regulations for the time being in force within or outside USA. The use and continuous use of the Website is subject to but not limited to using the services for personal use. The User shall not violate these Terms of Usage including but not limited to any applicable Additional terms of the Website contained herein or elsewhere. The User shall not Reverse engineer, modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information or software obtained from the Website. The User by becoming a Registered member of the Website agrees to the following situations, which list is not exhaustive and may include services incidental to the below mentioned:',
            content4: 'Any false complaint made by a Member shall make such Member liable for termination of his / her membership without any refund of the subscription fee. The Website reserves the right to withdraw its services to any customer who is found to be unreasonable or abusive during their conversation with the Service Provider inclusive of astrologer regardless of any reason. While the Website shall take all steps to resolve any situation that is in violation of the above obligations arises, however if the situation is not controllable, the Website reserves its right to send a written warning henceforth. Such violations, if repeated by the User, shall lead to a total ban for transacting on the platform by such User.',
            content5: '',
            content6: '',
            content7: '',
            content8: '',
            content9: '',
        },
        {
            heading: 'DISCLAIMER / LIMITATION OF LIABILITY / WARRANTY',
            content: 'The User expressly understands and agree that, to the maximum extent permitted by applicable law, the Website does not provide warranties for the service. Astrological counselling provided through the Website is based on cumulative or individual knowledge, experience and interpretations of astrologer, such recommendations are being made in good faith by the astrologer and the Website makes no warranty that: The service will meet your requirements or the service will be uninterrupted, timely, secure or error - free. The results that may be obtained from the use of the service will be accurate or reliable.',
            content2: 'You are required to make full disclosure about the emotional, mental and physical state of the person seeking advice from the panel of astrologers of Website so that the astrologer makes an informed judgment about giving advice.',
            content3: 'The Website, services are provided by the Website on an "as is" basis without warranty of any kind, express, implied, statutory or otherwise, including the implied warranties of title, non-infringement, merchantability or fitness for a particular purpose. without limiting the foregoing, the Website makes no warranty that (i) the Website or the services will meet your requirements or your use of the Website or the services will be uninterrupted, timely, secure or error-free; (ii) the results that may be obtained from the use of the Website, services will be effective, accurate or reliable; (iii) the quality of the Website, services will meet your expectations; or that (iv) any errors or defects in the Website, services will be corrected. no advice or information, whether oral or written, obtained by the User from the Website or through or from use of the services shall create any warranty not expressly stated in the terms of use.',
            content4: "The Website will not be liable for any loss that the User may incur as a consequence of unauthorized use of their account or account information in connection with the Website or any services or materials, either with or without the User’s knowledge. The Website has endeavored to ensure that all the information on the Website is correct, but the Website neither warrants nor makes any representations regarding the quality, accuracy or completeness of any data, information, product or service. The Website shall not be responsible for the delay or inability to use the Website or related functionalities, the provision of or failure to provide functionalities, or for any information, software, products, functionalities and related graphics obtained through the Website, or otherwise arising out of the use of the Website, whether based on contract, tort, negligence, strict liability or otherwise. further, the Website shall not be held responsible for non-availability of the Website during periodic maintenance operations or any unplanned suspension of access to the Website that may occur due to technical reasons or for any reason beyond the Website's control.",
            content5: 'The User understands and agrees that any material or data downloaded or otherwise obtained through the Website is done entirely at their own discretion and risk and they will be solely responsible for any damage to their computer systems or loss of data that results from the download of such material or data. The Website is not responsible for any typographical error leading to an invalid coupon. The Website accepts no liability for any errors or omissions, with respect to any information provided to you whether on behalf of itself or third parties.',
            content6: 'The Services provided by the Website are for entertainment purposes only and the Website on behalf of itself and its suppliers, disclaims all warranties of any kind, express or implied, including without limitation any warranty of merchantability, fitness for a particular purpose, title, non-infringement and it makes no warranty or representation regarding the results that may be obtained from the use of content or services, the accuracy or reliability of any content obtained through the Services, any goods or services purchased or obtained through the Website, and makes no warranty that the services will meet your requirements, be uninterrupted, timely, secure or error-free. No advice or information, whether oral or written, obtained by you from the Website shall create any warranty.',
            content7: 'The services may consist of the following, without limitation: Astrological content, Reports, video/ phone call consultations email consultations or products sold through Kalsultant Shop. No advice or information, whether oral or written, obtained by you shall create any warranty.',
            content8: 'The Website shall not be liable for any inaccuracy, error or delay in, or omission of (a) any data, information or message, or (b) the transmission or delivery of any such data, information or message; or (c) any loss or damage arising from or occasioned by any such inaccuracy, error, delay or omission, non-performance or interruption in any such data, information or message. Under no circumstances shall the Website and/or the payment service providers, its employees, directors, and its third party agents involved in processing, delivering or managing the services, be liable for any direct, indirect, incidental, special or consequential damages, or any damages whatsoever, including punitive or exemplary arising out of or in any way connected with the provision of or any inadequacy or deficiency in the provision of the services or resulting from unauthorized access or alteration of transmissions of data or arising from suspension or termination of the services.',
            content9: 'Notwithstanding anything to the contrary contained herein, Kalsultant liability to you for any cause whatsoever, and regardless of the form of the action, will at all times be limited to the amount paid, if any, by you to the Website, for the service during the term of membership.',
        },
        {
            heading: 'INDEMNIFICATION',
            content: 'The User shall indemnify, defend and hold harmless the Website and its parent, subsidiaries, affiliates, officers, directors, employees, suppliers, consultants and agents from any and all third party claims, liability, damages and/or costs (including, but not limited to, attorney’s fees) arising from Your use of the Services, Your violation of the Privacy Policy or these Terms of Service, or Your violation of any third party&#39;s rights, including without limitation, infringement by You or any other user of Your account of any intellectual property or other right of any person or entity. These Terms of Service will inure to the benefit of Website’s successors, assigns, and licensees.',
            content2: '',
            content3: '',
            content4: '',
            content5: '',
            content6: '',
            content7: '',
            content8: '',
            content9: '',

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
            <Navbar/>
            <div className='legal_container'>
                <div className='legal_content_area'>
                    <strong>Terms of Use, Policies and Conditions.</strong>
                    <h3 style={{ marginTop: '2.5rem' }}>
                        These terms and conditions of Use (hereinafter referred as “Terms of Usage”) describe and
                        govern the User’s use of the content and services offered by KALSULTANT USA LLC through
                        &nbsp;<a href="https://kalsultant.com" target='_blank'>www.kalsultant.com</a> (hereinafter referred as “We” “Kalsultant” “us” “our” “kalsultant
                        application” “Website”).
                    </h3>

                    {data.map((item, index) => (
                        <div className='each_content_section' style={{textAlign:'left'}}>
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
                            {item.content7.length > 0 ?
                                <h3>{item.content7}</h3>
                                :
                                <></>
                            }
                            {item.content8.length > 0 ?
                                <h3>{item.content8}</h3>
                                :
                                <></>
                            }
                            {item.content9.length > 0 ?
                                <h3>{item.content9}</h3>
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
            <Footer/>
        </div>
    )
}

