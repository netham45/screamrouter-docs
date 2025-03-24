import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Documentation from './pages/Documentation';
import Downloads from './pages/Downloads';
import ESP32Flasher from './pages/ESP32Flasher';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="docs/*" element={<Documentation />} />
        <Route path="downloads" element={<Downloads />} />
        <Route path="esp32-flasher" element={<ESP32Flasher />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;