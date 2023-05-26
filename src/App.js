import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

export default function App() {
  return (
    <>
      <div className="main-div">
        <Routes>
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/' exact element={<Home />} />
        </Routes>
      </div>
    </>
  );
}
