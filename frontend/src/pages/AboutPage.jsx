import React from 'react';

const AboutPage = () => {
    return (
        <div className="page-container about-page">
            <div className="about-header">
                <div className="title-row">
                    <h2>About CQP System</h2>
                    <span className="developed-by-badge">by Yago Rosa</span>
                </div>
                <p className="system-subtitle">Control of Quantity and Production • v1.0.0</p>
            </div>

            <div className="bento-grid">
                {/* Hero Section - Purpose */}
                <div className="bento-item bento-hero">
                    <div className="bento-icon">🎯</div>
                    <h3>Project Purpose</h3>
                    <p>
                        The CQP System was developed as a comprehensive practical assessment to demonstrate expertise
                        in full-stack development and modern architectures. It provides a robust solution for
                        Small and Medium Enterprises (SMEs) to manage material stocks and production lines
                        with precision, speed, and real-time intelligence. This project reflects a commitment
                        to technical excellence—from backend logic to premium UI/UX experiences.
                    </p>
                </div>

                {/* Tech Stack - Specs */}
                <div className="bento-item bento-specs">
                    <div className="bento-icon">⚙️</div>
                    <h3>System Stack</h3>
                    <div className="tech-tags">
                        <span className="tech-tag">Java 21</span>
                        <span className="tech-tag">Quarkus</span>
                        <span className="tech-tag">React 19</span>
                        <span className="tech-tag">MySQL 8</span>
                        <span className="tech-tag">Vite</span>
                        <span className="tech-tag">Bruno API</span>
                    </div>
                </div>

                {/* Stages List */}
                <div className="bento-item bento-roadmap">
                    <div className="bento-icon">🚀</div>
                    <h3>Development Roadmap</h3>
                    <div className="roadmap-list">
                        <div className="roadmap-item active">
                            <span className="roadmap-step">01</span>
                            <div className="roadmap-content">
                                <strong>Foundations</strong>
                                <p>Core CRUDs for Materials & Products</p>
                            </div>
                        </div>
                        <div className="roadmap-item active">
                            <span className="roadmap-step">02</span>
                            <div className="roadmap-content">
                                <strong>Intelligence</strong>
                                <p>Backend Logic for Production Capacity (RF008)</p>
                            </div>
                        </div>
                        <div className="roadmap-item active">
                            <span className="roadmap-step">03</span>
                            <div className="roadmap-content">
                                <strong>Recipe Engine</strong>
                                <p>Granular Material-Product Linking (RF007)</p>
                            </div>
                        </div>
                        <div className="roadmap-item active">
                            <span className="roadmap-step">04</span>
                            <div className="roadmap-content">
                                <strong>Modern UI</strong>
                                <p>Premium Sidebar & Glassmorphism Refactor</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Extra Stats/Info card */}
                <div className="bento-item bento-small">
                    <div className="bento-icon">📱</div>
                    <h3>Responsiveness</h3>
                    <p>100% Mobile-First compliance ensured across all modules.</p>
                </div>

                <div className="bento-item bento-small">
                    <div className="bento-icon">🌍</div>
                    <h3>Localization</h3>
                    <p>Full English codebase and UI for international standards.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
