"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const pathName = usePathname();

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`h-screen bg-gray-900 text-white flex flex-col
        transition-transform duration-300 z-40
        w-56 fixed top-0 left-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"} `}
      >
        {/* Logo / Title */}
        <Link href="/" className="text-xl font-bold mb-6 border-b p-4">
          Arittro
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 px-4">
          <Link
            href="/dashboard/blogs"
            className={`p-2 rounded-md ${
              pathName.includes("blogs") ? "bg-gray-700" : "text-gray-500"
            }`}
          >
            Blogs
          </Link>
          <Link
            href="/dashboard/projects"
            className={`p-2 rounded-md ${
              pathName.includes("projects") ? "bg-gray-700" : "text-gray-500"
            }`}
          >
            Projects
          </Link>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
