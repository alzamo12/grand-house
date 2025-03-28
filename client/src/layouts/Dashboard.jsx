import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../components/Dashboard/Sidebar';

const Dashboard = () => {
    return (
        <div className='md:flex relative min-h-screen'>
            {/* sidebar */}
            <Sidebar />

            {/* dynamic outlet */}
            <div className='flex-1 md:ml-64'>
                <div className='p-5'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;