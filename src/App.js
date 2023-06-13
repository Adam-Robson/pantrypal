import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Tutorial from './components/Tutorial';
import Details from './components/Details';
import Resources from './components/Resources';

export default function App() {
  return (
    <>
      <div className="h-screen w-screen">
        <Routes>
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/tutorial' element={ <Tutorial /> } />
          <Route path='/' exact element={<Home />} />
          <Route path='/:id' element={ <Details /> } />
          <Route path="/resources" element={ <Resources /> } />
        </Routes>
      </div>
    </>
  );
}
