import React from 'react'
import { useRouter, usePathname } from 'next/navigation';
import './sideBar.css'
import { IoCloseOutline } from "react-icons/io5";
import {toast} from 'react-hot-toast'

export const SideBar = ({ data }) => {
    let setSideBarActive = data[1];
    const router = useRouter();
    const pathname = usePathname();
    const navigateHandler = (route) => {
        if (pathname === route) {
            setSideBarActive(false);
            return;
        }
        router.push(route);

    }
    const handleRedirectToItraa = () => {
        toast('Store coming soon');
        // window.open('https://itraa.kalsultant.com', '_blank');
    }

    return (
        <div className={`sideNavBarContainer ${data[0] ? 'active' : ''}`}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '0 0.5rem' }}>
                <IoCloseOutline size={28} onClick={() => { setSideBarActive(false) }} />
            </div>
            <div className='sidebar_btn_container'>
                <button className='sb_store_button' onClick={handleRedirectToItraa}>STORE</button>
            </div>
            <div className='sideNavBarMenuContainer'>
                <p onClick={() => { navigateHandler('/about-us') }}>About</p>
                <p onClick={() => { navigateHandler('/contact-us') }}>Contact</p>
                <p onClick={() => { navigateHandler('/how-we-work') }}>How we work</p>
                <p onClick={() => { navigateHandler('/pricing') }}>Pricing</p>
                <p onClick={() => { navigateHandler('/join-queue') }}>Join the queue</p>
                <p onClick={() => { navigateHandler('/vaastu') }}>Vaastu</p>
                <p onClick={() => { navigateHandler('/terms-and-conditions') }}>Terms & Conditions</p>
                <p onClick={() => { navigateHandler('/privacy-policy') }}>Privacy policy</p>
                <p onClick={() => { navigateHandler('/refund-policy') }}>Refund policy</p>
            </div>
        </div>
    )
}
