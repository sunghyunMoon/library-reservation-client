import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReservePage from '../components/ReservePage';
import LibrarySeatMap from '../components/LibrarySeatMap';

const AppRoutes: React.FC = () => (
    <Routes>
        {/* "/" : temp path */}
        <Route path="/" element={<LibrarySeatMap />} />
        <Route path="/libraryseatmap" element={<LibrarySeatMap />} />
        <Route path="/reserve/:id" element={<ReservePage />} />
    </Routes>
);

export default AppRoutes;
