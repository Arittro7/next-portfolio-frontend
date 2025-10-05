import About from '@/components/home/About';
import Blogs from '@/components/home/Blogs';
import Contact from '@/components/home/Contact';
import Hero from '@/components/home/Hero';
import Projects from '@/components/home/Projects';
import Skills from '@/components/home/Skills';
import React from 'react';

const Home = () => {
  return (
    <div>
      <Hero/>
      <About/>
      <Projects/>
      <Blogs/>
      <Skills/>
      <Contact/>
    </div>
  );
};

export default Home;