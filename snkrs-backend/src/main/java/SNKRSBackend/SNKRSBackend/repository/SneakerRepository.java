package SNKRSBackend.SNKRSBackend.repository;

import SNKRSBackend.SNKRSBackend.enums.Demographic;
import SNKRSBackend.SNKRSBackend.enums.Brand;
import SNKRSBackend.SNKRSBackend.model.Sneaker;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SneakerRepository extends CrudRepository<Sneaker, Long> {
    List<Sneaker> findSneakersByBrand(Brand brand);
    List<Sneaker> findSneakersByDemographic(Demographic demographic);
    List<Sneaker> findByIsPopularTrue();
    List<Sneaker> findByNewArrivalTrue();
    List<Sneaker> findBySaleTrue();
}