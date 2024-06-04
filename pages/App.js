//import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from "@vercel/analytics/react"

import Navbar from '../components/Navbar"';
//import { AuthProvider } from './AuthContext';
//import Home from './pages/Home';
//import Activites from './pages/Activites';
//import Tarifs from './pages/Tarifs';  
//import APropos from './pages/APropos';
//import Footer from './components/Footer';
//import ArticlePage from './pages/ArticlesPage';
//import AdminPage from './pages/AdminPage';
//import AnalysePage from './pages/AnalysePage';
//import AjoutDarticlesPages from './pages/AjoutD\'articlesPage';
//import { ArticleProvider } from './ArticleContext';

const App = () => {
  return (
    <AuthProvider>
      <ArticleProvider>
        <Router>
          <div className="flex flex-col xl:gap-y-12 w-full">
            <Navbar />
            <SpeedInsights />
            <Analytics />
          </div>
        </Router>
        </ArticleProvider>
    </AuthProvider>
  );
}

export default App;
