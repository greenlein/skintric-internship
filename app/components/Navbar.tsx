export default function Navbar() {
  return (
    <nav className="flex h-16 items-center justify-between  bg-[#FCFCFC] px-4">
      <div className="flex items-center gap-4 max-[1920px]:">
        <span className="text-[13px] font-bold tracking-[0.18em] text-black uppercase">SKINSTRIC</span>

        <span className="inline-flex items-center justify-center border border-black/80 px-2 py-[2px] text-[9px] font-medium tracking-[0.18em] text-black uppercase">
          [ INTRO ]
        </span>
      </div>

      <button
        type="button"
        className="border border-black bg-black px-3 py-2 text-[9px] font-semibold tracking-[0.18em] text-white uppercase"
      >
        ENTER CODE
      </button>
    </nav>
  );
}
