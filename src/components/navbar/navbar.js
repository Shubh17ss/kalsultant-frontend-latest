import React, { useState } from 'react'
import './navbar.css'
import logo from '../../assets/images/KalSultant_website_transparent_logo.webp'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SideBar } from './SideBar/sideBar';
import { IoIosMenu } from "react-icons/io";
import {toast} from 'react-hot-toast';

export const Navbar = () => {
    const router = useRouter();
    const [sideBarActive, setSideBarActive] = useState(false);
    const isMobileScreen = window.innerWidth <= 1000 ? true : false;
    const handleRedirectToItraa=()=>{
        toast('Store coming soon');
        // window.open("https://itraa.kalsultant.com",'_blank');
        return;
    }
    return (
        <>
            <div className='navBarContainer'>
                <div style={{ minWidth: '20%', display: 'flex', float: 'left' }}>
                    <img src={logo.src} style={{ width: '2.2rem', marginLeft: isMobileScreen ? '0.5rem' : '1rem', cursor: 'pointer' }} onClick={() => { router.push('/') }} />
                </div>
                {isMobileScreen ? <></>
                    :
                    <div className='navBarlinksContainer'>
                        <h3 className='navLink' onClick={() => { router.push('/about-us') }}>About us</h3>
                        <h3 className='navLink' onClick={() => { router.push('/how-we-work') }}>How we work</h3>
                        <Link href={'/pricing'} style={{ textDecoration: 'none' }}><h3 className='navLink'>Pricing</h3></Link>
                        <Link href={'/vaastu'} style={{ textDecoration: 'none' }}><h3 className='navLink'>Vaastu</h3></Link>
                    </div>
                }
                {
                    isMobileScreen
                        ?
                        <IoIosMenu size={32} onClick={() => { setSideBarActive(true) }} style={{marginRight:'0.5rem'}}/>
                        :
                        <div style={{ minWidth: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Link href={'/contact-us'} style={{ textDecoration: 'none' }}><h3 className='navLink'>Contact</h3></Link>
                            <div className='store_button' onClick={handleRedirectToItraa}>STORE</div>
                        </div>
                }
            </div>
            {isMobileScreen ? <SideBar data={[sideBarActive, setSideBarActive]} /> : <></>}
        </>
    )
}

