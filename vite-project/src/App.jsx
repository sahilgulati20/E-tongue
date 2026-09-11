import React, { useEffect, useState } from "react";

import { motion as Motion } from "framer-motion";
import { FaAngleDown, FaBrain, FaCheckCircle, FaLeaf, FaMicrochip } from "react-icons/fa";
import Spline from "@splinetool/react-spline";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// Import components
import About from "./components/About";
import WhatWeDo from "./components/Features";
import Contact from "./components/Team";
import Services from "./components/Services";
import ContactInfo from "./components/ContactInfo";
import Footer from "./components/footer"; 
import HardwareViewer from "./components/HardwareViewer";
import NewPage from "./pages/NewPage";
import CallBot from "./pages/CallBot"; 

// FloatingSpline keeps navigation isolated from the 3D scene.
function FloatingSpline() {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 right-0 z-40">
      <div
        className="h-32 w-32 sm:h-50 sm:w-50 cursor-pointer"
        onClick={() => navigate("/callbot")}
      >
        <Spline scene="https://prod.spline.design/NfwNxDSgByBL4GgB/scene.splinecode" />
      </div>
    </div>
  );
}

export default function App() {
  const [, setActiveSection] = useState("hero");
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "hardware", "what-we-do", "services", "team", "contact-info"];
      let current = "hero";
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 3 &&
            rect.bottom >= window.innerHeight / 3
          ) {
            current = id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/newpage" element={<NewPage />} />
        <Route path="/callbot" element={<CallBot />} />   

        <Route
          path="/"
          element={
            <div className="min-h-screen bg-[#f7fbf8] font-sans text-slate-900">
              {/* Hero Section */}
              <section
                id="hero"
                className="relative min-h-screen overflow-hidden bg-[#fbf8ed] text-[#20352c]"
              >
                <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#dfe9c9]/70 blur-3xl" />
                <div className="absolute -right-24 top-24 h-[28rem] w-[28rem] rounded-full bg-[#f4d9bd]/60 blur-3xl" />
                <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#dce9cf]/70 blur-3xl" />
                <div className="absolute left-[8%] top-32 h-32 w-32 rounded-full border border-[#b9c9a8]/35" />

                <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-14 px-6 pb-24 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-10">
                  <div className="max-w-2xl text-center lg:text-left">
                    <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#cbd8b9] bg-[#edf2e3] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#456a54]">
                      <span className="h-2 w-2 rounded-full bg-[#b96b42]" />
                      Agentic science rooted in Ayurveda
                    </div>
                    <h1 className="text-5xl font-bold leading-[1.02] tracking-tight text-[#173f32] sm:text-6xl lg:text-7xl">
                      From rasa
                      <span className="block font-serif italic text-[#a75434]">to reason.</span>
                    </h1>
                    <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-[#617067] sm:text-xl lg:mx-0">
                      E-Tongue is an Ayurveda-aware agent that senses herbal samples,
                      reasons across taste signals, and validates quality with clear evidence.
                    </p>
                    <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                      <button
                        onClick={() => scrollToSection("what-we-do")}
                        className="w-full rounded-xl bg-[#286149] px-7 py-3.5 font-bold text-white shadow-lg shadow-[#286149]/15 transition hover:-translate-y-0.5 hover:bg-[#1f503b] sm:w-auto"
                      >
                        Explore the agent
                      </button>
                      <button
                        onClick={() => scrollToSection("about")}
                        className="w-full rounded-xl border border-[#ccd9bd] bg-white/70 px-7 py-3.5 font-semibold text-[#315d4c] transition hover:border-[#8eaa81] hover:bg-white sm:w-auto"
                      >
                        How it works
                      </button>
                    </div>
                    <div className="mt-12 flex justify-center gap-8 border-t border-[#dce5cf] pt-6 text-left sm:gap-12 lg:justify-start">
                      <div>
                        <p className="text-2xl font-bold text-[#173f32]">6 rasa</p>
                        <p className="mt-1 text-sm text-[#7b877f]">taste mapping</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-[#173f32]">3-stage</p>
                        <p className="mt-1 text-sm text-[#7b877f]">agent loop</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-[#173f32]">Live</p>
                        <p className="mt-1 text-sm text-[#7b877f]">sensor insight</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative mx-auto w-full max-w-lg">
                    <div className="absolute -inset-5 rotate-3 rounded-[2.75rem] border border-[#cad7b8] bg-[#e8efdc]/55" />
                    <div className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/90 p-6 shadow-[0_30px_80px_rgba(47,78,60,0.14)] backdrop-blur">
                      <div className="flex items-center justify-between border-b border-[#e2e8d9] pb-5">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d806e]">
                            Agentic quality loop
                          </p>
                          <p className="mt-1 text-lg font-bold text-[#173f32]">Ashwagandha sample</p>
                        </div>
                        <span className="flex items-center gap-2 rounded-full bg-[#edf3e4] px-3 py-1.5 text-xs font-bold text-[#39705a]">
                          <span className="h-2 w-2 animate-pulse rounded-full bg-[#6fa16f]" />
                          Active
                        </span>
                      </div>

                      <div className="relative mt-6 space-y-3">
                        <div className="absolute bottom-8 left-6 top-8 w-px bg-gradient-to-b from-[#8cab7e] via-[#d0a17f] to-[#8cab7e]" />
                        {[
                          {
                            icon: FaLeaf,
                            step: "01",
                            label: "Sense",
                            detail: "Multi-sensor taste signals captured",
                            tone: "bg-[#e5eed9] text-[#39705a]",
                          },
                          {
                            icon: FaBrain,
                            step: "02",
                            label: "Reason",
                            detail: "Rasa patterns compared with references",
                            tone: "bg-[#f4e3d4] text-[#a05d3b]",
                          },
                          {
                            icon: FaCheckCircle,
                            step: "03",
                            label: "Validate",
                            detail: "Quality evidence translated clearly",
                            tone: "bg-[#e5eed9] text-[#39705a]",
                          },
                        ].map(({ icon: Icon, step, label, detail, tone }) => (
                          <div key={step} className="relative flex items-center gap-4 rounded-2xl border border-[#e0e7d7] bg-[#fbfcf7] p-4">
                            <span className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${tone}`}>
                              {React.createElement(Icon)}
                            </span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold tracking-[0.15em] text-[#a28772]">{step}</span>
                                <p className="font-bold text-[#173f32]">{label}</p>
                              </div>
                              <p className="mt-1 text-xs leading-5 text-[#738078]">{detail}</p>
                            </div>
                            <span className="ml-auto text-[#8ea283]">-&gt;</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 rounded-2xl bg-[#286149] p-5 text-white">
                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#cfe0c3]">Agent confidence</p>
                            <p className="mt-2 text-4xl font-bold">94<span className="text-xl">%</span></p>
                          </div>
                          <div className="flex flex-wrap justify-end gap-2 text-[10px] font-bold">
                            <span className="rounded-full bg-white/10 px-3 py-1.5">Tikta dominant</span>
                            <span className="rounded-full bg-white/10 px-3 py-1.5">Signal stable</span>
                          </div>
                        </div>
                        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15">
                          <div className="h-full w-[94%] rounded-full bg-[#dceabd]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Jumping Arrow */}
                <div
                  onClick={() => scrollToSection("about")}
                  className="absolute bottom-7 left-1/2 -translate-x-1/2 cursor-pointer text-2xl text-emerald-700"
                >
                  <Motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <FaAngleDown />
                  </Motion.div>
                </div>
              </section>

              {/* Sections */}
              <About />
              <section
                id="hardware"
                className="relative overflow-hidden bg-[#fbf8ed] py-24 text-[#20352c]"
              >
                <div className="absolute -right-32 top-16 h-80 w-80 rounded-full bg-[#dce9cf]/80 blur-3xl" />
                <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#5b785f]">
                      The agent&apos;s senses
                    </p>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#173f32] sm:text-5xl">
                      Where herbal rasa becomes a measurable signal.
                    </h2>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-[#68756d]">
                      The E-Tongue hardware is the sensing body of the quality agent. Its compact chamber and multi-sensor array capture the evidence the agent needs to reason about herbal identity and consistency.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      {["Rasa-aware sensing", "Multi-sensor evidence", "Agent-ready data"].map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full border border-[#d2ddc3] bg-white/75 px-4 py-2 text-sm font-semibold text-[#456a54] shadow-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <HardwareViewer />
                </div>
              </section>
              <WhatWeDo />
              <Services />
              <Contact />
              <ContactInfo />
              <Footer /> 

              {/* Dock Navbar */}
              <div className="fixed bottom-4 sm:bottom-2 left-1/2 transform -translate-x-1/2 z-50">
                <Motion.div
                  animate={{
                    scale: hoverIndex !== null ? 1.05 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="flex items-end bg-white/40 backdrop-blur-md px-3 sm:px-6 py-2 sm:py-4 rounded-2xl shadow-2xl space-x-2 sm:space-x-4"
                >
                  {[
                    {
                      id: "home",
                      label: "Home",
                      icon: "/home.png",
                      onClick: () => scrollToSection("hero"),
                    },
                    {
                      id: "about",
                      label: "About",
                      icon: "/about.png",
                      onClick: () => scrollToSection("about"),
                    },
                    {
                      id: "hardware",
                      label: "Hardware",
                      iconComponent: FaMicrochip,
                      onClick: () => scrollToSection("hardware"),
                    },
                    {
                      id: "what-we-do",
                      label: "Features",
                      icon: "/work.png",
                      onClick: () => scrollToSection("what-we-do"),
                    },
                    {
                      id: "services",
                      label: "Services",
                      icon: "/start.png",
                      onClick: () => scrollToSection("services"),
                    },
                    {
                      id: "contact-info",
                      label: "Contact",
                      icon: "/contact.png",
                      onClick: () => scrollToSection("contact-info"),
                    },
                  ].map((item, index) => {
                    // distance-based scaling like Mac dock
                    const distance =
                      hoverIndex === null ? 0 : Math.abs(index - hoverIndex);
                    const scale =
                      hoverIndex === null
                        ? 1
                        : Math.max(1, 1.35 - distance * 0.15);
                    const lift =
                      hoverIndex === index
                        ? -18
                        : hoverIndex !== null && distance === 1
                        ? -8
                        : 0;

                    return (
                      <div
                        key={item.id}
                        className="relative flex flex-col items-center"
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                      >
                        {/* Tooltip above */}
                        {hoverIndex === index && (
                          <Motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{
                              type: "spring",
                              stiffness: 250,
                              damping: 20,
                            }}
                            className="absolute -top-8 sm:-top-10 text-[10px] sm:text-xs font-medium bg-gray-800 text-white px-2 py-1 rounded shadow-lg z-50"
                          >
                            {item.label}
                          </Motion.span>
                        )}

                        {/* Icon bubble */}
                        <Motion.div
                          onClick={item.onClick}
                          animate={{ scale, y: lift }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                          className="h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-gray-200 flex items-center justify-center shadow-md cursor-pointer"
                        >
                          {item.iconComponent ? (
                            React.createElement(item.iconComponent, {
                              className: "h-5 w-5 text-emerald-700 sm:h-7 sm:w-7",
                              "aria-hidden": true,
                            })
                          ) : (
                            <img
                              src={item.icon}
                              alt={item.label}
                              className="h-6 w-6 object-contain sm:h-8 sm:w-8"
                            />
                          )}
                        </Motion.div>
                      </div>
                    );
                  })}
                </Motion.div>
              </div>

              {/* Floating 3D Spline */}
              <FloatingSpline />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}





