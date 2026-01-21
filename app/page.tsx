import HeroSection from '@/app/components/home/HeroSection'
import MechanicsOfTime from '@/app/components/home/MechanicsOfTime'
import TimeInMotion from '@/app/components/home/TimeInMotion'
// Import CTASection, ScrollWatcher, StorySection similarly

export default function Home() {
  return (
    <>
      <HeroSection />
      <MechanicsOfTime />
      <TimeInMotion />
      {/* Add CTAButtons, ScrollWatcher for pinning, StorySection with text reveals */}
    </>
  )
}
