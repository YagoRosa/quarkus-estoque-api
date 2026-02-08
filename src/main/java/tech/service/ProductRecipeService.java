package tech.service;

import java.util.List;
import java.util.UUID;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import tech.entity.ProductRecipeEntity;

@ApplicationScoped
public class ProductRecipeService {
    @Transactional
    public ProductRecipeEntity addRecipe(ProductRecipeEntity recipe) {
        recipe.persist();
        return recipe;
    }

    public List<ProductRecipeEntity> findAll() {
        return ProductRecipeEntity.listAll();
    }

    @Transactional
    public void deleteRecipe(UUID id) {
        ProductRecipeEntity.deleteById(id);
    }
}