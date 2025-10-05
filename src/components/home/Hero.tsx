import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { IoFolderSharp } from "react-icons/io5";

function Hero() {
  return (
    <section className="max-w-7xl mx-auto my-20 flex flex-col-reverse lg:flex-row items-center gap-10 md:px-6 justify-between">
      {/* Left Content */}
      <div className="text-center lg:text-left max-w-xl space-y-6">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-200">
          Hey, I am <span className="text-indigo-400">Arittro</span> 👋
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-300">Frontend Developer</h2>
        <p className="text-gray-400 leading-relaxed">
          Frontend web developer with 1+ years of hands-on experience in creating dynamic and visually appealing web applications. 
          Proficient in <span className="font-semibold text-indigo-400">ReactJS, Next.js, Tailwind CSS, MongoDB</span>, 
          and dedicated to improving user experience through innovative web solutions.
        </p>

        {/* Social Links */}
        <div className="links pt-4 flex items-center gap-5 flex-wrap justify-center lg:justify-start">
          <a
            href="https://www.linkedin.com/in/nahid-arman/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 font-semibold"
          >
            <FaLinkedin size={26} color="#2966BC" />
            <span className="hover:text-[#2966BC] text-lg">LinkedIn</span>
          </a>
          <a
            href="https://github.com/Arittro7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 font-semibold"
          >
            <FaGithub size={26} color="gray" />
            <span className="hover:text-gray-400 text-lg">GitHub</span>
          </a>
          
          <a
            href="/Arittro_Frontend_Developer_Resume.pdf"
            download
            className="flex items-center gap-2 text-gray-500 font-semibold"
          >
            <IoFolderSharp size={26} color="red" />
            <span className="hover:text-red-500 text-lg">Resume</span>
          </a>
        </div>
      </div>

      {/* Right Content - Profile Image */}
      <div className="w-52 h-52 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg">
        <img
          src="/me.png"
          alt="My Photo"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}

export default Hero;
