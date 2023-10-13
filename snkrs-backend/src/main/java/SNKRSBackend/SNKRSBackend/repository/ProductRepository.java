package SNKRSBackend.SNKRSBackend.repository;

import SNKRSBackend.SNKRSBackend.enums.Demographic;
import SNKRSBackend.SNKRSBackend.enums.Brand;
import SNKRSBackend.SNKRSBackend.enums.ProductType;
import SNKRSBackend.SNKRSBackend.model.Product;
import org.springframework.data.repository.CrudRepository;
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

}
