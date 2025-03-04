import React from 'react';
import Navbar from '../components/shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/shared/Footer/Footer';

const Main = () => {
    return (
        <div>
            <Navbar />
            <div className='pt-16 min-h-[calc(100vh-68px)]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;