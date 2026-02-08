import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import DashboardPage from './pages/DashboardPage';
import MaterialsPage from './pages/MaterialsPage';
import ProductsPage from './pages/ProductsPage';
import './index.css';

function App() {
  const [refreshToggle, setRefreshToggle] = useState(false);

  const handleRefresh = () => {
    setRefreshToggle(!refreshToggle);
  };

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route
            path="/materials"
            element={<MaterialsPage refreshToggle={refreshToggle} onRefresh={handleRefresh} />}
          />
          <Route
            path="/products"
            element={<ProductsPage refreshToggle={refreshToggle} onRefresh={handleRefresh} />}
          />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
