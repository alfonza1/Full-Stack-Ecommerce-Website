package SNKRSBackend.SNKRSBackend.model;

import SNKRSBackend.SNKRSBackend.enums.Person;
import SNKRSBackend.SNKRSBackend.enums.SneakerBrand;
import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
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

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public SneakerBrand getSneakerBrand() {
        return sneakerBrand;
    }

    public void setSneakerBrand(SneakerBrand sneakerBrand) {
        this.sneakerBrand = sneakerBrand;
    }

    public String getSneakerName() {
        return sneakerName;
    }

    public void setSneakerName(String sneakerName) {
        this.sneakerName = sneakerName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getSneakerPhoto() {
        return sneakerPhoto;
    }

    public void setSneakerPhoto(String sneakerPhoto) {
        this.sneakerPhoto = sneakerPhoto;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public boolean isPopular() {
        return isPopular;
    }

    public void setPopular(boolean popular) {
        isPopular = popular;
    }

    public boolean isNewArrival() {
        return newArrival;
    }

    public void setNewArrival(boolean newArrival) {
        this.newArrival = newArrival;
    }

    public boolean isSale() {
        return sale;
    }

    public void setSale(boolean sale) {
        this.sale = sale;
    }
}
