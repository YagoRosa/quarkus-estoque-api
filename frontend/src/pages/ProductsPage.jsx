import React from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

const ProductsPage = ({ refreshToggle, onRefresh }) => {
    return (
        <div className="page-container">
            <h2>Products & Production</h2>
            <section className="form-section">
                <ProductForm onProductCreated={onRefresh} />
            </section>
            <section className="list-section">
                <ProductList key={`p-${refreshToggle}`} onProduce={onRefresh} />
            </section>
        </div>
    );
};

export default ProductsPage;
