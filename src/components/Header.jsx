import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      {/* HEADER */}
      <header className="sticky top-0 z-50 transition-all p-1 md:p-2 duration-300 bg-[#7F77D8] opacity-95 filter drop-shadow-[0_0_0.25rem_#000]">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Logo + Text */}
            <div className="flex items-center text-white px-6">
              <img
                src="logo-SPC-est.png"
                alt="San Pablo Logo"
                className="size-18 md:size-15 object-contain rounded-full"
              />

              <div className="cursor-pointer">
                <h1 className="md:ml-2 text-2xl font-bold tracking-widest text-center font-mono">
                  GENDER AND DEVELOPMENT
                </h1>
                <span className="text-sm italic text-gray-300 flex justify-center items-center">
                  <hr className="md:w-15 text-white" />
                  <p className="mx-1">City Government of San Pablo</p>
                  <hr className="md:w-15 text-white" />
                </span>
              </div>
            </div>

            {/* Hamburger menu (mobile) */}
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="lg:hidden focus:outline-none flex-shrink-0 pr-3 text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isNavOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex space-x-8 ml-6 font-medium text-white">
              <a href="#home" className="hover:text-[#DA78B5]">
                HOME
              </a>
              <a href="#about" className="hover:text-[#DA78B5]">
                ABOUT US
              </a>
              <a href="#laws" className="hover:text-[#DA78B5]">
                LAWS AND ISSUANCES
              </a>
              <a href="#definitions" className="hover:text-[#DA78B5]">
                DEFINITION OF TERMS
              </a>
              <Link to="/database" className="hover:text-[#DA78B5]">
                DATABASE
              </Link>
            </nav>
          </div>

          {/* Mobile nav (collapsible) */}
          {isNavOpen && (
            <nav className="lg:hidden mt-4 flex flex-col space-y-2 font-medium text-base text-center text-white">
              <a
                href="#home"
                className="hover:bg-[#DA78B5] rounded transition-all duration-300"
                onClick={() => setIsNavOpen(false)}
              >
                HOME
              </a>
              <a
                href="#about"
                className="hover:bg-[#DA78B5] rounded transition-all duration-300"
                onClick={() => setIsNavOpen(false)}
              >
                ABOUT US
              </a>
              <a
                href="#laws"
                className="hover:bg-[#DA78B5] rounded transition-all duration-300"
                onClick={() => setIsNavOpen(false)}
              >
                LAWS AND ISSUANCES
              </a>
              <a
                href="#definitions"
                className="hover:bg-[#DA78B5] rounded transition-all duration-300"
                onClick={() => setIsNavOpen(false)}
              >
                DEFINITION OF TERMS
              </a>
              <Link
                to="/database"
                className="hover:bg-[#DA78B5] rounded transition-all duration-300"
                onClick={() => setIsNavOpen(false)}
              >
                DATABASE
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* 🔽 This is where your route’s content will appear */}
      {/* <main className="flex-grow"> */}
      <Outlet />
      {/* </main> */}
    </div>
  );
}
