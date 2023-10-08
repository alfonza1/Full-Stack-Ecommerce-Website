package SNKRSBackend.SNKRSBackend.model;
import SNKRSBackend.SNKRSBackend.enums.Demographic;
import SNKRSBackend.SNKRSBackend.enums.Brand;
import SNKRSBackend.SNKRSBackend.enums.ProductType;
import jakarta.persistence.*;
import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
@Data
public class Accessory {
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
    private boolean isPopular = false;

    @NotNull
    private boolean newArrival = false;

    @NotNull
    private boolean sale = false;
}
