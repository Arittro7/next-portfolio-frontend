"use client";

import { useRef, useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);


  return (
    <section id="contact" className="py-20">
      <div className="max-w-3xl mx-auto md:px-6">
        <h1 className="flex items-center justify-center font-bold text-2xl md:text-4xl gap-2 mb-10">
          Get In Touch <MdEmail className="text-red-600" size={36} />
        </h1>
        <p className="text-center text-gray-500 mb-10">
          Have a project or just want to say hi? Fill out the form below or connect with me on my socials.
        </p>

        <form
          ref={form}
          // email will add after getting mark
          className="shadow-md rounded-2xl p-6 md:p-10 flex flex-col"
        >
          <label className="block text-lg font-medium ">Name</label>
          <input
            required
            type="text"
            name="user_name"
            className="mt-2 mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          <label className="block text-lg font-medium ">Email</label>
          <input
            required
            type="email"
            name="user_email"
            className="mt-2 mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          <label className="block text-lg font-medium ">Message</label>
          <textarea
            required
            name="message"
            rows={4}
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex items-center justify-center px-6 py-3 rounded-lg 
              bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-4 border-white mr-2"></div>
                Sending...
              </div>
            ) : (
              "Send Message"
            )}
          </button>
        </form>

        <div className="flex items-center justify-center my-8">
          <span className="h-px w-20 bg-gray-500"></span>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <span className="h-px w-20 bg-gray-500"></span>
        </div>

        <div className="flex items-center justify-center gap-5 flex-wrap">
          <a
            href="https://www.linkedin.com/in/nahid-arman/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border-2 border-gray-500 rounded-lg 
              text-gray-600 font-medium hover:border-blue-600 hover:text-blue-600 transition"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={22} className="text-blue-600" />
            LinkedIn
          </a>

          <a
            href="https://github.com/Arittro7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border-2 border-gray-500 rounded-lg 
              text-gray-600 font-medium hover:border-gray-700 hover:text-gray-700 transition"
            aria-label="GitHub"
          >
            <FaGithub size={22} />
            GitHub
          </a>

          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border-2 border-gray-500 rounded-lg 
              text-gray-600 font-medium hover:border-indigo-500 hover:text-indigo-500 transition"
            aria-label="Facebook"
          >
            <FaFacebook size={22} className="text-indigo-500" />
            Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
