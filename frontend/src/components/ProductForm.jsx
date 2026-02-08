import React, { useState } from 'react';
import api from '../api/api';

const ProductForm = ({ onProductCreated }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/products', {
                productName: name,
                productPrice: parseFloat(price),
                stockQuantity: 0
            });
            setName('');
            setPrice('');
            if (onProductCreated) onProductCreated();
            alert('Product registered successfully!');
        } catch (err) {
            alert('Error registering product: ' + (err.response?.data?.details || err.message));
        }
    };

    return (
        <div className="form-container">
            <h3>Register New Product</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <button type="submit">Save Product</button>
            </form>
        </div>
    );
};

export default ProductForm;
