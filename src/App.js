import './App.css';
import { ParticlesBackground } from './components/particlesBg/Particles/particlesBackground'
import { Contact } from './pages/contact-us/contact';
import { Home } from './pages/Home/home';
import { Pricing } from './pages/Pricing/pricing'
import { Schedule } from './pages/schedule-session/schedule';
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { SuccessPage } from './pages/schedule-session/components/successPage';
import { RecordReview } from './pages/record-review/recordReview';
import { TermsAndConditions } from './pages/policies/termsAndConditions';
import { PrivacyPolicy } from './pages/policies/privacyPolicy';
import { RefundPolicy } from './pages/policies/refundPolicy';
import { AboutUs } from './pages/about-us/aboutUs';
import { HowWeWork } from './pages/how-we-work/howWeWork';

function App() {
  return (
    <>
      <ParticlesBackground />
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/contact-us' element={<Contact />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/how-we-work' element={<HowWeWork />} />
        <Route path='/schedule-session' element={<Schedule />} />
        <Route path='/schedule-session/session/:sessionId' element={<SuccessPage />} />
        <Route path='/feedback' element={<RecordReview />} />
        <Route path='/terms&Conditions' element={<TermsAndConditions />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/refund-policy' element={<RefundPolicy />} />
      </Routes>

    </>
  );
}

export default App;
