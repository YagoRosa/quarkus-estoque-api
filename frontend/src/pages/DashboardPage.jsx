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

    // Calculations for Financial Overview
    const totalInventoryValue = products.reduce((acc, p) => acc + (p.productPrice * (p.stockQuantity || 0)), 0);
    const potentialRevenue = products.reduce((acc, p) => acc + (p.productPrice * p.maxProductionQuantity), 0);

    // Critical Items for Inventory Alerts
    const criticalItems = [
        ...outOfStockMaterials.map(m => ({ name: m.materialName, type: 'Material', status: 'Out of Stock', color: '#ef4444' })),
        ...outOfStockProducts.map(p => ({ name: p.productName, type: 'Product', status: 'Out of Stock', color: '#dc2626' })),
        ...lowStockMaterials.map(m => ({ name: m.materialName, type: 'Material', status: 'Low Stock', color: '#d97706' })),
        ...lowStockProducts.map(p => ({ name: p.productName, type: 'Product', status: 'Low Stock', color: '#d97706' }))
    ].slice(0, 5); // Show top 5 critical items

    // Top Production Opportunities
    const productionOpportunities = [...products]
        .sort((a, b) => b.maxProductionQuantity - a.maxProductionQuantity)
        .filter(p => p.maxProductionQuantity > 0)
        .slice(0, 5);

    return (
        <div className="page-container dashboard-page">
            <div className="dashboard-header">
                <h2>Control Center</h2>
                <p>Real-time production and inventory intelligence.</p>
            </div>

            {/* Top Stats Cards */}
            <div className="dashboard-summary-grid">
                <div className="summary-card out-of-stock-mat">
                    <div className="summary-card-content">
                        <h3>Out of Stock Mat.</h3>
                        <span className="badge-critical">{outOfStockMaterials.length}</span>
                    </div>
                </div>

                <div className="summary-card out-of-stock-prod">
                    <div className="summary-card-content">
                        <h3>Out of Stock Prod.</h3>
                        <span className="badge-critical">{outOfStockProducts.length}</span>
                    </div>
                </div>

                <div className="summary-card income">
                    <div className="summary-card-content">
                        <h3>Avg Income</h3>
                        <span className="summary-value">${totalInventoryValue.toLocaleString()}</span>
                    </div>
                </div>

                <div className="summary-card potential">
                    <div className="summary-card-content">
                        <h3>Potential Value</h3>
                        <span className="summary-value">${potentialRevenue.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="dashboard-main-content">
                {/* Inventory Alerts Table */}
                <div className="form-section dashboard-section">
                    <h3>⚠️ Critical Inventory Alerts</h3>
                    {criticalItems.length === 0 ? (
                        <p className="empty-hint-text">All stock levels are healthy.</p>
                    ) : (
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {criticalItems.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="item-name">{item.name}</td>
                                        <td className="item-type">{item.type}</td>
                                        <td>
                                            <span className="item-status" style={{ color: item.color }}>
                                                {item.status.toUpperCase()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Production Opportunities */}
                <div className="form-section dashboard-section">
                    <h3>⚡ Production Opportunities</h3>
                    <div className="opportunities-list">
                        {productionOpportunities.length === 0 ? (
                            <p className="empty-hint-text">No production possible. Check materials.</p>
                        ) : (
                            productionOpportunities.map(p => (
                                <div key={p.id} className="opportunity-card">
                                    <div className="opportunity-info">
                                        <div className="opportunity-name">{p.productName}</div>
                                        <div className="opportunity-subtitle">Max production: {p.maxProductionQuantity} units</div>
                                    </div>
                                    <div className="opportunity-value">
                                        + ${(p.productPrice * p.maxProductionQuantity).toLocaleString()}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
