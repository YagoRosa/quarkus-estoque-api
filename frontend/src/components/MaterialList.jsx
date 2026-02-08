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
            setError('Erro ao carregar materiais.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMaterials();
    }, []);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div>
            <h2>Materiais no Estoque</h2>
            {materials.length === 0 ? (
                <p>Nenhum material cadastrado.</p>
            ) : (
                <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Estoque</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materials.map((m) => (
                            <tr key={m.id}>
                                <td>{m.id}</td>
                                <td>{m.materialName}</td>
                                <td>{m.stockQuantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MaterialList;
