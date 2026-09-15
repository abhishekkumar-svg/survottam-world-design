
import RealEstateHero from './components/Hero/Hero'
import Portfolio from './components/Portfolio/Portfolio'
import Philosophy from './components/Philosophy/Philosophy'
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs'

import Stats from './components/Stats/Stats'
import CTA from './components/CTA/CTA'
import Footer from './components/Footer/Footer'

const Homepage = () => {
  return (
    <div>

<RealEstateHero/>
<Philosophy/>
<Portfolio/>
<WhyChooseUs/>
{/* <Investment/> */}
<Stats/>
<CTA/>
<Footer/>

    </div>
  )
}

export default Homepage