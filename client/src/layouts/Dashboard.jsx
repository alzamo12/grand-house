import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../components/Dashboard/Sidebar';

const Dashboard = () => {
    return (
        <div className='grid lg:grid-cols-12 lg:justify-between px-3'>
            {/* sidebar */}
            <div className='col-span-2 justify-self-end '>
                <Sidebar className="" />
            </div>

            {/* dynamic outlet */}
            <div className='lg:col-span-10 bg-black'>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;