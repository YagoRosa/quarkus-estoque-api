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
            alert('Material created successfully!');
            setName('');
            setQuantity('');
            if (onMaterialCreated) onMaterialCreated();
        } catch (err) {
            alert('Error creating material.');
        }
    };

    return (
        <div className="form-container">
            <h3>Register New Material</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Material Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Initial Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default MaterialForm;
