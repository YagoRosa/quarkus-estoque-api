import React from 'react';

const DashboardPage = () => {
    return (
        <div className="page-container">
            <h2>Control Panel</h2>
            <div className="dashboard-grid">
                <div className="stat-card">
                    <h3>Summary</h3>
                    <p>Welcome to the Production Control System. Use the sidebar to manage your inventory and production lines.</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
