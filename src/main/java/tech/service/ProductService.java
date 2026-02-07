package tech.service;

import java.util.List;
import java.util.UUID;

import jakarta.enterprise.context.ApplicationScoped;
import tech.entity.ProductEntity;
import tech.exception.ResourceNotFoundException;

@ApplicationScoped
public class ProductService {

    public ProductEntity createProduct(ProductEntity ProductEntity) {
        ProductEntity.persist(ProductEntity);
        return ProductEntity;
    }

    public List<ProductEntity> findAll(Integer page, Integer pagesize) {
        return ProductEntity.findAll().page(page, pagesize).list();
    }

    public ProductEntity findById(UUID productid) {
        return (ProductEntity) ProductEntity.findByIdOptional(productid)
                .orElseThrow(ResourceNotFoundException::new);
    }

    public ProductEntity updateProduct(UUID productid, ProductEntity ProductEntity) {
        var product = findById(productid);

        product.productName = ProductEntity.productName;
        product.productPrice = ProductEntity.productPrice;
        
        ProductEntity.persist(product);

        return product;
    }

    public void deleteProductById(UUID productid) {
        var product = findById(productid);
        ProductEntity.deleteById(productid);

    }

}
