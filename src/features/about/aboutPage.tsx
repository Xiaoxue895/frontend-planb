import Navbar from '@/components/Navbar'
import HeroSection from '@/features/about/components/HeroSection'
import HowItWorks from '@/features/about/components/HowItWorks'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <HowItWorks />
      <HeroSection />
      <HowItWorks />
      <Footer />
    </main>
  )
}