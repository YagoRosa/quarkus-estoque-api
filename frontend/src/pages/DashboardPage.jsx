import React, { useEffect, useState } from 'react';
import api from '../api/api';

const DashboardPage = () => {
    const [materials, setMaterials] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get('/materials').then(res => setMaterials(res.data));
        api.get('/products').then(res => setProducts(res.data));
    }, []);

    const outOfStockMaterials = materials.filter(m => m.stockQuantity === 0);
    const lowStockMaterials = materials.filter(m => m.stockQuantity > 0 && m.stockQuantity < 5);
    const outOfStockProducts = products.filter(p => p.stockQuantity === 0);
    const lowStockProducts = products.filter(p => p.stockQuantity > 0 && p.stockQuantity < 5);

    return (
        <div className="page-container">
            <h2>System Summary</h2>
            <p style={{ color: '#64748b', marginBottom: '24px' }}>Welcome to the Production Control System.</p>

            <div className="dashboard-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px'
            }}>
                <div className="stat-card" style={{ borderLeft: '5px solid #ef4444' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ color: '#ef4444', margin: 0, fontSize: '0.95rem' }}>Out of Stock Materials</h3>
                        <span style={{
                            backgroundColor: '#ef4444',
                            color: '#fff',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                        }}>
                            {outOfStockMaterials.length}
                        </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
                        Materials completely depleted.
                    </p>
                </div>

                <div className="stat-card" style={{ borderLeft: '5px solid #dc2626' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ color: '#dc2626', margin: 0, fontSize: '0.95rem' }}>Out of Stock Products</h3>
                        <span style={{
                            backgroundColor: '#dc2626',
                            color: '#fff',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                        }}>
                            {outOfStockProducts.length}
                        </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
                        Products with zero inventory.
                    </p>
                </div>

                <div className="stat-card" style={{ borderLeft: '5px solid #d97706' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ color: '#d97706', margin: 0, fontSize: '0.95rem' }}>Low Stock Materials</h3>
                        <span style={{
                            backgroundColor: '#d97706',
                            color: '#fff',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                        }}>
                            {lowStockMaterials.length}
                        </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
                        Items with less than 5 units.
                    </p>
                </div>

                <div className="stat-card" style={{ borderLeft: '5px solid #d97706' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ color: '#d97706', margin: 0, fontSize: '0.95rem' }}>Low Stock Products</h3>
                        <span style={{
                            backgroundColor: '#d97706',
                            color: '#fff',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                        }}>
                            {lowStockProducts.length}
                        </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
                        Items with less than 5 units.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
