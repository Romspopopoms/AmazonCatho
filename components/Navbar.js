import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { GoPersonFill } from "react-icons/go";
import { IoLogoAndroid } from "react-icons/io";
import { AiOutlineLogin } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { useState } from 'react';
import { FiMenu, FiX } from "react-icons/fi";
import { Menu, MenuOpen } from "../data/MenuNavbar";

export const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full h-16 bg-gray-800 text-white flex justify-between items-center px-8 fixed inset-0 z-50">
      <div className="flex items-center gap-x-2">
        <IoLogoAndroid className="text-2xl" />
        <h2 className="text-lg font-bold">RomsSaaS</h2>
      </div>
      <div className="hidden md:flex flex-1 justify-center">
        <ul className="flex gap-x-8">
          {Menu.map((item, index) => (
            <li key={index} className="text-white hover:text-gray-400">
              <Link href={item.link}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden md:flex items-center gap-x-4">
        <Link href="/profile" className="text-white hover:text-gray-400">
          <GoPersonFill className="text-2xl cursor-pointer" />
        </Link>
        {isLoggedIn ? (
          <div onClick={logout} className='flex items-center justify-center gap-x-2 cursor-pointer'>
            <BiLogOutCircle className='text-2xl' />
            <p>Déconnexion</p>
          </div>
        ) : (
          <Link href="/AdminPage" className='flex items-center justify-center gap-x-2'>
            <AiOutlineLogin className='text-2xl' />
            <p>Connexion</p>
          </Link>
        )}
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </div>
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col items-center">
          <ul className="flex flex-col gap-y-4 py-4 w-full items-center">
            {Menu.map((item, index) => (
              <li key={index} className="text-white hover:text-gray-400">
                <Link href={item.link}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/profile" className="text-white hover:text-gray-400">
            <GoPersonFill className="text-2xl border-2 border-white rounded-md bg-white hover:bg-gray-400 hover:border-gray-400 hover:text-white mb-4 cursor-pointer" />
          </Link>
          {isLoggedIn ? (
            <div onClick={logout} className='flex items-center justify-center gap-x-2 cursor-pointer'>
              <BiLogOutCircle className='text-2xl' />
              <p>Déconnexion</p>
            </div>
          ) : (
            <Link href="/AdminPage" className='flex items-center justify-center gap-x-2'>
              <AiOutlineLogin className='text-2xl' />
              <p>Connexion</p>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};
