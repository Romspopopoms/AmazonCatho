import Link from "next/link";
import { Navbar } from "../components/Navbar";

export default function Home() {

  return (
    <div className="h-full w-full">
      <Navbar />
      <h1 className=" mt-24 text-center font-bold text-4xl text-blue-300">✞ Bienvenue Sur AmazonCatho ✞</h1>
    </div>
  );
}
