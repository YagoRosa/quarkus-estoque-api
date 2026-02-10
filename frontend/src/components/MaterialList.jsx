import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { toastUtils as toast } from '../utils/toast';
import ConfirmModal from './layout/ConfirmModal';

const MaterialList = () => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null });

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

    const handleDeleteClick = (id) => {
        setConfirmModal({ isOpen: true, id });
    };

    const confirmDelete = async () => {
        try {
            await api.delete(`/materials/${confirmModal.id}`);
            fetchMaterials();
            toast.success('Material deleted successfully.');
        } catch (err) {
            toast.error('Deletion error: ' + (err.response?.data?.details || err.message));
        } finally {
            setConfirmModal({ isOpen: false, id: null });
        }
    };

    const [editingMaterialId, setEditingMaterialId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editQty, setEditQty] = useState('');

    const handleEdit = (m) => {
        setEditingMaterialId(m.id);
        setEditName(m.materialName);
        setEditQty(m.stockQuantity.toString());
    };

    const handleCancelEdit = () => {
        setEditingMaterialId(null);
    };

    const submitEdit = async () => {
        if (!editName || isNaN(editQty)) {
            toast.warning('Please provide a valid name and quantity.');
            return;
        }

        try {
            await api.put(`/materials/${editingMaterialId}`, {
                materialName: editName,
                stockQuantity: parseInt(editQty)
            });
            setEditingMaterialId(null);
            fetchMaterials();
            toast.success('Material updated.');
        } catch (err) {
            toast.error('Editing error: ' + (err.response?.data?.details || err.message));
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
                            <th>Name</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materials.map((m) => (
                            <tr key={m.id}>
                                <td>{m.materialName}</td>
                                <td>{m.stockQuantity}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button onClick={() => handleEdit(m)}>Edit</button>
                                        <button onClick={() => handleDeleteClick(m.id)} className="btn-delete">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <ConfirmModal
                isOpen={confirmModal.isOpen}
                title="Delete Material"
                message="Are you sure you want to delete this material? This action cannot be undone."
                onConfirm={confirmDelete}
                onCancel={() => setConfirmModal({ isOpen: false, id: null })}
                confirmText="Delete"
                type="danger"
            />


            {editingMaterialId && (
                <div className="inline-add-form" style={{ marginTop: '20px' }}>
                    <h4>Edit Material</h4>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Stock"
                            value={editQty}
                            onChange={(e) => setEditQty(e.target.value)}
                            style={{ width: '100px' }}
                        />
                        <button onClick={submitEdit} className="btn-save">Save</button>
                        <button onClick={handleCancelEdit} className="btn-cancel">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MaterialList;
