import { SignIn } from '@/components/ui/buttons/auth'
import FeaturedSection from '@/components/ui/home/featured-section'
import HeroSection from '@/components/ui/home/hero-section'
import NewArrivals from '@/components/ui/home/new-arrivals'
import React from 'react'

const HomePage = () => {
  return (
    <>
    <HeroSection />
    <FeaturedSection />
    <NewArrivals/>
    </>
  )
}

export default HomePage