import React from "react";
import { FaEnvelope, FaLeaf, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const contactDetails = [
  { icon: FaMapMarkerAlt, label: "Visit", value: "MIET College, Meerut, Uttar Pradesh" },
  { icon: FaPhone, label: "Call", value: "+91 98xxxxxxxx" },
  { icon: FaEnvelope, label: "Write", value: "info@etongue.com" },
];

const ContactInfo = () => (
  <section id="contact-info" className="relative overflow-hidden bg-[#fbf8ed] py-24 text-[#20352c]">
    <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#dce9cf]/80 blur-3xl" />
    <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-[#f2ddc9]/70 blur-3xl" />

    <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
      <div className="flex flex-col justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e4edd7] text-xl text-[#39705a]">
          <FaLeaf />
        </span>
        <p className="mt-8 text-sm font-bold uppercase tracking-[0.22em] text-[#5b785f]">Speak with the human team</p>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#173f32] sm:text-5xl">
          Bring your herbal quality question to us.
        </h2>
        <p className="mt-6 text-lg leading-8 text-[#68756d]">
          Whether you are exploring the hardware, the quality agent, or the Ayurveda voice guide, our team can help you find the right next step.
        </p>

        <div className="mt-9 space-y-3">
          {contactDetails.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 rounded-2xl border border-[#dce4d2] bg-white/60 p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf3e4] text-[#39705a]">
                {React.createElement(Icon)}
              </span>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.17em] text-[#9a806e]">{label}</span>
                <span className="mt-1 block text-sm font-semibold text-[#315044]">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={(event) => event.preventDefault()}
        className="space-y-4 rounded-[2.25rem] border border-[#d9e2cc] bg-white/85 p-6 shadow-[0_25px_70px_rgba(47,78,60,0.1)] backdrop-blur sm:p-9"
      >
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a05d3b]">Send an inquiry</p>
          <h3 className="mt-2 text-2xl font-bold text-[#173f32]">How can we help?</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input type="text" placeholder="Your name" className="w-full rounded-xl border border-[#dce4d2] bg-[#f8f9f3] px-4 py-3 text-[#20352c] outline-none placeholder:text-[#929c94] focus:border-[#6f9275] focus:ring-4 focus:ring-[#6f9275]/10" />
          <input type="email" placeholder="Your email" className="w-full rounded-xl border border-[#dce4d2] bg-[#f8f9f3] px-4 py-3 text-[#20352c] outline-none placeholder:text-[#929c94] focus:border-[#6f9275] focus:ring-4 focus:ring-[#6f9275]/10" />
        </div>
        <input type="text" placeholder="Subject" className="w-full rounded-xl border border-[#dce4d2] bg-[#f8f9f3] px-4 py-3 text-[#20352c] outline-none placeholder:text-[#929c94] focus:border-[#6f9275] focus:ring-4 focus:ring-[#6f9275]/10" />
        <textarea placeholder="Tell us what you are exploring..." rows="6" className="w-full rounded-xl border border-[#dce4d2] bg-[#f8f9f3] px-4 py-3 text-[#20352c] outline-none placeholder:text-[#929c94] focus:border-[#6f9275] focus:ring-4 focus:ring-[#6f9275]/10" />
        <button type="submit" className="w-full rounded-xl bg-[#286149] py-3.5 font-bold text-white shadow-lg shadow-[#286149]/15 transition hover:-translate-y-0.5 hover:bg-[#1f503b]">
          Send message
        </button>
        <p className="text-center text-xs text-[#8a948c]">A member of the team will respond as soon as possible.</p>
      </form>
    </div>
  </section>
);

export default ContactInfo;
