import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { GoPersonFill } from "react-icons/go";
import { IoLogoAndroid } from "react-icons/io";
import { AiOutlineLogin } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { useState } from 'react';
import { FiMenu, FiX } from "react-icons/fi";

const Menu = [
    {
        name: 'Home',
        link: '/'
    },
    {
        name: 'About',
        link: '/about'
    },
    {
        name: 'Contact',
        link: '/contact'
    },
    {
        name: 'AddArticle',
        link: '/addarticle'
    },
    {
        name: 'AddSubSection',
        link: '/addsubsection'
    }
];

const MenuOpen = [
    {
        name: 'MonProfil',
        link: '/monprofil'
    },
    {
        name: 'MaBoutique',
        link: '/maboutique'
    },
];

export const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="w-full h-16 bg-gray-300 flex justify-between items-center px-8 relative">
            <div className="flex items-center gap-x-2 flex-shrink-0">
                <IoLogoAndroid className="size-8" />
                <h2>Android</h2>
            </div>
            <div className="hidden md:flex flex-1 justify-center">
                <ul className="flex gap-x-8">
                    {Menu.map((item, index) => (
                        <li key={index} className="text-black">
                            <Link href={item.link}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="hidden md:flex items-center gap-x-2">
                <GoPersonFill className="size-8 border-2 border-white rounded-md bg-white hover:bg-black hover:border-black hover:text-white" 
                onClick={() => setOpen(!open)} />
                {open && (
                    <div className='absolute right-8 top-20 min-w-[10%] min-h-[30%] bg-slate-500'>
                        <ul className="flex flex-col gap-y-4 py-4 h-full">
                            {MenuOpen.map((item, index) => (
                                <li key={index} className="text-center">
                                    <Link href={item.link}>
                                        {item.name}
                                    </Link>
                                </li>  
                            ))}
                            {isLoggedIn ? (
                                <div onClick={logout} className='flex self-center'>
                                    <BiLogOutCircle className='size-8' />
                                </div>
                            ) : (
                                <Link href="/login" className='flex justify-center'>
                                    <AiOutlineLogin className='size-8'/>
                                </Link>
                            )}
                        </ul>
                    </div>
                )}
            </div>
            <div className="md:hidden flex items-center">
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FiX className="size-8" /> : <FiMenu className="size-8" />}
                </button>
            </div>
            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-gray-300 flex flex-col items-center">
                    <ul className="flex flex-col gap-y-4 py-4">
                        {Menu.map((item, index) => (
                            <li key={index} className="text-black">
                                <Link href={item.link}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <GoPersonFill className="size-8 border-2 border-white rounded-md bg-white hover:bg-black hover:border-black hover:text-white mb-4" 
                    onClick={() => setOpen(!open)} />
                    {open && (
                        <div className='w-full bg-slate-500'>
                            <ul className="flex flex-col gap-y-4 py-4 h-full">
                                {MenuOpen.map((item, index) => (
                                    <li key={index} className="text-center">
                                        <Link href={item.link}>
                                            {item.name}
                                        </Link>
                                    </li>  
                                ))}
                                {isLoggedIn ? (
                                    <div onClick={logout} className='flex self-center'>
                                        <BiLogOutCircle className='size-8' />
                                    </div>
                                ) : (
                                    <Link href="/login" className='flex justify-center'>
                                        <AiOutlineLogin className='size-8'/>
                                    </Link>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
