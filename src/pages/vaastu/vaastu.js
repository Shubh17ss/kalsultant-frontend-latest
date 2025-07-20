import './vaastu.css'
import { Navbar } from '../../components/navbar/navbar'
import { Footer } from '../../components/footer/footer'
import { House3D } from '../../components/3dComponents/house'

export const Vaastu = () => {
    return (
        <div style={{ overflowX: 'hidden', position: 'relative', width: '100%', minHeight: '100vh', textAlign: 'center' }}>
            <Navbar />
            <div className='vaastu_container'>
                <div className='vaastu_hero_section'>
                    <div className='v_left_section'>
                        <strong><span>SHAPING</span> SPACES<br/><span>FOR</span> PROSPERITY</strong>
                    </div>
                    <div className='v_right_section'>
                        <House3D />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
