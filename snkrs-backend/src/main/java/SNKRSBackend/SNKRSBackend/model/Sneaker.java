package SNKRSBackend.SNKRSBackend.model;

import SNKRSBackend.SNKRSBackend.enums.Person;
import SNKRSBackend.SNKRSBackend.enums.SneakerBrand;
import jakarta.persistence.*;
import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
@Data
public class Sneaker {


    @NotNull
    @Column(name = "sneaker_brand")
    private SneakerBrand sneakerBrand;

    @NotNull
    @Column(name = "sneaker_name")
    private String sneakerName;

    @NotNull
    @Column(name = "price")
    private double price;

    @NotNull
    @Column(name = "sneaker_photo")
    private String sneakerPhoto;

    @NotNull
    @Column(name = "person_type")
    private Person person;

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
