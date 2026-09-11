import React from "react";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Herbal Quality Agent",
    description: "Give the agent your sensor readings and receive an evidence-led herbal profile with match, impurity, and rasa indicators.",
    icon: "/quality.png",
    link: "/newpage",
    tag: "Sense + Reason + Validate",
    steps: ["Sensor input", "Reference reasoning", "Quality evidence"],
    palette: "from-[#e5eed9] to-[#f8faef]",
    accent: "text-[#39705a]",
  },
  {
    title: "Ayurveda Voice Guide",
    description: "Start a natural phone conversation about herbs, six tastes, Ayurvedic concepts, and the E-Tongue workflow.",
    icon: "/bot.png",
    link: "/callbot",
    tag: "Listen + Interpret + Guide",
    steps: ["Voice intent", "Ayurveda context", "Guided response"],
    palette: "from-[#f4e2d2] to-[#fffaf1]",
    accent: "text-[#a05d3b]",
  },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <section id="services" className="relative overflow-hidden bg-white py-24 text-[#20352c]">
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#e4edd7]/80 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#5b785f]">Choose your agent</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#173f32] sm:text-5xl">
            Two ways to explore Ayurvedic intelligence.
          </h2>
          <p className="mt-4 text-lg leading-8 text-[#68756d]">
            Work with measured sample evidence or begin with a guided voice conversation. Both experiences share the same focus on clarity and context.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <Motion.button
              type="button"
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              onClick={() => navigate(service.link)}
              className={"group relative overflow-hidden rounded-[2.25rem] border border-[#dbe3d2] bg-gradient-to-br p-8 text-left shadow-xl shadow-[#315d4c]/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:p-10 " + service.palette}
            >
              <div className="flex items-start justify-between">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70 p-3 shadow-sm">
                  <img src={service.icon} alt="" className="h-full w-full object-contain" />
                </span>
                <span className="font-serif text-4xl italic text-[#bd8766]/65">0{index + 1}</span>
              </div>
              <p className={"mt-9 text-xs font-bold uppercase tracking-[0.17em] " + service.accent}>{service.tag}</p>
              <h3 className="mt-3 text-3xl font-bold text-[#173f32]">{service.title}</h3>
              <p className="mt-4 leading-7 text-[#68756d]">{service.description}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {service.steps.map((step) => (
                  <span key={step} className="rounded-full border border-white/80 bg-white/55 px-3 py-1.5 text-[11px] font-bold text-[#607268]">
                    {step}
                  </span>
                ))}
              </div>
              <span className={"mt-8 block text-sm font-bold " + service.accent}>
                Open agent <span aria-hidden="true">-&gt;</span>
              </span>
            </Motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
