import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaBrain,
  FaCheckCircle,
  FaClock,
  FaLeaf,
  FaMicrophone,
  FaPhoneAlt,
  FaRobot,
  FaShieldAlt,
  FaTimes,
} from "react-icons/fa";

const agentSteps = [
  {
    icon: FaMicrophone,
    number: "01",
    title: "Listen",
    description: "The agent understands your question and the context you share in natural conversation.",
  },
  {
    icon: FaBrain,
    number: "02",
    title: "Interpret",
    description: "It connects your intent with curated Ayurvedic concepts, herbs, rasa, and daily practices.",
  },
  {
    icon: FaLeaf,
    number: "03",
    title: "Guide",
    description: "It responds in simple language and keeps the conversation moving with useful follow-up questions.",
  },
];

const trustPoints = [
  {
    icon: FaLeaf,
    title: "Ayurveda-aware",
    description: "Built around the language of herbs, rasa, dosha, and mindful daily routines.",
  },
  {
    icon: FaRobot,
    title: "Agentic by design",
    description: "Listens, reasons with context, and continues the conversation naturally.",
  },
  {
    icon: FaShieldAlt,
    title: "Clear boundaries",
    description: "Wellness education with responsible guidance, not medical diagnosis.",
  },
  {
    icon: FaClock,
    title: "Available anytime",
    description: "Begin an informative Ayurveda conversation whenever curiosity strikes.",
  },
];

const topics = [
  "Herbal properties",
  "Six tastes",
  "Dosha basics",
  "Dinacharya",
  "Ingredient quality",
  "E-Tongue insights",
];

const CallBotPage = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isCalling, setIsCalling] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStartCall = async () => {
    if (!phoneNumber) {
      setMessage("Please enter a phone number first.");
      setIsPopupOpen(true);
      return;
    }

    const fullNumber = countryCode + phoneNumber;
    setIsCalling(true);
    setIsPopupOpen(true);
    setMessage("Your Ayurvedic voice guide is preparing the call...");

    try {
      const response = await fetch("https://etongue-mid-call.onrender.com/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: fullNumber }),
      });

      if (response.ok) {
        setMessage("Call requested successfully. Please keep your phone nearby.");
      } else {
        const data = await response.json().catch(() => ({}));
        setMessage(data.message || "The call could not be started. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("The calling service is not reachable right now.");
    } finally {
      setIsCalling(false);
    }
  };

  const callSucceeded = message.startsWith("Call requested successfully");

  return (
    <main className="min-h-screen bg-[#fbf8ed] text-[#20352c]">
      {isPopupOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-5 py-8" role="presentation">
          <button
            type="button"
            aria-label="Close call status"
            onClick={() => setIsPopupOpen(false)}
            className="absolute inset-0 bg-[#173f32]/35 backdrop-blur-sm"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="call-status-title"
            className="relative z-10 w-full max-w-md overflow-hidden rounded-[2rem] border border-white/70 bg-[#fffdf6] p-7 text-center shadow-[0_30px_100px_rgba(23,63,50,0.25)] sm:p-9"
          >
            <button
              type="button"
              onClick={() => setIsPopupOpen(false)}
              aria-label="Close popup"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#edf2e3] text-[#5f7166] transition hover:bg-[#dfe8d2]"
            >
              <FaTimes />
            </button>

            <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
              {isCalling && (
                <span className="absolute inset-0 animate-ping rounded-full bg-[#8eb979]/30" />
              )}
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#e7efda] text-2xl text-[#39705a]">
                {callSucceeded ? <FaCheckCircle /> : <FaPhoneAlt />}
              </span>
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#8d6b50]">
              Ayurveda voice guide
            </p>
            <h2 id="call-status-title" className="mt-3 text-2xl font-bold text-[#173f32]">
              {isCalling
                ? "Connecting your guide"
                : callSucceeded
                  ? "Your call is on its way"
                  : "Call update"}
            </h2>
            <p className="mt-3 leading-7 text-[#68756d]" aria-live="polite">
              {message}
            </p>

            {phoneNumber && (
              <div className="mt-6 rounded-2xl border border-[#dce5cf] bg-[#f3f6eb] px-4 py-3">
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#899489]">
                  Calling
                </span>
                <span className="mt-1 block font-bold text-[#315d4c]">
                  {countryCode} {phoneNumber}
                </span>
              </div>
            )}

            {!isCalling && (
              <button
                type="button"
                onClick={() => setIsPopupOpen(false)}
                className="mt-6 w-full rounded-xl bg-[#286149] px-6 py-3 font-bold text-white transition hover:bg-[#1f503b]"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 border-b border-[#dce5cf] bg-[#fbf8ed]/90 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8efdc]">
              <img src="/Logo.png" alt="E-Tongue logo" className="h-9 w-9 object-contain" />
            </span>
            <div>
              <span className="block font-bold text-[#173f32]">E-Tongue</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#7d8d77]">
                Ayurveda voice guide
              </span>
            </div>
          </a>
          <a
            href="/"
            className="flex items-center gap-2 rounded-full border border-[#ccd9bd] bg-white/70 px-4 py-2 text-sm font-bold text-[#315d4c] transition hover:-translate-y-0.5 hover:bg-white"
          >
            <FaArrowLeft className="text-xs" />
            <span className="hidden sm:inline">Back to home</span>
            <span className="sm:hidden">Back</span>
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 pb-20 pt-14 lg:px-10 lg:pb-28 lg:pt-20">
        <div className="absolute -left-32 top-6 h-96 w-96 rounded-full bg-[#dfe9c9]/70 blur-3xl" />
        <div className="absolute -right-36 bottom-0 h-[30rem] w-[30rem] rounded-full bg-[#f4d9bd]/60 blur-3xl" />
        <div className="absolute left-[7%] top-20 h-36 w-36 rounded-full border border-[#b9c9a8]/40" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#cbd8b9] bg-[#edf2e3] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#456a54]">
              <span className="h-2 w-2 rounded-full bg-[#bb6b3f]" />
              Ayurveda meets voice intelligence
            </div>

            <h1 className="mt-7 max-w-3xl text-5xl font-bold leading-[1.02] tracking-tight text-[#173f32] sm:text-6xl lg:text-7xl">
              Ancient wisdom,
              <span className="block font-serif italic text-[#a75434]">a conversation away.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#617067]">
              Speak with an AI guide that understands Ayurvedic language and turns questions about herbs, tastes, and daily wellness into a calm, useful conversation.
            </p>

            <div className="mt-10 rounded-[2rem] border border-[#d9e2cc] bg-white/85 p-5 shadow-[0_25px_60px_rgba(47,78,60,0.1)] backdrop-blur sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-[#173f32]">Request a guided call</p>
                  <p className="mt-1 text-xs text-[#7a877f]">Your number is used only to initiate this call.</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf3e4] text-[#39705a]">
                  <FaPhoneAlt />
                </span>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <select
                  aria-label="Country code"
                  value={countryCode}
                  onChange={(event) => setCountryCode(event.target.value)}
                  className="rounded-xl border border-[#d9e2cc] bg-[#f7f8f1] px-3 py-3 text-[#20352c] outline-none focus:border-[#5f8d72] focus:ring-4 focus:ring-[#5f8d72]/10"
                >
                  <option value="+91">IN +91</option>
                  <option value="+1">US +1</option>
                  <option value="+44">UK +44</option>
                  <option value="+61">AU +61</option>
                  <option value="+81">JP +81</option>
                </select>
                <input
                  type="tel"
                  inputMode="numeric"
                  aria-label="Phone number"
                  placeholder="Phone number"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value.replace(/\D/g, ""))}
                  className="min-w-0 flex-1 rounded-xl border border-[#d9e2cc] bg-[#f7f8f1] px-4 py-3 text-[#20352c] outline-none placeholder:text-[#96a098] focus:border-[#5f8d72] focus:ring-4 focus:ring-[#5f8d72]/10"
                />
                <button
                  type="button"
                  onClick={handleStartCall}
                  disabled={isCalling}
                  className="rounded-xl bg-[#286149] px-6 py-3 font-bold text-white shadow-lg shadow-[#286149]/15 transition hover:-translate-y-0.5 hover:bg-[#1f503b] disabled:cursor-wait disabled:opacity-60"
                >
                  {isCalling ? "Connecting..." : "Call my guide"}
                </button>
              </div>

            </div>

            <p className="mt-4 max-w-xl text-xs leading-5 text-[#8a918b]">
              This assistant provides educational wellness information and does not replace advice from a qualified healthcare professional.
            </p>
          </div>

          <div className="relative mx-auto min-h-[520px] w-full max-w-xl overflow-hidden rounded-[3rem] border border-[#d5dfc6] bg-gradient-to-br from-[#eef3e3] via-[#f7f4e6] to-[#f2dfc9] p-6 shadow-[0_30px_80px_rgba(55,82,59,0.14)] sm:p-10">
            <div className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#aebfa0]/35" />
            <div className="absolute left-1/2 top-1/2 h-[285px] w-[285px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#b78262]/35" />
            <div className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50 blur-xl" />

            <div className="absolute left-6 top-7 rounded-2xl border border-white/70 bg-white/75 px-4 py-3 shadow-sm backdrop-blur sm:left-10 sm:top-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#87917e]">Signal</p>
              <p className="mt-1 text-sm font-bold text-[#315d4c]">Listening</p>
            </div>
            <div className="absolute right-5 top-28 rounded-2xl border border-white/70 bg-white/75 px-4 py-3 shadow-sm backdrop-blur sm:right-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#87917e]">Context</p>
              <p className="mt-1 text-sm font-bold text-[#8e5438]">Ayurveda</p>
            </div>
            <div className="absolute bottom-24 left-5 rounded-2xl border border-white/70 bg-white/75 px-4 py-3 shadow-sm backdrop-blur sm:left-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#87917e]">Agent</p>
              <p className="mt-1 text-sm font-bold text-[#315d4c]">Reasoning</p>
            </div>
            <div className="absolute bottom-8 right-7 rounded-2xl border border-white/70 bg-white/75 px-4 py-3 shadow-sm backdrop-blur sm:right-12">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#87917e]">Voice</p>
              <p className="mt-1 text-sm font-bold text-[#8e5438]">Responding</p>
            </div>

            <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-[10px] border-white/50 bg-[#286149] text-white shadow-[0_20px_50px_rgba(40,97,73,0.28)]">
              <FaRobot className="text-4xl" />
              <div className="mt-4 flex h-5 items-center gap-1">
                {[8, 16, 12, 20, 10].map((height, index) => (
                  <span
                    key={index}
                    className="w-1 rounded-full bg-[#d8e7c7]"
                    style={{ height: height + "px" }}
                  />
                ))}
              </div>
              <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d8e7c7]">Live agent</span>
            </div>

            <FaLeaf className="absolute bottom-10 left-1/2 -translate-x-1/2 rotate-12 text-2xl text-[#8eab75]/60" />
          </div>
        </div>
      </section>

      <section className="border-y border-[#dce5cf] bg-[#eef3e5] px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#5b785f]">Agentic flow</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#173f32] sm:text-5xl">A thoughtful answer has a process.</h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-[#68756d] lg:ml-auto">
              The guide does more than read a script. It follows your intent, retrieves relevant context, and adapts the next response to the conversation.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {agentSteps.map(({ icon: Icon, number, title, description }) => (
              <article key={number} className="group rounded-[2rem] border border-[#d4dfc7] bg-[#fbfcf7] p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#315d4c]/5">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e4ecd8] text-xl text-[#39705a]">
                    {React.createElement(Icon)}
                  </span>
                  <span className="font-serif text-3xl italic text-[#c18a68]">{number}</span>
                </div>
                <h3 className="mt-8 text-2xl font-bold text-[#173f32]">{title}</h3>
                <p className="mt-3 leading-7 text-[#68756d]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8ed] px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#5b785f]">Made for meaningful questions</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#173f32]">Begin wherever your curiosity begins.</h2>
              <div className="mt-8 flex flex-wrap gap-3">
                {topics.map((topic) => (
                  <span key={topic} className="rounded-full border border-[#d2ddc3] bg-white/75 px-4 py-2 text-sm font-semibold text-[#456a54]">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {trustPoints.map(({ icon: Icon, title, description }) => (
                <article key={title} className="rounded-[1.5rem] border border-[#e0e4d4] bg-white/70 p-5">
                  {React.createElement(Icon, { className: "text-xl text-[#a65b39]" })}
                  <h3 className="mt-5 font-bold text-[#173f32]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6f7b73]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#dce5cf] bg-[#f1f3e7] px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center text-sm text-[#718077] sm:flex-row sm:text-left">
          <p>Copyright {new Date().getFullYear()} E-Tongue Ayurveda Voice Guide.</p>
          <p>Traditional context. Responsible AI. Clear conversation.</p>
        </div>
      </footer>
    </main>
  );
};

export default CallBotPage;
