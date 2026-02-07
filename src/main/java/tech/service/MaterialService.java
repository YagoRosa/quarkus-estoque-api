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

    public MaterialEntity findById(UUID materialid) {
        return (MaterialEntity) MaterialEntity.findByIdOptional(materialid)
                .orElseThrow(ResourceNotFoundException::new);
    }

    public MaterialEntity updateMaterial(UUID materialid, MaterialEntity materialEntity) {
        var material = findById(materialid);

        material.materialName = materialEntity.materialName;
        material.stockQuantity = materialEntity.stockQuantity;

        MaterialEntity.persist(material);

        return material;
    }

    public void deleteMaterialById(UUID materialid) {
        var material = findById(materialid);
        MaterialEntity.deleteById(materialid);

    }

}
