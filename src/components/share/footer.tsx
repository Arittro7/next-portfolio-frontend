import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" text-gray-300 mt-10">
      <div className=" px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left */}
        <p className="text-lg font-semibold">Nahid Arman</p>

        {/* Middle - Links */}
        <div className="flex gap-6 text-sm">
          <Link href="/projects" className="hover:text-white transition">
            Projects
          </Link>
          <Link href="/blogs" className="hover:text-white transition">
            Blog
          </Link>
        </div>

        {/* Right - Social Icons */}
        <div className="flex gap-4">
          <a
            href="https://github.com/Arittro7"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/nahid-arman"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaFacebook size={20} />
          </a>
        </div>
      </div>
      <p className="text-[11px] text-center mt-10">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
}