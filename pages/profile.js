import { useUserProfile } from '../context/UserProfileContext';
import UserProfile from '../components/UserProfile';
import { Navbar } from '../components/Navbar';

export default function Profile() {
  const { profile, saveProfile } = useUserProfile();

  return (
    <div className="h-full w-full bg-gradient-to-t bg-red-300 from-slate-800 to-gray-400">
      <Navbar />
      <h1 className="mt-24 text-center font-bold text-4xl text-white">Profil Utilisateur</h1>
      <div className="flex justify-center mt-8">
        <UserProfile saveProfile={saveProfile} />
      </div>
    </div>
  );
}
