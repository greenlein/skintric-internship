type RotatingSquaresProps = {
  size: number;
};

export default function RotatingSquares({ size }: RotatingSquaresProps) {
  return (
    <section
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
    >
      <div className="absolute inset-[25px] animate-[spin_12s_linear_infinite_reverse] rotate-45 border border-dotted border-[#e2e5e6]" />
      <div className="absolute inset-[50px] animate-[spin_18s_linear_infinite_reverse] rotate-45 border border-dotted border-[#d8dddf]" />
      <div className="absolute inset-[78px] animate-[spin_24s_linear_infinite_reverse] rotate-45 border border-dotted border-[#bfc5c7]" />
    </section>
  );
}
