import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

export default function App() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
    </main>
  )
}
