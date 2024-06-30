import { useUserProfile } from '../context/UserProfileContext';
import { useAuth } from '../context/AuthContext';
import UserProfile from '../components/UserProfile';
import DisplayProfile from '../components/DisplayProfile';
import ProfileNavigation from '../components/ProfileNavigation';
import ImageModal from '../components/ImageModal';
import { Navbar } from '../components/Navbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Profile() {
  const { profile, saveProfile, fetchProfile } = useUserProfile();
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('profile');
  const [selectedImage, setSelectedImage] = useState(null);
  const [userImages, setUserImages] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/AdminPage'); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
    } else {
      const userId = 3; // Remplacez ceci par la logique pour obtenir l'ID de l'utilisateur connecté
      const loadProfile = async () => {
        const profileData = await fetchProfile(userId); // Récupère le profil utilisateur
        setUserImages(profileData.image_urls || []);
        setLoading(false);
      };
      loadProfile();
    }
  }, [isLoggedIn, router, fetchProfile]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleDeleteImage = async (imageUrl) => {
    try {
      const response = await fetch('/api/deleteImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (response.ok) {
        setUserImages(userImages.filter((image) => image !== imageUrl));
      } else {
        throw new Error('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  if (!isLoggedIn || loading) {
    return null; // Ne rend rien si l'utilisateur n'est pas connecté ou si le profil est en cours de chargement
  }

  return (
    <div className="h-full w-full bg-gradient-to-t bg-red-300 from-slate-800 to-gray-400">
      <Navbar />
      <h1 className="mt-24 text-center font-bold text-4xl text-white">Profil Utilisateur</h1>
      <div className="flex justify-center mt-8">
        <ProfileNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>
      <div className="flex justify-center mt-8">
        {activeSection === 'profile' && (profile ? <DisplayProfile profile={profile} /> : <UserProfile saveProfile={saveProfile} />)}
        {activeSection === 'images' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {userImages.map((image, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg cursor-pointer" onClick={() => handleImageClick(image)}>
                <img src={image} alt="Saved" className="w-full h-auto" />
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedImage && <ImageModal imageUrl={selectedImage} onClose={handleCloseModal} onDelete={handleDeleteImage} />}
    </div>
  );
}
