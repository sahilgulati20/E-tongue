import React, { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "Herbal Quality Check",
    desc: "Chemical sensors analyze herbal extracts to help verify consistency, purity, and authenticity.",
    img: "/quality.png",
  },
  {
    title: "AI-Powered Analysis",
    desc: "Sensor data is processed with intelligent models that turn complex measurements into clear validation.",
    img: "/ai.png",
  },
  {
    title: "Real-Time Monitoring",
    desc: "Continuous assessment gives your team timely insight into the properties of every sample.",
    img: "/monitor.png",
  },
  {
    title: "User-Friendly Interface",
    desc: "Simple dashboards and clear visuals make technical results easier for everyone to understand.",
    img: "/dashboard.png",
  },
];

const WhatWeDo = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;
    const scroll = () => {
      if (!isHovered && scrollContainer) {
        scrollAmount += 1.5;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) scrollAmount = 0;
        scrollContainer.scrollLeft = scrollAmount;
      }
    };
    const interval = setInterval(scroll, 20);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleScroll = (direction) => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section id="what-we-do" className="relative overflow-hidden bg-[#f7fbf8] py-24 text-slate-900">
      <div className="absolute inset-0">
        <img src="/featureBG.jpg" alt="" className="h-full w-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-emerald-50/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">Built for clarity</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">From sample to insight.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">Every part of the platform is designed to make herbal quality easier to measure, explain, and trust.</p>
        </div>

        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex w-full gap-5 overflow-x-hidden px-1 pb-4"
        >
          {[...features, ...features].map((item, index) => (
            <article key={item.title + index} className="min-w-[290px] max-w-sm rounded-[1.75rem] border border-emerald-100 bg-white/90 p-7 shadow-xl shadow-emerald-900/5 transition duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-2xl">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 p-3">
                <img src={item.img} alt="" className="h-full w-full object-contain" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">0{(index % features.length) + 1}</p>
              <h3 className="mb-3 mt-2 text-2xl font-bold text-slate-900">{item.title}</h3>
              <p className="text-base leading-7 text-slate-600">{item.desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <button type="button" onClick={() => handleScroll("left")} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm font-bold text-emerald-700 shadow-sm transition hover:bg-emerald-50" aria-label="Previous feature">
            Prev
          </button>
          <button type="button" onClick={() => handleScroll("right")} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm font-bold text-emerald-700 shadow-sm transition hover:bg-emerald-50" aria-label="Next feature">
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
