import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import './sideBar.css'
import { IoCloseOutline } from "react-icons/io5";

export const SideBar = ({ data }) => {
    let setSideBarActive = data[1];
    const navigate = useNavigate();
    const location = useLocation();
    const navigateHandler = (route) => {
        if (location.pathname === route) {
            setSideBarActive(false);
            return;
        }
        navigate(route);

    }

    return (
        <div className={`sideNavBarContainer ${data[0] ? 'active' : ''}`}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '0 0.5rem'}}>
                <IoCloseOutline size={28} onClick={() => { setSideBarActive(false) }}/>
            </div>
            <div className='sideNavBarMenuContainer'>
                <p onClick={() => { navigateHandler('/about-us') }}>About</p>
                <p onClick={() => { navigateHandler('/contact-us') }}>Contact</p>
                <p onClick={() => { navigateHandler('/how-we-work') }}>How we work</p>
                <p onClick={() => { navigateHandler('/pricing') }}>Pricing</p>
                <p onClick={() => { navigateHandler('/schedule-session') }}>Schedule session</p>
                <p onClick={() => { navigateHandler('/terms&Conditions') }}>Terms & Conditions</p>
                <p onClick={() => { navigateHandler('/privacy-policy') }}>Privacy policy</p>
                <p onClick={() => { navigateHandler('/refund-policy') }}>Refund policy</p>
            </div>
        </div>
    )
}
