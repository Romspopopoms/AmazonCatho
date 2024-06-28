import { Navbar } from '../components/Navbar';
import { AuthProvider } from '../context/AuthContext';
import { UserProfileProvider } from '../context/UserProfileContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }) { 
  return (
    <AuthProvider>
       <UserProfileProvider>
      <Navbar />
      <Component {...pageProps} />
      </UserProfileProvider>
    </AuthProvider>
  );
}

export default MyApp;
