import { ArrowLink } from "./components/ArrowLink";

const Home = () => (
  <main className="relative min-h-screen overflow-hidden bg-[#fdfdfd] font-sans text-[#1A1B1C]">
    <section className="relative flex min-h-screen items-center justify-center">
      <div className="pointer-events-none absolute right-420 top-1/2 h-[72vw] w-[72vw] -translate-y-1/2 rotate-45 border border-dashed border-[#c1c5c6]" />
      <div className="pointer-events-none absolute left-420 top-1/2 h-[72vw] w-[72vw] -translate-y-1/2 rotate-45 border border-dashed border-[#c1c5c6]" />

      <div className="absolute left-6 top-1/2 z-10 -translate-y-1/2">
        <ArrowLink direction="left" label="DISCOVER A.I." />
      </div>
      <div className="absolute right-6 top-1/2 z-10 -translate-y-1/2">
        <ArrowLink direction="right" label="TAKE TEST" />
      </div>

      <h1 className="relative z-10 text-center text-[clamp(4rem,8.2vw,8.4rem)] font-light leading-[0.88] tracking-[-0.075em]">
        Sophisticated
        <br />
        skincare
      </h1>

      <p className="absolute bottom-8 left-6 max-w-[270px] text-[11px] uppercase leading-[1.9] text-[#303030]">
        Skinstric developed an A.I. that creates a highly-personalised routine tailored to what your skin needs.
      </p>
    </section>
  </main>
);

export default Home;
