import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../components/Dashboard/Sidebar';
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
    return (
        <div className='md:flex relative min-h-screen'>
            <Toaster />
            {/* sidebar */}
            <Sidebar />

            {/* dynamic outlet */}
            <div className='flex-1 md:ml-64'>
                <div className=' p-5 '>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;