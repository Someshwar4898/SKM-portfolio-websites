import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import SellPage from './pages/SellPage';
import NotFoundPage from './pages/NotFoundPage';

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/properties/:id" element={<PropertyDetailPage />} />
        <Route path="/sell" element={<SellPage />} />

        {/* Legacy / convenience redirects */}
        <Route path="/listings" element={<Navigate to="/properties" replace />} />
        <Route path="/buy" element={<Navigate to="/properties?status=buy" replace />} />
        <Route path="/rent" element={<Navigate to="/properties?status=rent" replace />} />
        <Route path="/contact" element={<Navigate to="/sell" replace />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
