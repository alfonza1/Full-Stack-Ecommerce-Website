package SNKRSBackend.SNKRSBackend.repository;

import SNKRSBackend.SNKRSBackend.enums.Demographic;
import SNKRSBackend.SNKRSBackend.enums.Brand;
import SNKRSBackend.SNKRSBackend.enums.ProductType;
import SNKRSBackend.SNKRSBackend.model.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {
    List<Product> findProductsByBrand(Brand brand);
    List<Product> findProductsByDemographic(Demographic demographic);
    List<Product> findByIsPopularTrue();
    List<Product> findByNewArrivalTrue();
    List<Product> findBySaleTrue();
    List<Product> findAllProductsByProductType(ProductType productType);


    @Query("SELECT p FROM Product p WHERE (p.brand = :brandEnum) OR (p.demographic = :demographicEnum) OR (p.productType = :productTypeEnum) OR (lower(p.name) LIKE lower(concat('%', :query, '%')))")
    List<Product> findByQueryAcrossFields(
            @Param("brandEnum") Brand brandEnum,
            @Param("demographicEnum") Demographic demographicEnum,
            @Param("productTypeEnum") ProductType productTypeEnum,
            @Param("query") String query);



}



