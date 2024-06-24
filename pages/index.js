import Link from "next/link";
import { Navbar } from "../components/Navbar";

export default function Home() {

  return (
    <div className="h-full w-full bg-gradient-to-t bg-red-300 from-slate-800 to-gray-400">
      <Navbar />
      <h1 className=" mt-24 text-center font-bold text-4xl text-white">Bienvenue Sur SAASROMS </h1>
    </div>
  );
}
