import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';
import Hero from './Hero';
import StatsBar from './StatsBar';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Roles from './Roles';
import Testimonials from './Testimonials';
import Pricing from './Pricing';
import FAQ from './FAQ';
import CTABanner from './CTABanner';

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <HowItWorks />
      <Roles />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Home;
