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
            alert('Produto cadastrado com sucesso!');
        } catch (err) {
            alert('Erro ao cadastrar produto: ' + (err.response?.data?.details || err.message));
        }
    };

    return (
        <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd' }}>
            <h3>Cadastrar Novo Produto</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome do Produto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Preço"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    style={{ marginLeft: '10px' }}
                />
                <button type="submit" style={{ marginLeft: '10px' }}>Salvar Produto</button>
            </form>
        </div>
    );
};

export default ProductForm;
