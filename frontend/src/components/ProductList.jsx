import React, { useEffect, useState } from 'react';
import api from '../api/api';

const ProductList = ({ onProduce }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            setError('Erro ao carregar produtos.');
            setLoading(false);
        }
    };

    const handleProduce = async (id) => {
        const quantity = prompt('Quantas unidades deseja produzir?', '1');
        if (!quantity || isNaN(quantity)) return;

        try {
            await api.post(`/products/${id}/produce?quantity=${quantity}`);
            alert('Produção realizada com sucesso!');
            if (onProduce) onProduce(); // Dispara atualização global
        } catch (err) {
            alert('Erro na produção: ' + (err.response?.data?.details || err.message));
        }
    };

    useEffect(() => {
        fetchProducts();
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
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td>{p.productName}</td>
                                <td>R$ {p.productPrice}</td>
                                <td>{p.stockQuantity || 0}</td>
                                <td>
                                    <button onClick={() => handleProduce(p.id)}>Produzir</button>
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
