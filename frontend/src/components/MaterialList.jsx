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

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este material?')) return;
        try {
            await api.delete(`/materials/${id}`);
            fetchMaterials();
        } catch (err) {
            alert('Erro ao excluir: ' + (err.response?.data?.details || err.message));
        }
    };

    const handleEdit = async (m) => {
        const newName = prompt('Novo nome do material:', m.materialName);
        if (newName === null) return;
        const newQty = prompt('Nova quantidade em estoque:', m.stockQuantity);
        if (newQty === null || isNaN(newQty)) return;

        try {
            await api.put(`/materials/${m.id}`, {
                materialName: newName,
                stockQuantity: parseInt(newQty)
            });
            fetchMaterials();
        } catch (err) {
            alert('Erro ao editar: ' + (err.response?.data?.details || err.message));
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
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materials.map((m) => (
                            <tr key={m.id}>
                                <td>{m.id.substring(0, 8)}...</td>
                                <td>{m.materialName}</td>
                                <td>{m.stockQuantity}</td>
                                <td>
                                    <button onClick={() => handleEdit(m)} style={{ marginRight: '5px' }}>Editar</button>
                                    <button onClick={() => handleDelete(m.id)} style={{ color: 'red' }}>Excluir</button>
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
