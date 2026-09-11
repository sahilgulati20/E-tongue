import React from "react";
import { FaLinkedin, FaFacebook, FaGithub } from "react-icons/fa";

const teamMembers = [
  { name: "Sahil Gulati", img: "/Sahil.jpg", role: "AI Developer & IoT", linkedin: "https://www.linkedin.com/in/sahil-gulati-663708320/", facebook: "#", github: "https://github.com/sahilgulati" },
  { name: "Priyanshu Rajput", img: "/Priyanshu.jpg", role: "AI/ML & Full Stack Developer", linkedin: "https://www.linkedin.com/in/priyanshu-rajput-4b29322ab/", facebook: "https://facebook.com/priyanshu.rajput", github: "https://github.com/priyanshurajput" },
  { name: "Srishti Ruhal", img: "/Srishti.jpg", role: "AR/VR Developer", linkedin: "https://www.linkedin.com/in/srishti-ruhal-931193317/", facebook: "https://facebook.com/srishti", github: "https://github.com/srishti" },
];

const socialLinks = [
  ["linkedin", FaLinkedin],
  ["facebook", FaFacebook],
  ["github", FaGithub],
];

const Contact = () => (
  <section id="team" className="relative overflow-hidden bg-[#eef3e5] py-24 text-center">
    <div className="absolute -right-32 top-24 h-80 w-80 rounded-full bg-[#f1d9c3]/70 blur-3xl" />
    <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#5b785f]">Human wisdom behind the agent</p>
      <h2 className="mb-4 mt-4 text-4xl font-bold tracking-tight text-[#173f32] sm:text-5xl">Many disciplines. One thoughtful intelligence.</h2>
      <p className="mx-auto mb-14 max-w-2xl text-lg leading-8 text-[#68756d]">Hardware, software, AI, immersive design, and research come together to give the E-Tongue agent reliable evidence and a human point of view.</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <article key={member.name} className="flex flex-col items-center rounded-[1.75rem] border border-[#d5dfc7] bg-[#fbfcf7]/85 p-4 shadow-lg shadow-[#315d4c]/5 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="group relative h-72 w-full overflow-hidden rounded-[1.35rem]">
              <div className="h-full w-full transform bg-cover bg-center transition duration-500 group-hover:scale-110" style={{ backgroundImage: "url(" + member.img + ")" }} />
              <div className="absolute inset-x-0 bottom-0 flex translate-y-2 flex-col items-start bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent px-5 pb-5 pt-16 text-left opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-lg font-semibold text-white">{member.name}</span>
                <span className="mt-1 text-sm text-emerald-100">{member.role}</span>
              </div>
            </div>
            <h3 className="mt-5 text-lg font-bold text-[#173f32]">{member.name}</h3>
            <p className="mt-1 text-sm text-[#748078]">{member.role}</p>
            <div className="mt-4 flex gap-5">
              {socialLinks.map(([key, Icon]) => member[key] && (
                <a key={key} href={member[key]} target="_blank" rel="noopener noreferrer" aria-label={member.name + " on " + key} className="text-[#53765f] transition hover:scale-125 hover:text-[#a05d3b]">
                  {React.createElement(Icon, {})}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Contact;


