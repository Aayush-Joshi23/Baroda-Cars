
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import CarDetail from './pages/CarDetail';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Inventory />} />
            <Route path="/category/:category" element={<Inventory />} />
            <Route path="/car/:id" element={<CarDetail />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/919876543210?text=Hi, I'm interested in your car collection. Can you help me?"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 flex items-center justify-center"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.267.405 2.436 1.096 3.389l-.717 2.634 2.7-.711c.907.51 1.954.805 3.067.805 3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.586-5.767-5.767-5.767zm3.125 7.846c-.147.412-.751.751-1.042.802-.291.051-.65.093-1.042-.147-.392-.24-1.63-.802-2.316-1.428-.586-.532-1.076-1.116-1.31-1.52-.234-.404-.025-.624.175-.824.2-.2.412-.412.553-.618.141-.206.188-.344.275-.55.088-.206.044-.385-.022-.55-.066-.165-.553-1.334-.757-1.821-.2-.487-.404-.412-.553-.412h-.412c-.147 0-.385.051-.586.275-.206.224-.751.751-.751 1.821 0 1.07.751 2.1 1.07 2.231.206.131 1.63 2.49 3.945 3.493.55.24 1.01.385 1.343.487.553.175 1.07.147 1.474.088.45-.066 1.042-.412 1.25-.802.206-.412.206-.751.147-.802-.06-.051-.22-.093-.45-.206z"/>
          </svg>
        </a>
      </div>
    </HashRouter>
  );
};

export default App;
