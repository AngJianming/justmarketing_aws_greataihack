import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "JustMarketing",
  description: "An AI-driven Marketing Tool",
};

export default function MainLayout({ children }) {
  return (
    <div>
        <Header/>
        {children}
        <Footer/>
    </div>
     
  );
}
