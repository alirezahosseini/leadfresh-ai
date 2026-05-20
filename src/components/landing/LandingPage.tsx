import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Testimonials } from './Testimonials';
import { Features } from './Features';
import { ProductShowcase } from './ProductShowcase';
import { HowItWorks } from './HowItWorks';
import { Pricing } from './Pricing';
import { CTA } from './CTA';
import { Footer } from './Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Testimonials />
      <Features />
      <ProductShowcase />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
};
