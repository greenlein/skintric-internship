import "./globals.css";
import localFont from "next/font/local";
import Navbar from "./components/Navbar";

const myFont = localFont({
  src: "../public/fonts/RoobertTRIAL-Regular-BF67243fd53fdf2.otf",
  display: "swap",
  variable: "--font-roobert-trial",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${myFont.variable}`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
