export const ArrowLink = ({ label, direction }: { label: string; direction: "left" | "right" }) => (
  <button
    type="button"
    aria-label={label}
    className={`group flex items-center gap-4 text-[10px] font-medium text-[#626262] ${
      direction === "right" ? "flex-row-reverse" : ""
    }`}
  >
    <span className="grid h-9 w-9 rotate-45 place-items-center border border-[#555] transition-colors group-hover:bg-[#f1f1f1]">
      <span className="-rotate-45 text-xl leading-none">{direction === "left" ? "‹" : "›"}</span>
    </span>
    <span>{label}</span>
  </button>
);
