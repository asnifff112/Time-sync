import HeroSection from '@/app/components/home/HeroSection'
import MechanicsOfTime from '@/app/components/home/MechanicsOfTime'
import GallerySection from '@/app/components/home/GallerySection'
// Import CTASection, ScrollWatcher, StorySection similarly

export default function Home() {
  return (
    <>
      <HeroSection />
      <GallerySection/>
      <MechanicsOfTime />
     
      {/* Add CTAButtons, ScrollWatcher for pinning, StorySection with text reveals */}
    </>
  )
}
