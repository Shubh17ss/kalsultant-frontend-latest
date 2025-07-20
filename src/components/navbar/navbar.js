import React, { useState } from 'react'
import './navbar.css'
import logo from '../../assets/images/KalSultant_website_transparent_logo.webp'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { SideBar } from './SideBar/sideBar';
import { IoIosMenu } from "react-icons/io";

export const Navbar = () => {
    const navigate = useNavigate();
    const [sideBarActive, setSideBarActive] = useState(false);
    const isMobileScreen = window.innerWidth <= 1000 ? true : false;
    const handleRedirectToItraa=()=>{
        window.open("https://itraa.kalsultant.com",'_blank');
        return;
    }
    return (
        <>
            <div className='navBarContainer'>
                <div style={{ minWidth: '20%', display: 'flex', float: 'left' }}>
                    <img src={logo} style={{ width: '2.2rem', marginLeft: isMobileScreen ? '0.5rem' : '1rem', cursor: 'pointer' }} onClick={() => { navigate('/') }} />
                </div>
                {isMobileScreen ? <></>
                    :
                    <div className='navBarlinksContainer'>
                        <h3 onClick={() => { navigate('/about-us') }}>About us</h3>
                        <h3 onClick={() => { navigate('/how-we-work') }}>How we work</h3>
                        <Link to={'/pricing'} style={{ textDecoration: 'none' }}><h3>Pricing</h3></Link>
                        <Link to={'/vaastu'} style={{ textDecoration: 'none' }}><h3>Vaastu</h3></Link>
                    </div>
                }
                {
                    isMobileScreen
                        ?
                        <IoIosMenu size={32} onClick={() => { setSideBarActive(true) }} style={{marginRight:'0.5rem'}}/>
                        :
                        <div style={{ minWidth: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Link to={'/contact-us'} style={{ textDecoration: 'none' }}><h3>Contact</h3></Link>
                            <div className='store_button' onClick={handleRedirectToItraa}>STORE</div>
                        </div>
                }
            </div>
            {isMobileScreen ? <SideBar data={[sideBarActive, setSideBarActive]} /> : <></>}
        </>
    )
}

