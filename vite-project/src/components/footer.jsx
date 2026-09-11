import React from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaLeaf } from "react-icons/fa";

const Footer = () => (
  <footer className="border-t border-[#d6e0cb] bg-[#eef3e5] text-[#315044]">
    <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.15fr_1fr] lg:px-10">
      <div>
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70">
            <img src="/Logo.png" alt="E-Tongue logo" className="h-14 w-14 object-contain" />
          </span>
          <div>
            <p className="text-xl font-bold text-[#173f32]">E-Tongue</p>
            <p className="mt-1 text-sm text-[#718077]">Ayurvedic taste intelligence.</p>
          </div>
        </div>
        <p className="mt-8 max-w-md leading-7 text-[#68756d]">
          An agentic platform that senses herbal samples, reasons with Ayurvedic context, and explains quality evidence clearly.
        </p>
        <div className="mt-8 flex gap-3 text-lg">
          {[
            ["mailto:info@etongue.com", "Email", FaEnvelope],
            ["https://linkedin.com", "LinkedIn", FaLinkedin],
            ["https://github.com", "GitHub", FaGithub],
          ].map(([href, label, Icon]) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d2ddc5] bg-white/60 text-[#53765f] transition hover:-translate-y-1 hover:text-[#a05d3b]">
              {React.createElement(Icon)}
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#8f6049]">Explore</h3>
          <ul className="mt-5 space-y-3 text-sm text-[#68756d]">
            <li><a href="#about" className="transition hover:text-[#173f32]">Intelligence</a></li>
            <li><a href="#hardware" className="transition hover:text-[#173f32]">Hardware</a></li>
            <li><a href="#what-we-do" className="transition hover:text-[#173f32]">Capabilities</a></li>
            <li><a href="#services" className="transition hover:text-[#173f32]">Agents</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#8f6049]">Experience</h3>
          <ul className="mt-5 space-y-3 text-sm text-[#68756d]">
            <li><a href="/newpage" className="transition hover:text-[#173f32]">Quality agent</a></li>
            <li><a href="/callbot" className="transition hover:text-[#173f32]">Voice guide</a></li>
            <li><a href="#team" className="transition hover:text-[#173f32]">Our team</a></li>
            <li><a href="#contact-info" className="transition hover:text-[#173f32]">Contact</a></li>
          </ul>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <FaLeaf className="text-xl text-[#78966c]" />
          <h3 className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-[#8f6049]">Rooted in</h3>
          <p className="mt-4 text-sm leading-6 text-[#68756d]">Ayurvedic context<br />Scientific sensing<br />Responsible AI</p>
        </div>
      </div>
    </div>
    <div className="border-t border-[#d6e0cb] px-6 py-5 text-center text-xs text-[#7b877f]">
      Copyright {new Date().getFullYear()} E-Tongue Project. Built by HYPERLOOP.
    </div>
  </footer>
);

export default Footer;
