package SNKRSBackend.SNKRSBackend.model;
import SNKRSBackend.SNKRSBackend.enums.Demographic;
import SNKRSBackend.SNKRSBackend.enums.Brand;
import SNKRSBackend.SNKRSBackend.enums.ProductType;
import jakarta.persistence.*;
import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
@Data
public class Cloth {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private ProductType productType;

    @NotNull
    private String name;
    @NotNull
    private Brand brand;
    @NotNull
    private Double price;
    @NotNull
    private Demographic demographic;
    @NotNull
    private String photo;
    @NotNull
    @Column(name = "is_popular")
    private boolean isPopular = false;

    @NotNull
    @Column(name = "is_new_arrival")
    private boolean newArrival = false;

    @NotNull
    @Column(name = "is_on_sale")
    private boolean sale = false;
}
