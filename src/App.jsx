import { useState, useRef, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// import Database from "./pages/database"

function App() {
  // MODAL STATE for Data Privacy Popup
  const [showPopup, setShowPopup] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false); // if "No" button selected to Data Privacy

  // Show popup (Data Privacy)
  useEffect(() => {
    setShowPopup(true);
  }, []);

  const [isNavOpen, setIsNavOpen] = useState(false);

  // MODAL STATE for Definition of Terms
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      {/* HEADER */}
      <header
        className={`sticky top-0 z-50 transition-all p-1 md:p-2 duration-300 bg-[#7F77D8] opacity-95 filter drop-shadow-[0_0_0.25rem_#000]`}
      >
        <div className="container ">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-white px-6">
              {/* Logo section */}

              <img
                src="logo-SPC-est.png"
                className="size-18 md:size-15 object-contain rounded-full"
              />

              {/* Text section */}
              <div className="cursor-pointer">
                <h1 className="md:ml-2 text-2xl font-bold tracking-widest text-center font-mono">
                  GENDER AND DEVELOPMENT
                </h1>
                <span className="text-sm italic text-gray-300 flex justify-center items-center">
                  <hr className="md:w-15 text-white"></hr>
                  <p className="mx-1">City Government of San Pablo</p>
                  <hr className="md:w-15 text-white"></hr>
                </span>
              </div>
            </div>

            {/* Hamburger menu for mobile */}
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className={`lg:hidden focus:outline-none flex-shrink-0 pr-3 transition-colors text-white`}
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

            {/* Desktop nav */}
            <nav
              className={`hidden lg:flex space-x-8  ml-6 font-medium transition-colors text-white`}
            >
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
              <a href="#database" className="hover:text-[#DA78B5]">
                DATABASE
              </a>
            </nav>
          </div>

          {/* Mobile nav */}
          {isNavOpen && (
            <nav
              className={`lg:hidden mt-4 flex flex-col space-y-2 font-medium text-base text-center transition-colors text-white`}
            >
              <a
                href="#home"
                className="hover:bg-[#DA78B5] rounded transition-all duration-300"
              >
                HOME
              </a>
              <a
                href="#about"
                className="hover:bg-[#DA78B5] rounded transition-all duration-300"
              >
                ABOUT US
              </a>
              <a
                href="#laws"
                className="hover:bg-[#DA78B5] rounded transition-all duration-300"
              >
                LAWS AND ISSUANCES
              </a>
              <a
                href="#definitions"
                className="hover:bg-[#DA78B5] rounded transition-all duration-300"
              >
                DEFINITION OF TERMS
              </a>
              <a
                href="#database"
                className="hover:bg-[#DA78B5] rounded transition-all duration-300"
              >
                DATABASE
              </a>
            </nav>
          )}
        </div>
      </header>
      {/* TOP IMAGE SECTION */}
      <div id="home" className="w-full pt-3">
        <img
          src="/SGP.jpg"
          // src="/BG-Logo.jpg"
          alt="Top banner"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Circle Logo */}
      <div className="flex flex-row items-center justify-center py-7">
        <span>
          <hr className="w-30 md:w-50 lg:w-110 text-[#7F77D8]  filter drop-shadow-[0_0_0.25rem_#7F77D8]"></hr>
        </span>
        <img
          src="gad_logo.jpg"
          className="bg-white mx-1 filter drop-shadow-[0_0_0.25rem_#7F77D8] rounded-full w-20 h-20 zoom"
        />
        <span>
          <hr className="w-30 md:w-50 lg:w-110 text-[#7F77D8] filter drop-shadow-[0_0_0.25rem_#7F77D8]"></hr>
        </span>
      </div>

      {/* <!-- GENDER AND DEV & Mission, Vision, Core CONTAINER --> */}
      <div id="about" className="pt-10">
        {/* <!-- GENDER AND DEVELOPMENT w/ about us --> */}
        <div>
          <h2 className="text-4xl font-bold text-center">
            GENDER AND DEVELOPMENT
          </h2>
          <div className="text-center pt-4">
            <h3 className="text-base text-[#7F77D8] font-bold">ABOUT US</h3>
            <p className="text-gray-600 mx-10 md:mx-90">
              {/* Lorem ipsum dolor sit amet consectetur. Id id urna rutrum purus
              consectetur purus. Viverra vulputate arcu tellus integer in dictum
              dignissim felis nun magna. */}
              As for the Executive 2025—Reconstitution of the Gender and
              Development (GAD) of the City of San Pablo
              {/* The statement regarding the Executive 2025 focuses on the
              reconstitution of the Gender and Development (GAD) Focal Point
              System (GFPS) in the City of San Pablo. */}
            </p>
          </div>
        </div>
        {/* <!-- Mission, Core Values and Vision --> */}
        <div className="flex flex-col md:grid md:grid-cols-2 space-x-4">
          {/* <!-- Mission Card --> */}
          <div className="bg-white hover:bg-purple-200 border border-gray-300 p-6 rounded-lg transition-all duration-300 cursor-pointer shadow-lg ml-4 my-4 md:m-5">
            <div className="flex flex-col items-center space-x-4">
              <div className="bg-purple-50 p-4 rounded-full">
                {/* <!-- Mission Icon --> */}
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 8h10M7 12h10M7 16h10M7 4h1a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2h1z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl text-center font-semibold text-gray-800">
                  Mission
                </h3>
                <p className="text-gray-600 text-justify">
                  To serve as the catalyst for inclusive and sustainable local
                  development by creating an enabling environment for
                  investment, tourism, enterprise growth. We are committed to
                  empowering our citizens through responsive programs,
                  transparent governance, and strong partnerships that uphold
                  cultural pride, protect natural resources and ensure the well-
                  being and prosperity of every constituent.
                </p>
              </div>
            </div>
          </div>

          {/* <!-- Core Values Card --> */}
          {/* <div className="bg-purple-200 hover:bg-purple-400 hover:filter hover:drop-shadow-[0_0_0.25rem_#7F77D8]  p-6 rounded-lg  transition-all duration-300 cursor-pointer shadow-lg ml-4 my-2 md:m-2">
            <div className="flex flex-col items-center space-x-4">
              <div className="bg-purple-50 p-4 rounded-full">
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-purple-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-3xl font-semibold text-gray-800 text-center">
                  Core Values
                </h3>
                <p className="text-gray-600 text-justify">
                  Lorem ipsum dolor sit amet consectetur. Id id urna rutrum
                  purus consectetur purus. Vestibulum vitae proin facilisis
                  accumsan. Eget quis sit senectus parturient accumsan venenatis
                  augue id. Viverra vulputate arcu tellus integer in dictum
                  dignissim felis nun magna. Lorem ipsum dolor sit amet
                  consectetur. Id id urna rutrum purus consectetur purus.
                  Vestibulum vitae proin facilisis accumsan. Eget quis sit
                  senectus parturient accumsan venenatis augue id. Viverra
                  vulputate arcu tellus integer in dictum dignissim felis nun
                  magna.
                </p>
              </div>
            </div>
          </div> */}

          {/* <!-- Vision Card --> */}
          <div className="bg-white hover:bg-purple-200 p-6 border border-gray-300 rounded-lg   transition-all duration-300 cursor-pointer shadow-lg m-4 md:m-5">
            <div className="flex flex-col items-center space-x-4">
              <div className="bg-purple-50 p-4 rounded-full ml-2">
                {/* <!-- Vision Icon --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-purple-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl text-center font-semibold text-gray-800">
                  Vision
                </h3>
                <p className="text-gray-600 text-justify">
                  A walkable and progressive economic hub driven by investment
                  and tourism by year 2034 with God-loving, empowered, educated,
                  healthy and disciplined citizens proud of their cultural
                  heritage and natural wonders guided by inclusive growth,
                  sustainable development under a transparent, innovative and
                  accountable governance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CORE VALUES 2.0 */}
        {/* <div className="mb-5">
          <h2 className="font-bold uppercase text-center text-2xl text-gray-800">
            Core Values
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 md:mx-6">
            <div className="flex justify-center items-center p-2 bg-purple-100 rounded-md cursor-pointer m-2 shadow-md text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="font-semibold ml-2">Integrity</p>
            </div>
            <div className="flex justify-center items-center p-2 bg-purple-100 rounded-md cursor-pointer m-2 shadow-md text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                  clipRule="evenodd"
                />
                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
              </svg>

              <p className="font-semibold ml-2">Teamwork</p>
            </div>
            <div className="flex justify-center items-center p-2 bg-purple-100 rounded-md cursor-pointer m-2 shadow-md text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>

              <p className="font-semibold ml-2">Services</p>
            </div>
            <div className="flex justify-center items-center p-2 bg-purple-100 rounded-md cursor-pointer m-2 shadow-md text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="font-semibold ml-2">Passion</p>
            </div>
            <div className="flex justify-center items-center p-2 bg-purple-100 rounded-md cursor-pointer m-2 shadow-md text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25a.75.75 0 0 1 .75.75v.756a49.106 49.106 0 0 1 9.152 1 .75.75 0 0 1-.152 1.485h-1.918l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 18.75 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84l2.474-10.124H12.75v13.28c1.293.076 2.534.343 3.697.776a.75.75 0 0 1-.262 1.453h-8.37a.75.75 0 0 1-.262-1.453c1.162-.433 2.404-.7 3.697-.775V6.24H6.332l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 5.25 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84L4.168 6.241H2.25a.75.75 0 0 1-.152-1.485 49.105 49.105 0 0 1 9.152-1V3a.75.75 0 0 1 .75-.75Zm4.878 13.543 1.872-7.662 1.872 7.662h-3.744Zm-9.756 0L5.25 8.131l-1.872 7.662h3.744Z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="font-semibold ml-2">Respect</p>
            </div>
            <div className="flex justify-center items-center p-2 bg-purple-100 rounded-md cursor-pointer m-2 shadow-md text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
                <path
                  fillRule="evenodd"
                  d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="font-semibold ml-2">Innovativeness</p>
            </div>
            <div className="flex justify-center items-center p-2 bg-purple-100 rounded-md cursor-pointer m-2 shadow-md text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M15.75 8.25a.75.75 0 0 1 .75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 1 1-.992-1.124A2.243 2.243 0 0 0 15 9a.75.75 0 0 1 .75-.75Z" />
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM4.575 15.6a8.25 8.25 0 0 0 9.348 4.425 1.966 1.966 0 0 0-1.84-1.275.983.983 0 0 1-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 0 1 2.328-.377L16.5 15h.628a2.25 2.25 0 0 1 1.983 1.186 8.25 8.25 0 0 0-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.575 15.6Z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="font-semibold ml-2">Diversity</p>
            </div>
            <div className="flex justify-center items-center p-2 bg-purple-100 rounded-md cursor-pointer m-2 shadow-md text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="font-semibold ml-2">Excellence</p>
            </div>
          </div>
        </div> */}
      </div>
      {/* LAWS and ISSUANCES */}
      <div id="laws" className="md:px-10 pt-20 pb-5 bg-white">
        <h1 className="text-3xl font-bold mb-5 text-gray-800 text-center">
          LAWS & ISSUANCES
        </h1>

        <ul className="space-y-4 text-sm md:grid md:grid-cols-3 md:gap-10 ">
          {[
            {
              href: "/pds_docu/Amendments to PCW-DILG-DBM-NEDA JMC No. 2013-01 Guidelines on the Localization of the Magna Carta of Women.pdf",
              label:
                "Amendments to PCW-DILG-DBM-NEDA JMC No. 2013-01: Guidelines on the Localization of the Magna Carta of Women",
            },
            {
              href: "/pds_docu/An Act Promoting the Integration of Women as Full and Equal Partners of Men in Development and Nation Building and for Other Purposes.pdf",
              label:
                "An Act Promoting the Integration of Women as Full and Equal Partners of Men in Development and Nation Building and for Other Purposes",
            },
            {
              href: "/pds_docu/Executive Order No. 004, S.2020 – Reconstitution of the Gender and Development (GAD) Focal Point System or GFPS of the City of San Pablo.pdf",
              label:
                "Executive Order No. 004, S.2020 – Reconstitution of the Gender and Development (GAD) Focal Point System or GFPS of the City of San Pablo",
            },
            {
              href: "/pds_docu/Guidelines on the Localization of the Magna Cart of Women.pdf",
              label:
                "Guidelines on the Localization of the Magna Cart of Women",
            },
            {
              href: "/pds_docu/Magna Carta of Women – Implementing Rules and Regulations.pdf",
              label:
                "Magna Carta of Women – Implementing Rules and Regulations",
            },
            // {
            //   href: "/pds_docu/Magna Carta of Women – Implementing Rules and Regulations.pdf",
            //   label:
            //     "Magna Carta of Women – Implementing Rules and Regulations",
            // },
          ].map(({ href, label }) => (
            <li
              key={href}
              className=" group flex flex-col items-center space-x-3 p-10 md:px-10 md:py-12 rounded-md hover:bg-pink-100 transition-all duration-300 border border-gray-200 mx-15 md:m-0 shadow-lg"
            >
              {/* Document-download icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-10 m-2 text-[#DA78B5]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>

              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 no-underline group-hover:text-[#DA78B5] group-hover:underline font-medium text-center"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* DEFINITION OF TERMS CARD */}
      <div
        id="definitions"
        className="bg-blue-200 p-6 mb-5 rounded-lg shadow-lg m-4 md:mx-10"
      >
        <div className="flex flex-col items-center space-x-4">
          <div className="bg-blue-50 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold mb-2 text-gray-800 text-center">
              DEFINITION OF TERMS
            </h1>
            <span className="text-gray-600 text-justify">
              Gender and Development (GAD) – Refers to the development
              perspective and process....
            </span>

            <div className="mt-2 flex justify-center">
              {/* Trigger SEE MORE Button */}
              <button
                onClick={toggleModal}
                className="border border-[#2575fc] flex items-center gap-2 text-[#2575fc] hover:text-white text-base font-medium bg-white hover:bg-blue-300 transition-all duration-300 shadow-xl  px-15 md:px-25 py-2 rounded-md cursor-pointer"
              >
                See More
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-100">
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between bg-white px-6 py-4 border-b border-gray-200 rounded-t-2xl">
              <h3 className="text-2xl font-bold text-[#2575fc] tracking-tight">
                DEFINITION OF TERMS
              </h3>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-[#2575fc] transition-colors text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 text-gray-800 leading-relaxed">
              <p>
                <span className="font-semibold text-lg text-[#2575fc]">
                  Gender and Development (GAD)
                </span>
                – Refers to the development perspective and process that is
                participatory and empowering, equitable, sustainable, free from
                violence, respectful of human rights, supportive of
                self-determination and actualization of human potential.
              </p>
              <p>
                <span className="font-semibold text-lg text-[#2575fc]">
                  Gender Analysis
                </span>
                – Refers to a framework to compare the relative advantages and
                disadvantages faced by women and men in various spheres of life,
                including the family, workplace, school, community, and
                political system.
              </p>
              <p>
                <span className="font-semibold text-lg text-[#2575fc]">
                  Gender Audit
                </span>
                – Refers to a form of “social audit” or “quality audit” which
                determines whether the organization’s internal practices and
                related support systems for gender mainstreaming are effective,
                reinforcing each other and are being followed. It may assist
                organizations in establishing a baseline, identifying critical
                gaps and challenges, and recommending strategies for
                improvement.
              </p>
              <p>
                <span className="font-semibold text-lg text-[#2575fc]">
                  Gender Equality
                </span>
                – Refers to the principles asserting the equality of women and
                men and their right to enjoy equal conditions realizing their
                full human potential to contribute to and benefit from the
                results of development. It includes the elimination of
                gender-based discrimination in all aspects of life.
              </p>
              <p>
                <span className="font-semibold text-lg text-[#2575fc]">
                  GAD Focal Point System
                </span>
                – is an interacting and interdependent group of people in all
                government instrumentalities tasked to catalyze and accelerate
                gender mainstreaming. It is a mechanism established to ensure
                and advocate for, guide, coordinate, and monitor the
                development, implementation, review and updating of their GAD
                plans and GAD-related programs, activities and projects (PAPs).
              </p>
              <p>
                <span className="font-semibold text-lg text-[#2575fc]">
                  Gender Mainstreaming
                </span>
                – refers to the strategy for making women’s as well as men’s
                concerns and experiences an integral dimension of the design,
                implementation, monitoring, and evaluation of policies, programs
                and projects in all social, political, civil, and economic
                spheres so that women and men benefit equally. It is the process
                of assessing the implications for women and men of any planned
                action, including legislation, policies or programs in all areas
                and at all levels.
              </p>
              <p>
                <span className="font-semibold text-lg text-[#2575fc]">
                  GAD Plan and Budget
                </span>
                – is a systematic approach to gender mainstreaming, carried out
                by all government instrumentalities, through the annual
                development and implementation of programs, activities and
                projects and addressing gender issues and concerns in their
                respective organizations, sectors and constituencies by
                utilizing at least 5% of their total budget allocation.
              </p>
              <p>
                <span className="font-semibold text-lg text-[#2575fc]">
                  Performance-Based Budgeting
                </span>
                – is an approach to budgeting which involves a review of the
                agencies’ existing budgetary programs and projects to ensure
                that these support their core mandated functions and produce the
                targeted outcomes and outputs.
              </p>
              <p>
                <span className="font-semibold text-lg text-[#2575fc]">
                  Rights-Based Approach
                </span>
                – refers to the recognition of every human being both as a
                person and as a right-holder. It strives to secure the freedom,
                well-being and dignity of all people, everywhere, within the
                framework of essential human rights standards, principles,
                duties and obligations.
              </p>
              <p>
                <span className="font-semibold text-lg text-[#2575fc]">
                  Women’s Empowerment
                </span>
                – is a goal of and an essential process for women’s advancement.
                It is the process and condition by which women mobilize to
                understand, identify and overcome gender discrimination so as to
                achieve equality in welfare and equal access to resources. In
                this context, women become agents of development and not just
                beneficiaries enabling them to make decisions based on their own
                views and perspectives.
              </p>
              <p>
                <span className="font-semibold text-lg text-[#2575fc]">
                  National Machineries for Women
                </span>
                – Agencies with a mandate for the advancement of women
                established within and by governments for integrating gender
                concerns in development policy and planning.
              </p>
              <p>
                <span className="font-semibold text-lg text-[#2575fc]">
                  Patriarchy
                </span>
                – iSystemic societal structures that institutionalize male
                physical, social and economic power over women.
              </p>
              <p>
                <span className="font-semibold text-lg text-[#2575fc]">
                  Sex and Gender
                </span>
                – Sex refers to the biological characteristics that categorize
                someone as either female or male; whereas gender refers to the
                socially determined ideas and practices of what it is to be
                female or male.
              </p>
              <p>
                <span className="font-semibold text-lg text-[#2575fc]">
                  Social Justice
                </span>
                – Fairness and equity as a right for all in the outcomes of
                development, through processes of social transformation WID/GAD.
              </p>
              <p>
                <span className="font-semibold text-lg text-[#2575fc]">
                  The WID (or Women in Development)
                </span>
                – approach calls for greater attention to women in development
                policy and practice, and emphasizes the need to integrate them
                into the development process. In contrast, the GAD (or Gender
                and Development) approach focuses on the socially constructed
                basis of differences between men and women and emphasizes the
                need to challenge existing gender roles and relations.
              </p>
              <p>
                <span className="font-semibold text-lg text-[#2575fc]">
                  Women’s Empowerment
                </span>
                – A 'bottom-up' process of transforming gender power relations,
                through individuals or groups developing awareness of women's
                subordination and building their capacity to challenge it.
              </p>
              <p>
                <span className="font-semibold text-lg text-[#2575fc]">
                  Women's Human Rights
                </span>
                – The recognition that women's right are human rights and that
                women experience injustices solely because of their gender.
              </p>

              {/* Footer */}
              <div className="flex justify-center pt-6 border-t border-gray-200">
                <button
                  onClick={toggleModal}
                  className="px-8 py-2 font-semibold rounded-md border border-[#2575fc] text-[#2575fc] hover:bg-[#2575fc] hover:text-white transition-all duration-300"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* DEFINITION OF TERMS btn */}
      {/* <button
        onClick={toggleModal}
        className="fixed bottom-5 right-5 bg-white border border-gray-300 hover:bg-blue-300 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition"
      > */}
      <button
        onClick={toggleModal}
        className="fixed bottom-15 right-0 bg-white border border-gray-300 hover:bg-blue-300 rounded-l-full  w-15 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
          />
        </svg>
      </button>

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
                    By Continuing to the San Pablo GAD Website, Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit,...Would you
                    like to continue?{" "}
                    {/* <a href="#" className="text-blue-600 underline">
                        Read More
                      </a> */}
                  </p>
                </div>

                {/* Buttons for Data Privacy */}
                <div className="flex justify-center my-4 md:my-0 gap-5">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="bg-purple-600 py-2 w-40 md:w-30 cursor-pointer translate-all duration-300 hover:bg-purple-700"
                  >
                    Yes
                  </button>
                  {/* 👇 “No” button triggers overlay */}
                  <button
                    onClick={() => setShowOverlay(true)}
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

      {/* “No” clicked to Data Privacy */}
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

      {/* FOOTER */}
      <footer className="bg-gradient-to-l from-[#DA78B5] to-[#2575fc] text-white">
        <div className="flex flex-col items-center justify-center text-sm p-4">
          <span className="text-center">
            © 2025
            <a href="#" className="pl-1 hover:underline">
              Management Information System Office
            </a>
            . All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
