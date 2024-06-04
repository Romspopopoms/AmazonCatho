import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';  // Assurez-vous que le chemin est correct
import { useNavigate } from 'react-router-dom';

const AdminLoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();  // Utilisation de useAuth pour accéder à login
    const navigate = useNavigate();  // Hook pour la navigation

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (data.success) {
                console.log('Connexion réussie');
                login();  // Met à jour l'état global de connexion
                navigate('/');  // Redirige vers la page d'accueil
            } else {
                console.error('Échec de la connexion', data.message);
            }
        } catch (error) {
            console.error('Erreur lors de la connexion', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}
        className='h-auto w-auto flex flex-col bg-[rgb(252,251,250)] items-center justify-center gap-6 border-2 border-slate-700 rounded-md py-6 px-12 shadow-2xl shadow-black mt-8'>
            <h1 className='font-baloo font-semibold text-4xl text-[#f2c14e] text-center mt-4 '>Connexion Admin</h1>
            <div className="text-center text-2xl font-medium font-baloo text-[#f2c14e] ">
                Nom d&apos;utilisateur
            </div>  
                <input className="border-2 rounded-lg border-black w-1/2" type="text" value={username} onChange={e => setUsername(e.target.value)} />
            <div className="text-center text-2xl font-medium font-baloo text-[#f2c14e] ">
                Mot de passe
            </div>   
                <input className="border-2 rounded-lg border-black w-1/2" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            
            <button 
            type="submit"
            className='mt-4 py-2 px-4 bg-[#f2c14e] text-white rounded hover:bg-white hover:text-[#f2c14e] transition-colors duration-300'>Connexion</button>
        </form>
    );
};

export default AdminLoginForm;
