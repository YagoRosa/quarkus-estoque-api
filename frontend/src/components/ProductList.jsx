import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { toastUtils as toast } from '../utils/toast';
import ConfirmModal from './layout/ConfirmModal';

const ProductList = ({ onProduce }) => {
    const [products, setProducts] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null, type: null });

    const fetchData = async () => {
        try {
            const [prodRes, recRes, matRes] = await Promise.all([
                api.get('/products'),
                api.get('/recipes'),
                api.get('/materials')
            ]);
            setProducts(prodRes.data);
            setRecipes(recRes.data);
            setMaterials(matRes.data);
            setLoading(false);
        } catch (err) {
            setError('Error loading data.');
            setLoading(false);
        }
    };

    const handleDeleteProductClick = (id) => {
        setConfirmModal({ isOpen: true, id, type: 'product' });
    };

    const handleDeleteRecipeClick = (id) => {
        setConfirmModal({ isOpen: true, id, type: 'recipe' });
    };

    const handleConfirmAction = async () => {
        if (confirmModal.type === 'product') {
            try {
                await api.delete(`/products/${confirmModal.id}`);
                fetchData();
                toast.success('Product deleted.');
            } catch (err) {
                toast.error('Error deleting product.');
            }
        } else if (confirmModal.type === 'recipe') {
            try {
                await api.delete(`/recipes/${confirmModal.id}`);
                fetchData();
                if (onProduce) onProduce();
                toast.success('Recipe item removed.');
            } catch (err) {
                toast.error('Error removing recipe item.');
            }
        }
        setConfirmModal({ isOpen: false, id: null, type: null });
    };



    const [expandedRecipe, setExpandedRecipe] = useState(null);
    const [addingMaterialTo, setAddingMaterialTo] = useState(null);
    const [selectedMaterialId, setSelectedMaterialId] = useState('');
    const [addQuantity, setAddQuantity] = useState('');

    const [editingProductId, setEditingProductId] = useState(null);
    const [editProdName, setEditProdName] = useState('');
    const [editProdPrice, setEditProdPrice] = useState('');

    const [producingProductId, setProducingProductId] = useState(null);
    const [produceQty, setProduceQty] = useState('1');

    const handleEditProduct = (p) => {
        setEditingProductId(p.id);
        setEditProdName(p.productName);
        setEditProdPrice(p.productPrice.toString());
    };

    const handleCancelEditProduct = () => {
        setEditingProductId(null);
    };

    const submitEditProduct = async () => {
        if (!editProdName || isNaN(editProdPrice)) {
            toast.warning('Please provide a valid name and price.');
            return;
        }

        try {
            await api.put(`/products/${editingProductId}`, {
                productName: editProdName,
                productPrice: parseFloat(editProdPrice)
            });
            setEditingProductId(null);
            fetchData();
            toast.success('Product updated.');
        } catch (err) {
            toast.error('Error editing product.');
        }
    };

    const handleOpenProduce = (id) => {
        setProducingProductId(id);
        setProduceQty('1');
    };

    const handleCancelProduce = () => {
        setProducingProductId(null);
    };

    const submitProduce = async (id) => {
        if (!produceQty || isNaN(produceQty)) {
            toast.warning('Please enter a valid quantity.');
            return;
        }

        try {
            await api.post(`/products/${id}/produce?quantity=${produceQty}`);
            toast.success('Production successful!');
            setProducingProductId(null);
            if (onProduce) onProduce();
        } catch (err) {
            toast.error('Production error: ' + (err.response?.data?.details || err.message));
        }
    };

    const toggleRecipe = (id) => {
        setExpandedRecipe(expandedRecipe === id ? null : id);
    };

    const handleOpenAddMaterial = (productId) => {
        setAddingMaterialTo(productId);
        setSelectedMaterialId('');
        setAddQuantity('');
    };

    const handleCancelAddMaterial = () => {
        setAddingMaterialTo(null);
    };

    const submitAddMaterial = async (productId) => {
        if (!selectedMaterialId || !addQuantity || isNaN(addQuantity)) {
            toast.warning('Please select a material and enter a valid quantity.');
            return;
        }

        try {
            await api.post('/recipes', {
                product: { id: productId },
                material: { id: selectedMaterialId },
                quantity: parseFloat(addQuantity)
            });
            fetchData();
            setAddingMaterialTo(null);
            if (onProduce) onProduce();
            toast.success('Material added to recipe.');
        } catch (err) {
            toast.error('Error linking material.');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div className="list-container">
            <h3>Products & Stock</h3>
            {products.length === 0 ? (
                <p>No products registered.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Current Stock</th>
                            <th>Can Produce</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td>{p.productName}</td>
                                <td>$ {p.productPrice}</td>
                                <td>{p.stockQuantity || 0}</td>
                                <td>{p.maxProductionQuantity}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button onClick={() => handleOpenProduce(p.id)}>Produce</button>
                                        <button onClick={() => handleEditProduct(p)} className="btn-edit">Edit</button>
                                        <button onClick={() => handleDeleteProductClick(p.id)} className="btn-delete">Delete</button>
                                        <button onClick={() => toggleRecipe(p.id)} className="btn-secondary">
                                            {expandedRecipe === p.id ? 'Hide Recipe' : 'View Recipe'}
                                        </button>
                                        <button onClick={() => handleOpenAddMaterial(p.id)} className="btn-secondary">+ Raw Material</button>
                                    </div>

                                    {producingProductId === p.id && (
                                        <div className="inline-add-form" style={{ borderColor: '#3b82f6' }}>
                                            <h4>Start Production</h4>
                                            <div className="form-group">
                                                <input
                                                    type="number"
                                                    placeholder="Qty"
                                                    value={produceQty}
                                                    onChange={(e) => setProduceQty(e.target.value)}
                                                    style={{ width: '100px' }}
                                                />
                                                <button onClick={() => submitProduce(p.id)} className="btn-info">Start</button>
                                                <button onClick={handleCancelProduce} className="btn-cancel">Cancel</button>
                                            </div>
                                        </div>
                                    )}

                                    {editingProductId === p.id && (
                                        <div className="inline-add-form" style={{ borderColor: '#f59e0b' }}>
                                            <h4>Edit Product</h4>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    placeholder="Name"
                                                    value={editProdName}
                                                    onChange={(e) => setEditProdName(e.target.value)}
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Price"
                                                    value={editProdPrice}
                                                    onChange={(e) => setEditProdPrice(e.target.value)}
                                                    style={{ width: '100px' }}
                                                />
                                                <button onClick={submitEditProduct} className="btn-save">Save</button>
                                                <button onClick={handleCancelEditProduct} className="btn-cancel">Cancel</button>
                                            </div>
                                        </div>
                                    )}

                                    {addingMaterialTo === p.id && (
                                        <div className="inline-add-form">
                                            <h4>Add Material to Recipe</h4>
                                            <div className="form-group">
                                                <select
                                                    value={selectedMaterialId}
                                                    onChange={(e) => setSelectedMaterialId(e.target.value)}
                                                >
                                                    <option value="">Select a material...</option>
                                                    {materials.map(m => (
                                                        <option key={m.id} value={m.id}>{m.materialName}</option>
                                                    ))}
                                                </select>
                                                <input
                                                    type="number"
                                                    placeholder="Qty"
                                                    value={addQuantity}
                                                    onChange={(e) => setAddQuantity(e.target.value)}
                                                    style={{ width: '80px', marginRight: '0' }}
                                                />
                                                <button onClick={() => submitAddMaterial(p.id)} className="btn-save">Add</button>
                                                <button onClick={handleCancelAddMaterial} className="btn-cancel">Cancel</button>
                                            </div>
                                        </div>
                                    )}

                                    {expandedRecipe === p.id && (
                                        <div className="recipe-container" style={{ marginTop: '10px' }}>
                                            <strong>Recipe Details:</strong>
                                            {recipes.filter(r => r.product.id === p.id).length === 0 ? (
                                                <p>No materials linked.</p>
                                            ) : (
                                                recipes.filter(r => r.product.id === p.id).map(r => (
                                                    <div key={r.id} className="recipe-item">
                                                        <span>• {r.material.materialName}: {r.quantity}</span>
                                                        <button onClick={() => handleDeleteRecipeClick(r.id)} className="btn-remove-recipe">x</button>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <ConfirmModal
                isOpen={confirmModal.isOpen}
                title={confirmModal.type === 'product' ? 'Delete Product' : 'Remove Recipe Item'}
                message={confirmModal.type === 'product'
                    ? 'Are you sure you want to delete this product? All related data will be lost.'
                    : 'Are you sure you want to remove this material from the recipe?'}
                onConfirm={handleConfirmAction}
                onCancel={() => setConfirmModal({ isOpen: false, id: null, type: null })}
                confirmText="Delete"
                type="danger"
            />
        </div>
    );
};

export default ProductList;
