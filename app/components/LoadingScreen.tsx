import RotatingSquares from "@/app/components/RotatingSquares";

type LoadingScreenProps = {
  text: string;
};

const LoadingScreen = ({ text }: LoadingScreenProps) => {
  const camera = text === "SETTING UP CAMERA ...";

  return (
    <div className={`${camera ? "fixed" : "absolute"} inset-0`}>
      <RotatingSquares size={500} />
      {camera ? (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4">
          <img className="size-25" src="/assets/aperture.png" />
          <p className="font-semibold text-4">{text}</p>
        </div>
      ) : (
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-4">{text}</p>
      )}
    </div>
  );
};

export default LoadingScreen;
