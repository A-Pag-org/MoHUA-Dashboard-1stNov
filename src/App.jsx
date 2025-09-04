import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import GC from './pages/GC.jsx';
import MoHUA from './pages/MoHUA.jsx';
import ULBs from './pages/ULBs.jsx';
import APAG from './pages/APAG.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}> 
        <Route index element={<Navigate to="/gc" replace />} />
        <Route path="/gc" element={<GC />} />
        <Route path="/mohua" element={<MoHUA />} />
        <Route path="/ulbs" element={<ULBs />} />
        <Route path="/apag" element={<APAG />} />
      </Route>
    </Routes>
  );
}
