package tech.entity;

import java.math.BigDecimal;
import java.util.UUID;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table (name = "product")
public class ProductEntity extends PanacheEntityBase{
   @Id
   @GeneratedValue(strategy = GenerationType.UUID)
    public UUID id;
    public String productName;
    public BigDecimal productPrice;
    public Integer stockQuantity; 

}
