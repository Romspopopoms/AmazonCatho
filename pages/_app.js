// pages/_app.js
import { Navbar } from '../components/Navbar';
import { AuthProvider } from '../context/AuthContext';
import { UserProfileProvider } from '../context/UserProfileContext';
import { GlobalStateProvider } from '../context/GlobalStateContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }) { 
  return (
    <AuthProvider>
      <UserProfileProvider>
        <GlobalStateProvider>
          <Navbar />
          <Component {...pageProps} />
        </GlobalStateProvider>
      </UserProfileProvider>
    </AuthProvider>
  );
}

export default MyApp;
