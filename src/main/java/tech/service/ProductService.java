package tech.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import tech.entity.ProductEntity;
import tech.entity.ProductRecipeEntity;
import tech.exception.ResourceNotFoundException;

@ApplicationScoped
public class ProductService {

    public ProductEntity createProduct(ProductEntity ProductEntity) {
        ProductEntity.persist(ProductEntity);
        return ProductEntity;
    }

    public List<ProductEntity> findAll(Integer page, Integer pagesize) {
        List<ProductEntity> products = ProductEntity.findAll().page(page, pagesize).list();
        products.forEach(this::calculateCapacity);
        return products;
    }

    private void calculateCapacity(ProductEntity product) {
        List<ProductRecipeEntity> recipes = ProductRecipeEntity.find("product", product).list();
        if (recipes.isEmpty()) {
            product.maxProductionQuantity = 0;
            return;
        }

        int minCapacity = Integer.MAX_VALUE;

        for (ProductRecipeEntity recipe : recipes) {
            if (recipe.quantity.compareTo(BigDecimal.ZERO) > 0) {
                int materialStock = recipe.material.stockQuantity;
                int capacityForThisMaterial = (int) (materialStock / recipe.quantity.doubleValue());

                if (capacityForThisMaterial < minCapacity) {
                    minCapacity = capacityForThisMaterial;
                }
            }
        }

        product.maxProductionQuantity = (minCapacity == Integer.MAX_VALUE) ? 0 : minCapacity;
    }

    public ProductEntity findById(UUID id) {
        ProductEntity product = (ProductEntity) ProductEntity.findByIdOptional(id)
                .orElseThrow(ResourceNotFoundException::new);
        calculateCapacity(product);
        return product;
    }

    @Transactional
    public ProductEntity updateProduct(UUID id, ProductEntity ProductEntity) {
        var product = findById(id);

        product.productName = ProductEntity.productName;
        product.productPrice = ProductEntity.productPrice;

        ProductEntity.persist(product);

        return product;
    }

    @Transactional
    public void deleteProductById(UUID id) {
        var product = findById(id);
        ProductEntity.deleteById(id);

    }

    @Transactional
    public ProductEntity produceProduct(UUID productId, Integer quantityToProduce) {
        if (quantityToProduce <= 0) {
            throw new IllegalArgumentException("Quantidade deve ser maior que zero.");
        }
        ProductEntity product = ProductEntity.findByIdOptional(productId)
                .map(entity -> (ProductEntity) entity)
                .orElseThrow(ResourceNotFoundException::new);
        List<ProductRecipeEntity> recipes = ProductRecipeEntity.find("product", product).list();
        if (recipes.isEmpty()) {
            throw new IllegalStateException("Produto sem receita cadastrada.");
        }
        for (ProductRecipeEntity recipe : recipes) {
            BigDecimal quantityNeeded = recipe.quantity.multiply(new BigDecimal(quantityToProduce));
            BigDecimal currentStock = new BigDecimal(recipe.material.stockQuantity);
            if (currentStock.compareTo(quantityNeeded) < 0) {
                throw new IllegalStateException("Estoque insuficiente de: " + recipe.material.materialName);
            }
        }
        for (ProductRecipeEntity recipe : recipes) {
            BigDecimal quantityNeeded = recipe.quantity.multiply(new BigDecimal(quantityToProduce));
            recipe.material.stockQuantity -= quantityNeeded.intValue();
        }

        int currentStock = (product.stockQuantity == null) ? 0 : product.stockQuantity;
        product.stockQuantity = currentStock + quantityToProduce;

        return product;
    }
}
