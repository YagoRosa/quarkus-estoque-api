import React from 'react';

const AboutPage = () => {
    return (
        <div className="page-container">
            <h2>About CQP System (Control of Quantity and Production)</h2>

            <div className="dashboard-grid">
                <div className="stat-card">
                    <h3>Project Purpose</h3>
                    <p>
                        The CQP System (Control of Quantity and Production) was developed to provide a robust solution
                        for Small and Medium Enterprises (SMEs) to manage their material stocks and production lines efficiently.
                    </p>
                </div>

                <div className="stat-card">
                    <h3>Technologies</h3>
                    <ul>
                        <li><strong>Backend:</strong> Quarkus (Java) with Hibernate Panache for rapid development and high performance.</li>
                        <li><strong>Frontend:</strong> React (Vite) for a dynamic, responsive, and modern user experience.</li>
                        <li><strong>Database:</strong> MariaDB/MySQL for reliable data persistence.</li>
                    </ul>
                </div>

                <div className="stat-card">
                    <h3>Development Stages</h3>
                    <ol>
                        <li><strong>Foundations:</strong> Implementation of Material and Product CRUDs.</li>
                        <li><strong>Intelligence:</strong> Development of backend logic for Production Capacity (RF008).</li>
                        <li><strong>Recipe Management:</strong> Linking materials to products with granular control (RF007).</li>
                        <li><strong>Modern Layout:</strong> Multi-page routing and premium sidebar design (RF009).</li>
                        <li><strong>Responsiveness:</strong> Full compliance with mobile-first standards (RNF003).</li>
                        <li><strong>Internationalization:</strong> 100% English codebase and UI (RNF007).</li>
                    </ol>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .stat-card ul, .stat-card ol {
                    text-align: left;
                    margin-top: 1rem;
                    padding-left: 1.5rem;
                }
                .stat-card li {
                    margin-bottom: 0.5rem;
                    color: var(--text-muted);
                }
                .stat-card strong {
                    color: var(--accent);
                }
            ` }} />
        </div>
    );
};

export default AboutPage;
