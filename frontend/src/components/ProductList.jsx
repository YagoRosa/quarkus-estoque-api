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
            setError('Erro ao carregar dados.');
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Excluir este produto?')) return;
        try {
            await api.delete(`/products/${id}`);
            fetchData();
        } catch (err) {
            alert('Erro ao excluir produto.');
        }
    };

    const handleDeleteRecipe = async (id) => {
        if (!window.confirm('Remover este item da receita?')) return;
        try {
            await api.delete(`/recipes/${id}`);
            fetchData();
            if (onProduce) onProduce();
        } catch (err) {
            alert('Erro ao remover item da receita.');
        }
    };

    const handleAddRecipe = async (productId) => {
        const matId = prompt('ID do Material (copie da tabela de materiais):');
        if (!matId) return;
        const qty = prompt('Quantidade necessária para 1 unidade:');
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
            alert('Erro ao vincular material.');
        }
    };

    const handleProduce = async (id) => {
        const quantity = prompt('Quantas unidades deseja produzir?', '1');
        if (!quantity || isNaN(quantity)) return;

        try {
            await api.post(`/products/${id}/produce?quantity=${quantity}`);
            alert('Produção realizada com sucesso!');
            if (onProduce) onProduce();
        } catch (err) {
            alert('Erro na produção: ' + (err.response?.data?.details || err.message));
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div>
            <h2>Produtos e Estoque</h2>
            {products.length === 0 ? (
                <p>Nenhum produto cadastrado.</p>
            ) : (
                <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Estoque Atual</th>
                            <th>Pode Produzir</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td>{p.productName}</td>
                                <td>R$ {p.productPrice}</td>
                                <td>{p.stockQuantity || 0}</td>
                                <td>{p.maxProductionQuantity}</td>
                                <td>
                                    <div style={{ fontSize: '0.8em', marginBottom: '5px' }}>
                                        <strong>Receita:</strong>
                                        {recipes.filter(r => r.product.id === p.id).map(r => (
                                            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span>• {r.material.materialName}: {r.quantity}</span>
                                                <button onClick={() => handleDeleteRecipe(r.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', padding: '0 5px' }}>x</button>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => handleProduce(p.id)} style={{ marginRight: '5px' }}>Produzir</button>
                                    <button onClick={() => handleAddRecipe(p.id)} style={{ marginRight: '5px', fontSize: '0.8em' }}>+ Insumo</button>
                                    <button onClick={() => handleDeleteProduct(p.id)} style={{ color: 'red', fontSize: '0.8em' }}>Excluir</button>
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
