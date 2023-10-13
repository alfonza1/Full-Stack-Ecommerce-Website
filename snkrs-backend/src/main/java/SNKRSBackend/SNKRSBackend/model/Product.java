package SNKRSBackend.SNKRSBackend.model;

import SNKRSBackend.SNKRSBackend.enums.Demographic;
import SNKRSBackend.SNKRSBackend.enums.Brand;
import SNKRSBackend.SNKRSBackend.enums.ProductType;
import jakarta.persistence.*;
import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
@Data
public class Product {


    @NotNull
    @Column(name = "sneaker_brand")
    private Brand brand;

    @NotNull
    @Column(name = "product_type")
    private ProductType productType;

    @NotNull
    @Column(name = "sneaker_name")
    private String name;

    @NotNull
    @Column(name = "price")
    private double price;

    @NotNull
    @Column(name = "sneaker_photo")
    private String photo;

    @NotNull
    @Column(name = "demographic_type")
    private Demographic demographic;

    @NotNull
    @Column(name = "is_popular")
    private boolean isPopular = false;

    @NotNull
    @Column(name = "is_new_arrival")
    private boolean newArrival = false;

    @NotNull
    @Column(name = "is_on_sale")
    private boolean sale = false;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    @NotNull
    private long id;


}
