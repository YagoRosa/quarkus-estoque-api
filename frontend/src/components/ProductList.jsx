import React, { useEffect, useState } from 'react';
import api from '../api/api';

const ProductList = ({ onProduce }) => {
    const [products, setProducts] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Delete this product?')) return;
        try {
            await api.delete(`/products/${id}`);
            fetchData();
        } catch (err) {
            alert('Error deleting product.');
        }
    };

    const handleDeleteRecipe = async (id) => {
        if (!window.confirm('Remove this item from recipe?')) return;
        try {
            await api.delete(`/recipes/${id}`);
            fetchData();
            if (onProduce) onProduce();
        } catch (err) {
            alert('Error removing recipe item.');
        }
    };

    const handleAddRecipe = async (productId) => {
        const matId = prompt('Material ID (copy from materials table):');
        if (!matId) return;
        const qty = prompt('Quantity needed for 1 unit:');
        if (!qty || isNaN(qty)) return;

        try {
            await api.post('/recipes', {
                product: { id: productId },
                material: { id: matId },
                quantity: parseFloat(qty)
            });
            fetchData();
            if (onProduce) onProduce();
        } catch (err) {
            alert('Error linking material.');
        }
    };

    const handleProduce = async (id) => {
        const quantity = prompt('How many units do you want to produce?', '1');
        if (!quantity || isNaN(quantity)) return;

        try {
            await api.post(`/products/${id}/produce?quantity=${quantity}`);
            alert('Production successful!');
            if (onProduce) onProduce();
        } catch (err) {
            alert('Production error: ' + (err.response?.data?.details || err.message));
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
                                    <div className="recipe-container">
                                        <strong>Recipe:</strong>
                                        {recipes.filter(r => r.product.id === p.id).map(r => (
                                            <div key={r.id} className="recipe-item">
                                                <span>• {r.material.materialName}: {r.quantity}</span>
                                                <button onClick={() => handleDeleteRecipe(r.id)} className="btn-remove-recipe">x</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="action-buttons">
                                        <button onClick={() => handleProduce(p.id)}>Produce</button>
                                        <button onClick={() => handleAddRecipe(p.id)} className="btn-secondary">+ Material</button>
                                        <button onClick={() => handleDeleteProduct(p.id)} className="btn-delete">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductList;
