import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import UserProfile from '../components/UserProfile';
import ChatGPT from '../components/ChatGPT';
import { useUserProfile } from '../context/UserProfileContext';

export default function Home() {
  const { profile, saveProfile } = useUserProfile();

  return (
    <div className="h-full w-full bg-gradient-to-t bg-red-300 from-slate-800 to-gray-400">
      <Navbar />
      <h1 className="mt-24 text-center font-bold text-4xl text-white">Bienvenue Sur SAASROMS</h1>
      <div className="flex flex-col items-center mt-8">
        {!profile && <UserProfile saveProfile={saveProfile} />}
        {profile && <ChatGPT />}
      </div>
    </div>
  );
}
