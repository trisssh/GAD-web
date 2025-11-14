import { useState, useRef, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// import Database from "./pages/database"

function App() {
  // MODAL STATE for Data Privacy Popup

  // Show popup (Data Privacy)
  //useEffect(() => {
  //  setShowPopup(true);
  //}, []);

  const [isNavOpen, setIsNavOpen] = useState(false);

  // MODAL STATE for Definition of Terms
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
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
          {/* <h2 className="text-4xl font-bold text-center">
            GENDER AND DEVELOPMENT
          </h2> */}
          <div>
            <span className="text-lg  text-gray-900 flex justify-center items-center">
              {/* <hr className="md:w-40 text-purple-500" /> */}
              <p className=" font-bold">SAN PABLO CITY</p>
              {/* <hr className="md:w-40 text-purple-500" /> */}
            </span>
            <h2 className="text-4xl font-bold text-center">
              GENDER AND DEVELOPMENT
            </h2>
          </div>
          <span className="text-base  text-gray-800 flex justify-center items-center">
            {/* <hr className="md:w-45 text-purple-500" /> */}
            <p className="mx-1 font-bold">
              Portal <span>(SGP)</span>{" "}
            </p>
            {/* <hr className="md:w-45 text-purple-500" /> */}
          </span>
          <div className="text-center pt-4">
            <h3 className="text-xl text-[#7F77D8] font-bold">ABOUT US</h3>
            <p className="text-gray-600 mx-10 md:mx-90">
              As for the Executive 2025—Reconstitution of the Gender and
              Development (GAD) of the City of San Pablo
            </p>
          </div>
        </div>
        {/* <!-- Mission, Core Values and Vision --> */}
        <div className="flex flex-col md:grid md:grid-cols-2 space-x-4">
          {/* <!-- Mission Card --> */}
          <div className="bg-white hover:bg-purple-200 border border-gray-300 p-6 rounded-lg transition-all duration-300 cursor-pointer shadow-lg ml-4 my-4 md:m-5">
            <div className="flex flex-col items-center space-x-4">
              <div className="bg-white p-4 rounded-full border border-purple-400 shadow-md filter drop-shadow-[0_0_0.25rem_#7F77D8]">
                {/* <!-- Mission Icon --> */}
                <svg
                  className="w-6 h-6 text-purple-600 "
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

          {/* <!-- Vision Card --> */}
          <div className="bg-white hover:bg-purple-200 p-6 border border-gray-300 rounded-lg   transition-all duration-300 cursor-pointer shadow-lg m-4 md:m-5">
            <div className="flex flex-col items-center space-x-4">
              <div className="bg-white p-4 rounded-full border border-purple-400 shadow-md filter drop-shadow-[0_0_0.25rem_#7F77D8]">
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
      </div>
      {/* LAWS and ISSUANCES */}
      <div id="laws" name="law" className="md:px-10 pt-20 pb-5 bg-white">
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
          <div className="bg-white p-4 rounded-full border border-blue-400 shadow-md filter drop-shadow-[0_0_0.25rem_#2575fc]">
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
              <span className="font-bold">"SGP"</span> also known as the San
              Pablo City Gender and Development (GAD) Portal
            </span>

            <div className="mt-2 flex justify-center">
              {/* Trigger SEE MORE Button */}
              <button
                onClick={toggleModal}
                className="border border-[#2575fc] flex items-center gap-2 text-[#2575fc] hover:text-white text-base font-medium bg-white hover:bg-blue-300 transition-all duration-300 border-blue-600 shadow-md shadow-blue-600 px-15 md:px-25 py-2 rounded-md cursor-pointer"
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
              <p className="text-gray-900 text-justify text-2xl">
                <span className="font-bold text-[#2575fc]">"SGP"</span> also
                known as the San Pablo City Gender and Development (GAD) Portal
              </p>
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

      {/* FOOTER */}
      <footer className="bg-gradient-to-l from-[#DA78B5] to-[#2575fc] text-white ">
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
    </>
  );
}

export default App;
