import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { toastUtils as toast } from '../utils/toast';

const ProductForm = ({ onProductCreated }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [availableMaterials, setAvailableMaterials] = useState([]);
    const [recipeItems, setRecipeItems] = useState([]);

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const response = await api.get('/materials');
                setAvailableMaterials(response.data);
            } catch (err) {
                console.error('Error fetching materials:', err);
            }
        };
        fetchMaterials();
    }, []);

    const addIngredient = () => {
        setRecipeItems([...recipeItems, { materialId: '', quantity: '' }]);
    };

    const removeIngredient = (index) => {
        setRecipeItems(recipeItems.filter((_, i) => i !== index));
    };

    const updateIngredient = (index, field, value) => {
        const newItems = [...recipeItems];
        newItems[index][field] = value;
        setRecipeItems(newItems);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 1. Create the Product
            const productResponse = await api.post('/products', {
                productName: name,
                productPrice: parseFloat(price),
                stockQuantity: 0
            });

            const productId = productResponse.data.id;

            // 2. Create Recipe Links
            const recipePromises = recipeItems
                .filter(item => item.materialId && item.quantity)
                .map(item => api.post('/recipes', {
                    product: { id: productId },
                    material: { id: item.materialId },
                    quantity: parseFloat(item.quantity)
                }));

            await Promise.all(recipePromises);

            setName('');
            setPrice('');
            setRecipeItems([]);
            if (onProductCreated) onProductCreated();
            toast.success('Product and recipe registered successfully!');
        } catch (err) {
            toast.error('Error registering product: ' + (err.response?.data?.details || err.message));
        }
    };

    return (
        <div className="form-container form-container-wide">
            <h3>Register New Product</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-grid-layout-compact">
                    {/* Left Column: Info & Actions */}
                    <div className="form-col-left">
                        <div className="input-group-compact">
                            <label>Product Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Premium Widget"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group-compact">
                            <label>Selling Price ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-actions-compact">
                            <button type="button" className="btn-secondary" onClick={addIngredient}>
                                + Add Raw Material
                            </button>
                            <button type="submit" className="btn-save-compact">
                                Save Product & Recipe
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Recipe Preview */}
                    <div className="form-col-right">
                        <h4>Current Recipe</h4>
                        <div className="recipe-list-compact">
                            {recipeItems.map((item, index) => (
                                <div key={index} className="recipe-item-row">
                                    <select
                                        value={item.materialId}
                                        onChange={(e) => updateIngredient(index, 'materialId', e.target.value)}
                                        required
                                    >
                                        <option value="">Select Material...</option>
                                        {availableMaterials.map(m => (
                                            <option key={m.id} value={m.id}>{m.materialName}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        placeholder="Qty"
                                        value={item.quantity}
                                        onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                                        required
                                        style={{ width: '70px' }}
                                    />
                                    <button
                                        type="button"
                                        className="btn-remove-recipe"
                                        onClick={() => removeIngredient(index)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            {recipeItems.length === 0 && (
                                <p className="empty-hint">Add ingredients to build the recipe.</p>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
