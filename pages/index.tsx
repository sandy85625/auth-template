import type { NextPage } from 'next'
import LandingNavbar from '../components/navbars/LandingNavbar'
import Landing from '../components/landing/Landing'

const Home: NextPage = () => {
  return (
    <>
      <LandingNavbar />
      <Landing />
    </>
    
  )
}

export default Home
