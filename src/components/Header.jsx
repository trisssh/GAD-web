import { useState, useEffect, useLayoutEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const location = useLocation();

  const cookies = new Cookies();
  useLayoutEffect(() => {
    if (cookies.get("privacy") == true) {
      // console.log('asdswa');
      setShowPopup(false);
      // console.log('adasdsafsafsa');
    }
  }, []);
  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]); // re-run on every route change

  const handlePrivacy = () => {
    cookies.set("privacy", true, { path: "/" });

    setShowPopup(false);
  };

  //navbar dropdown for GAD
  const DropdownGAD = [
    {
      id: 1,
      name: "Sector",
      link: "/journaldatabase",
    },

    {
      id: 2,
      name: "Barangay",
      link: "barangaydatabase",
    },
    {
      id: 3,
      name: "Documents",
      link: "documents",
    },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

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
              <a href="/#home" className="hover:text-[#DA78B5]">
                HOME
              </a>
              <a href="/#about" className="hover:text-[#DA78B5]">
                ABOUT US
              </a>
              <a href="/#laws" name="law" className="hover:text-[#DA78B5]">
                LAWS AND ISSUANCES
              </a>
              <a href="/#definitions" className="hover:text-[#DA78B5]">
                DEFINITION OF TERMS
              </a>
              {/* <Link to="/database" className="hover:text-[#DA78B5]">
                DATABASE
              </Link> */}
              <div className="relative group">
                <Link className="hover:text-[#DA78B5] flex items-center">
                  DATABASE
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 font-bold mx-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </Link>

                <div className="absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md">
                  <ul>
                    {DropdownGAD.map((data) => (
                      <li key={data.id}>
                        <a
                          href={data.link}
                          className="inline-block w-full rounded-md p-2 hover:bg-[#7F77D8] hover:text-white text-center"
                        >
                          {data.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>

          {/* Mobile nav (collapsible) */}
          {isNavOpen && (
            <nav className="lg:hidden mt-4 flex flex-col space-y-2 font-medium text-base text-center text-white">
              <a
                href="/#home"
                className="hover:bg-[#DA78B5] rounded transition-all duration-300"
                onClick={() => setIsNavOpen(false)}
              >
                HOME
              </a>
              <a
                href="/#about"
                className="hover:bg-[#DA78B5] rounded transition-all duration-300"
                onClick={() => setIsNavOpen(false)}
              >
                ABOUT US
              </a>
              <a
                href="/#laws"
                className="hover:bg-[#DA78B5] rounded transition-all duration-300"
                onClick={() => setIsNavOpen(false)}
              >
                LAWS AND ISSUANCES
              </a>
              <a
                href="/#definitions"
                className="hover:bg-[#DA78B5] rounded transition-all duration-300"
                onClick={() => setIsNavOpen(false)}
              >
                DEFINITION OF TERMS
              </a>

              {/* <Link
                to="/database"
                className="hover:bg-[#DA78B5] rounded transition-all duration-300"
                onClick={() => setIsNavOpen(false)}
              >
                DATABASE
              </Link> */}

              <div className="relative">
                <button onClick={toggleDropdown} className="w-full ">
                  <div className="hover:bg-[#DA78B5] rounded transition-all duration-300 flex justify-center items-center">
                    DATABASE
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`size-4 font-bold mx-1 transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </button>

                {isDropdownOpen && (
                  <div className="flex justify-center">
                    <div className="absolute z-[9999] w-[350px] rounded-md bg-white p-2 text-black shadow-md mt-1">
                      <ul>
                        <li>
                          <Link
                            to="/database/sector"
                            className="inline-block w-full rounded-md p-2 hover:bg-[#7F77D8] hover:text-white text-center"
                            onClick={closeDropdown}
                          >
                            Sector
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/database/barangay"
                            className="inline-block w-full rounded-md p-2 hover:bg-[#7F77D8] hover:text-white text-center"
                            onClick={closeDropdown}
                          >
                            Barangay
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/database/document"
                            className="inline-block w-full rounded-md p-2 hover:bg-[#7F77D8] hover:text-white text-center"
                            onClick={closeDropdown}
                          >
                            Document
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* 🔽 This is where your route’s content will appear */}
      {/* <main className="flex-grow"> */}
      <Outlet />
      {/* </main> */}

      {/* DATA PRIVACY POP */}
      {showPopup && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <div className="fixed bottom-0 left-0 bg-white w-full px-5 py-1">
            <div className="grid md:flex">
              {/* Date Privacy Icon */}
              <div className="flex justify-center md:justify-start">
                <img src="DPO.jpg" className="size-35" />
              </div>

              {/* Data Privacy Notice and Buttons */}
              <div className="md:flex md:items-center md:gap-20">
                <div className="">
                  <h2 className="text-xl font-semibold mb-1 text-gray-800">
                    Data Privacy Notice
                  </h2>

                  <p className="text-gray-600 text-justify text-sm">
                    By continuing, you acknowledge and accept the San Pablo City
                    GAD’s Data Privacy Notice, in line with the Data Privacy Act
                    of 2012. Would you like to continue?{" "}
                    {/* <a href="#" className="text-blue-600 underline">
                        Read More
                      </a> */}
                  </p>
                </div>

                {/* Buttons for Data Privacy */}
                <div className="flex justify-center my-4 md:my-0 gap-5">
                  <button
                    onClick={() => handlePrivacy()}
                    className="bg-purple-600 py-2 w-40 md:w-30 cursor-pointer translate-all duration-300 hover:bg-purple-700"
                  >
                    Yes
                  </button>
                  {/* 👇 “No” button triggers overlay */}
                  <button
                    onClick={() => setShowPopup(true)}
                    className="bg-gray-200 py-2 w-40 md:w-30 cursor-pointer translate-all duration-300 hover:bg-gray-300 border"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showOverlay && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="text-lg font-semibold mb-3">Action Cancelled</h2>
            <p className="text-gray-600 mb-4">
              You chose not to continue to our SPC GAD Portal. Would you like to
              close this message?
            </p>
            <button
              onClick={() => setShowOverlay(false)}
              className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
