import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
});

export const metadata = {
  title: "বাজার দর",
  description: "দৈনিক বাজার দর ও নিত্যপ্রয়োজনীয় পণ্যের সঠিক দাম জানুন এক নজরে।",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${hindSiliguri.variable} h-full antialiased`}
    >
      <body className="bg-[#F0F5F0] min-h-full flex flex-col">
        <Header />
        <Marquee/>


        {/* Main Content Area */}
        <main className="flex-1">
          {children}
        </main>

        <Footer/>
      </body>
    </html>
  );
}
