import React, { useState } from "react";

import { useEffect } from "react";

const sensorFields = [
  { name: "ph", label: "pH sensor", hint: "Amla / sourness signal" },
  { name: "tds", label: "TDS sensor", hint: "Dissolved compounds" },
  { name: "orp", label: "ORP sensor", hint: "Oxidation state" },
  { name: "bme688", label: "BME688 sensor", hint: "Aroma / volatile signal" },
];

const formatLabel = (value) => value.replaceAll("_", " ");

const NewPage = () => {
  const [formData, setFormData] = useState({ ph: "", tds: "", orp: "", color_r: "", color_g: "", color_b: "", bme688: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    const mappedData = Object.fromEntries(Object.entries(formData).map(([key, value]) => [key, parseFloat(value)]));
    try {
      const response = await fetch("http://localhost:3000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mappedData),
      });
      const data = await response.json();
      setResult({
        predicted_product: data.predicted_product || "N/A",
        overall_match: data.overall_match ?? 0,
        overall_impurity: data.overall_impurity ?? 0,
        sensor_matches: data.sensor_matches || {},
        taste_profile: data.taste_profile || {},
        standard_profile: data.standard_profile || {},
        charts: data.charts || {},
        note: data.note || "No expert note available.",
      });
    } catch (error) {
      console.error("Error fetching analysis:", error);
      setResult({ error: "The analysis service could not be reached. Check that the API is running and try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fbf8ed] text-[#20352c]">
      <header className="border-b border-[#dce5cf] bg-[#fbf8ed]/90 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8efdc]">
              <img src="/Logo.png" alt="E-Tongue logo" className="h-9 w-9 object-contain" />
            </span>
            <div>
              <span className="block font-bold text-[#173f32]">E-Tongue</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#7d8d77]">Herbal quality agent</span>
            </div>
          </a>
          <a href="/" className="rounded-full border border-[#ccd9bd] bg-white/70 px-4 py-2 text-sm font-bold text-[#315d4c] transition hover:bg-white">Back to home</a>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 py-16 lg:px-10 lg:py-24">
        <div className="absolute -right-40 top-8 h-96 w-96 rounded-full bg-[#dce9cf] blur-3xl" />
        <div className="absolute -left-40 bottom-20 h-80 w-80 rounded-full bg-[#f2ddc9]/70 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#5b785f]">Ayurvedic quality workspace</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#173f32] sm:text-6xl">Let the agent read your herbal sample.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#68756d]">Seven sensor readings become one reasoned assessment, connecting measured evidence with reference quality and Ayurvedic taste context.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-12 grid gap-8 rounded-[2.25rem] border border-[#d9e2cc] bg-white/90 p-6 shadow-[0_25px_70px_rgba(47,78,60,0.1)] sm:p-8 lg:grid-cols-[1fr_0.8fr] lg:p-10">
            <div>
              <div className="grid gap-5 sm:grid-cols-2">
                {sensorFields.map((field) => (
                  <label key={field.name} className="block">
                    <span className="text-sm font-bold text-slate-800">{field.label}</span>
                    <span className="mt-1 block text-xs text-slate-500">{field.hint}</span>
                    <input type="number" step="any" name={field.name} value={formData[field.name]} onChange={handleChange} placeholder="Enter reading" required className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10" />
                  </label>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-[#e5d7ca] bg-[#fff8ee] p-5">
                <p className="text-sm font-bold text-slate-800">Colour sensor (RGB)</p>
                <p className="mt-1 text-xs text-slate-500">Add the red, green, and blue channel readings.</p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {["color_r", "color_g", "color_b"].map((name) => (
                    <input key={name} type="number" step="any" name={name} value={formData[name]} onChange={handleChange} placeholder={name.slice(-1).toUpperCase()} required className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-3 text-center outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10" />
                  ))}
                </div>
              </div>

              <button type="submit" disabled={loading} className="mt-6 w-full rounded-xl bg-[#286149] px-6 py-4 font-bold text-white shadow-lg shadow-[#286149]/15 transition hover:-translate-y-0.5 hover:bg-[#1f503b] disabled:cursor-wait disabled:opacity-60">
                {loading ? "Agent is reasoning..." : "Ask the quality agent"}
              </button>
            </div>

            <div className="rounded-[1.5rem] border border-[#d4dfc7] bg-gradient-to-br from-[#e5eed9] via-[#f8faef] to-[#f4e2d2] p-6 text-[#20352c] sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a05d3b]">Agent reasoning path</p>
              <h2 className="mt-4 text-2xl font-bold text-[#173f32]">Good evidence creates a useful answer.</h2>
              <div className="mt-8 space-y-3 text-sm leading-6 text-[#617067]">
                <p className="rounded-xl bg-white/60 p-4"><span className="mr-2 font-bold text-[#39705a]">01 Sense</span> Read all channels from the same sample.</p>
                <p className="rounded-xl bg-white/60 p-4"><span className="mr-2 font-bold text-[#39705a]">02 Reason</span> Compare calibrated values with references.</p>
                <p className="rounded-xl bg-white/60 p-4"><span className="mr-2 font-bold text-[#39705a]">03 Explain</span> Review match, impurity, and rasa together.</p>
              </div>
            </div>
          </form>

          {result && (
            <section className="mt-10 rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-900/5 sm:p-8">
              {result.error ? (
                <p className="rounded-xl bg-red-50 p-4 font-medium text-red-700">{result.error}</p>
              ) : (
                <>
                  <div className="flex flex-col justify-between gap-5 border-b border-slate-100 pb-6 sm:flex-row sm:items-end">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#5b785f]">Agent assessment ready</p>
                      <h2 className="mt-2 text-3xl font-bold text-slate-900">{result.predicted_product}</h2>
                    </div>
                    <div className="flex gap-3">
                      <div className="rounded-2xl bg-emerald-50 px-5 py-3"><span className="block text-xs text-slate-500">Overall match</span><strong className="text-2xl text-emerald-700">{result.overall_match}%</strong></div>
                      <div className="rounded-2xl bg-amber-50 px-5 py-3"><span className="block text-xs text-slate-500">Impurity</span><strong className="text-2xl text-amber-700">{result.overall_impurity}%</strong></div>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-8 lg:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Reference profile</h3>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {Object.entries(result.standard_profile).map(([key, value]) => <div key={key} className="flex justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm"><span className="capitalize text-slate-500">{formatLabel(key)}</span><strong>{value}</strong></div>)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Evidence by sensor</h3>
                      <div className="mt-4 space-y-4">
                        {Object.entries(result.sensor_matches).map(([key, value]) => <div key={key}><div className="mb-1 flex justify-between text-sm"><span className="capitalize text-slate-500">{formatLabel(key)}</span><strong>{value}%</strong></div><div className="h-2 rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500" style={{ width: value + "%" }} /></div></div>)}
                      </div>
                    </div>
                  </div>

                  {Object.keys(result.taste_profile).length > 0 && <div className="mt-8 border-t border-slate-100 pt-8"><h3 className="text-lg font-bold">Ayurvedic rasa profile</h3><div className="mt-4 flex flex-wrap gap-3">{Object.entries(result.taste_profile).map(([key, value]) => <span key={key} className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">{formatLabel(key)}: {value}%</span>)}</div></div>}
                  {Object.keys(result.charts).length > 0 && <div className="mt-8 grid gap-4 border-t border-slate-100 pt-8 md:grid-cols-3">{Object.entries(result.charts).map(([name, image]) => <img key={name} src={"data:image/png;base64," + image} alt={formatLabel(name)} className="rounded-2xl border border-slate-100 shadow-sm" />)}</div>}
                  {result.note && <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950"><h3 className="font-bold text-amber-800">Agent note</h3><div className="mt-3 space-y-2 text-sm leading-6">{result.note.split("\n").filter(Boolean).map((line, index) => <p key={index}>{line}</p>)}</div></div>}
                </>
              )}
            </section>
          )}
        </div>
      </section>
    </main>
  );
};

export default NewPage;


