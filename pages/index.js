import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "../components/Sidebar"
import Main from "../components/Main"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="flex flex-row">
     <Sidebar />
     <Main />
    </div>
  );
}
