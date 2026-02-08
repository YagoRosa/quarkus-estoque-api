import React, { useState } from 'react'
import MaterialList from './components/MaterialList'
import ProductList from './components/ProductList'
import MaterialForm from './components/MaterialForm'
import ProductForm from './components/ProductForm'

function App() {
  const [refreshToggle, setRefreshToggle] = useState(false);

  const handleRefresh = () => {
    setRefreshToggle(!refreshToggle);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Sistema de Controle de Produção - MVP</h1>
      <hr />

      <section style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <MaterialForm onMaterialCreated={handleRefresh} />
        </div>
        <div style={{ flex: 1 }}>
          <ProductForm onProductCreated={handleRefresh} />
        </div>
      </section>

      <section style={{ display: 'flex', gap: '40px' }}>
        <div style={{ flex: 1 }}>
          <MaterialList key={`m-${refreshToggle}`} />
        </div>
        <div style={{ flex: 1 }}>
          <ProductList key={`p-${refreshToggle}`} onProduce={handleRefresh} />
        </div>
      </section>
    </div>
  )
}

export default App
