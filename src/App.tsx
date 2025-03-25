import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorDotPosition, setCursorDotPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const moveCursorDot = (e: MouseEvent) => {
      setCursorDotPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousemove', moveCursorDot);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', moveCursorDot);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
        <Toaster position="top-center" />
        <div
          className="custom-cursor"
          style={{
            transform: `translate(${cursorPosition.x - 10}px, ${cursorPosition.y - 10}px)`,
          }}
        />
        <div
          className="custom-cursor-dot"
          style={{
            transform: `translate(${cursorDotPosition.x - 2}px, ${cursorDotPosition.y - 2}px)`,
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App