import React from 'react';
import MaterialList from '../components/MaterialList';
import MaterialForm from '../components/MaterialForm';

const MaterialsPage = ({ refreshToggle, onRefresh }) => {
    return (
        <div className="page-container">
            <h2>Inventory & Materials</h2>
            <section className="form-section">
                <MaterialForm onMaterialCreated={onRefresh} />
            </section>
            <section className="list-section">
                <MaterialList key={`m-${refreshToggle}`} />
            </section>
        </div>
    );
};

export default MaterialsPage;
