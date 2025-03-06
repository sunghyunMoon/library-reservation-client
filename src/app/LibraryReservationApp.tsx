import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from '../routing/AppRoutes.tsx';
import { useDispatch } from 'react-redux';
import { fetchMySeat } from '../redux/slices/mySeatSlice.ts';
import { AppDispatch } from '../redux/store.ts';

const LibraryReservationApp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    dispatch(fetchMySeat('user'));

    return (
        <Router>
            <AppRoutes />
        </Router>
    );
};

export default LibraryReservationApp;
