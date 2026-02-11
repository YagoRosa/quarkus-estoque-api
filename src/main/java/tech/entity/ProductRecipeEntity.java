package tech.entity;

import java.math.BigDecimal;
import java.util.UUID;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;

@Entity
@Table(name = "product_recipe")
public class ProductRecipeEntity extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public UUID id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    public ProductEntity product;

    @ManyToOne
    @JoinColumn(name = "material_id")
    public MaterialEntity material;

    @Min(0)
    public BigDecimal quantity;
}