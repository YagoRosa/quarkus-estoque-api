package tech.service;
import java.util.List;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import tech.entity.ProductRecipeEntity;
@ApplicationScoped
public class ProductRecipeService {
    @Transactional
    public ProductRecipeEntity addRecipe(ProductRecipeEntity recipe) {
        // O Hibernate Panache identifica os IDs de Produto e Material 
        // enviados no JSON e cria o relacionamento no banco.
        recipe.persist();
        return recipe;
    }
    public List<ProductRecipeEntity> findAll() {
        return ProductRecipeEntity.listAll();
    }
}