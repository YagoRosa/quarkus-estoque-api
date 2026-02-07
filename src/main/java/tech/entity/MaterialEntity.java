package tech.entity;

import java.util.UUID;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class MaterialEntity extends PanacheEntityBase{
   @Id
   @GeneratedValue(strategy = GenerationType.UUID)
    public UUID id;
    public String materialName;
    public Integer stockQuantity;

}
