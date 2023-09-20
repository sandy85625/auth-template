import type { NextPage } from 'next'
import Landing from '../components/landing/Landing';
import FeaturesComponent from '../components/landing/FeaturesComponent';
import CallToAction from '../components/landing/CallToActionComponent';
import ContactUs from '../components/landing/ContactUsComponent';

const Home: NextPage = () => {
  return (
    <>
      <Landing />
      <FeaturesComponent />
      <CallToAction />
      <ContactUs />
    </>
    
  )
}

export default Home
