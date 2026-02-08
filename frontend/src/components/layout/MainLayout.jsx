import React from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
    return (
        <div className="main-layout">
            <Sidebar />
            <main className="content">
                <header className="top-header">
                    <h1>Control of Quantity and Production</h1>
                </header>
                <div className="page-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
