package tech.service;

import java.util.List;
import java.util.UUID;

import jakarta.enterprise.context.ApplicationScoped;
import tech.entity.MaterialEntity;
import tech.exception.ResourceNotFoundException;

@ApplicationScoped
public class MaterialService {

    public MaterialEntity createMaterial(MaterialEntity materialEntity) {
        materialEntity.persist(materialEntity);
        return materialEntity;
    }

    public List<MaterialEntity> findAll(Integer page, Integer pagesize) {
        return MaterialEntity.findAll().page(page, pagesize).list();
    }

    public MaterialEntity findById(UUID id) {
        return (MaterialEntity) MaterialEntity.findByIdOptional(id)
                .orElseThrow(ResourceNotFoundException::new);
    }

    public MaterialEntity updateMaterial(UUID id, MaterialEntity materialEntity) {
        var material = findById(id);

        material.materialName = materialEntity.materialName;
        material.stockQuantity = materialEntity.stockQuantity;

        MaterialEntity.persist(material);

        return material;
    }

    @jakarta.transaction.Transactional
    public void deleteMaterialById(UUID id) {
        var material = findById(id);
        tech.entity.ProductRecipeEntity.delete("material", material);
        MaterialEntity.deleteById(id);

    }

}
