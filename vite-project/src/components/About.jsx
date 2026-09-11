import React from "react";

const steps = [
  { number: "01", title: "Sense", text: "Specialized chemical sensors read the taste profile of herbal extracts, including bitter, sweet, sour, and more." },
  { number: "02", title: "Interpret", text: "AI and machine-learning models translate those signals into repeatable, understandable measurements." },
  { number: "03", title: "Validate", text: "Results help connect Ayurvedic knowledge with modern quality standards and confident decisions." },
];

const About = () => (
  <section id="about" className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950 py-24 text-white">
    <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
    <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />

    <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300">The idea</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">Taste science, made visible.</h2>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-emerald-50">The Electronic Tongue combines hardware sensors, intelligent analysis, and Ayurvedic context to make herbal quality more objective, consistent, and easier to trust.</p>
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {steps.map((step) => (
          <article key={step.number} className="rounded-[1.75rem] border border-white/10 bg-white/10 p-7 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/15">
            <span className="text-sm font-bold text-emerald-300">{step.number}</span>
            <h3 className="mt-8 text-2xl font-bold text-white">{step.title}</h3>
            <p className="mt-4 text-base leading-7 text-emerald-50">{step.text}</p>
          </article>
        ))}
      </div>

      <p className="mx-auto mt-14 max-w-4xl text-center text-lg leading-8 text-emerald-200">By pairing scientific research with practical tools, E-Tongue helps teams move from subjective tasting to evidence-backed herbal quality assessment.</p>
    </div>
  </section>
);

export default About;
