package SNKRSBackend.SNKRSBackend.repository;

import SNKRSBackend.SNKRSBackend.enums.Demographic;
import SNKRSBackend.SNKRSBackend.enums.Brand;
import SNKRSBackend.SNKRSBackend.model.Cloth;
import SNKRSBackend.SNKRSBackend.model.Sneaker;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClothRepository extends CrudRepository<Cloth, Long> {
//    List<Cloth> findByBrand(Brand brand);
//    List<Cloth> findByPerson(Demographic demographic);
//    List<Cloth> findByIsPopularTrue();
//    List<Cloth> findByNewArrivalTrue();
//    List<Cloth> findBySaleTrue();
}
