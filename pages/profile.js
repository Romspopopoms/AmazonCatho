import { useUserProfile } from '../context/UserProfileContext';
import { useAuth } from '../context/AuthContext';
import UserProfile from '../components/UserProfile';
import DisplayProfile from '../components/DisplayProfile';
import { Navbar } from '../components/Navbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Profile() {
  const { profile, saveProfile, fetchProfile } = useUserProfile();
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/AdminPage'); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
    } else {
      const userId = 3; // Remplacez ceci par la logique pour obtenir l'ID de l'utilisateur connecté
      const loadProfile = async () => {
        await fetchProfile(userId); // Récupère le profil utilisateur
        setLoading(false);
      };
      loadProfile();
    }
  }, [isLoggedIn, router, fetchProfile]);

  if (!isLoggedIn || loading) {
    return null; // Ne rend rien si l'utilisateur n'est pas connecté ou si le profil est en cours de chargement
  }

  return (
    <div className="h-full w-full bg-gradient-to-t bg-red-300 from-slate-800 to-gray-400">
      <Navbar />
      <h1 className="mt-24 text-center font-bold text-4xl text-white">Profil Utilisateur</h1>
      <div className="flex justify-center mt-8">
        {profile ? (
          <DisplayProfile profile={profile} />
        ) : (
          <UserProfile saveProfile={saveProfile} />
        )}
      </div>
    </div>
  );
}
