import React, { useState } from 'react';
import api from '../api/api';

const MaterialForm = ({ onMaterialCreated }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/materials', {
                materialName: name,
                stockQuantity: parseInt(quantity)
            });
            alert('Material criado!');
            setName('');
            setQuantity('');
            if (onMaterialCreated) onMaterialCreated();
        } catch (err) {
            alert('Erro ao criar material.');
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
            <h3>Cadastrar Novo Material</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome do Material"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Quantidade Inicial"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default MaterialForm;
