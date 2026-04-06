import React from 'react'
import Header from '../components/Header/Header'
import Banner from '../components/BannerSections/Banner'
import Companypartners from './Courses/Companypartners'
import OurImpact from './OurImpact'
import WhyJoinUS from './WhyJoinUS'
import CareerSection from './CareerSection'
import ReviewSection from './ReviewSection'
import FAQSection from './FAQSection'
import Footer from '../components/Footer/Footer'
import PlacementList from './PlacementList'
import OurPremiumServices from './OurPremiumServices'
import HomeLanding from './HomeLanding'


const Home = () => {
  return (
    <div>
        <Header/>
        <HomeLanding/>
        <Banner/>
        <OurImpact/>
        <PlacementList/>
        <OurPremiumServices/>
        <CareerSection/>
        <WhyJoinUS/>
        <Companypartners/>
        
        <ReviewSection/>
        <FAQSection/>
        <Footer/>
       
    </div>
  )
}

export default Home