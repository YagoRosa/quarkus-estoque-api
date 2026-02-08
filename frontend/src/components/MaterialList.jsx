import React, { useEffect, useState } from 'react';
import api from '../api/api';

const MaterialList = () => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMaterials = async () => {
        try {
            const response = await api.get('/materials');
            setMaterials(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error loading materials.');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this material?')) return;
        try {
            await api.delete(`/materials/${id}`);
            fetchMaterials();
        } catch (err) {
            alert('Deletion error: ' + (err.response?.data?.details || err.message));
        }
    };

    const handleEdit = async (m) => {
        const newName = prompt('New material name:', m.materialName);
        if (newName === null) return;
        const newQty = prompt('New stock quantity:', m.stockQuantity);
        if (newQty === null || isNaN(newQty)) return;

        try {
            await api.put(`/materials/${m.id}`, {
                materialName: newName,
                stockQuantity: parseInt(newQty)
            });
            fetchMaterials();
        } catch (err) {
            alert('Editing error: ' + (err.response?.data?.details || err.message));
        }
    };

    useEffect(() => {
        fetchMaterials();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div className="list-container">
            <h3>Inventory Stock</h3>
            {materials.length === 0 ? (
                <p>No materials found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materials.map((m) => (
                            <tr key={m.id}>
                                <td>{m.id.substring(0, 8)}...</td>
                                <td>{m.materialName}</td>
                                <td>{m.stockQuantity}</td>
                                <td>
                                    <button onClick={() => handleEdit(m)}>Edit</button>
                                    <button onClick={() => handleDelete(m.id)} className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MaterialList;
