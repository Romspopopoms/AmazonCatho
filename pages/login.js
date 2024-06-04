import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoggedIn } = useAuth();
    const router = useRouter();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      login(username, password); // Appel de la fonction login avec username et password
      router.push('/'); // Rediriger vers la page d'accueil après le login
    };
  
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
        {isLoggedIn && <p>Login successful!</p>}
      </div>
    );
  }