import { useUserProfile } from '../context/UserProfileContext';
import { useAuth } from '../context/AuthContext';
import UserProfile from '../components/UserProfile';
import { Navbar } from '../components/Navbar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Profile() {
  const { profile, saveProfile } = useUserProfile();
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/AdminPage'); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null; // Ne rend rien si l'utilisateur n'est pas connecté
  }

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
