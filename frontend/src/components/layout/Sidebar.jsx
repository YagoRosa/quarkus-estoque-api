import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>CQP System</h2>
            </div>
            <nav className="sidebar-nav">
                <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    Dashboard
                </NavLink>
                <NavLink to="/materials" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    Materials
                </NavLink>
                <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    Products
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;
