import "./globals.css";
import localFont from "next/font/local";
import Navbar from "./components/Navbar";
import Webcam from "react-webcam";

const roobert = localFont({
  src: "../public/fonts/Roobert-TRIAL-Regular.woff2",
  display: "swap",
  variable: "--font-roobert",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${roobert.variable}`}>
      <body className="font-sans antialiased max-w-[1920px] mx-auto">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
