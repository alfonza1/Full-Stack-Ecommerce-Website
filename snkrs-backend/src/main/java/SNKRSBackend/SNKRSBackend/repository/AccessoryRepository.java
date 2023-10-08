package SNKRSBackend.SNKRSBackend.repository;

import SNKRSBackend.SNKRSBackend.enums.Demographic;
import SNKRSBackend.SNKRSBackend.enums.Brand;
import SNKRSBackend.SNKRSBackend.model.Accessory;
import SNKRSBackend.SNKRSBackend.model.Sneaker;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccessoryRepository extends CrudRepository<Accessory, Long> {
//    List<Accessory> findByBrand(Brand brand);
//    List<Accessory> findByPerson(Demographic demographic);
//    List<Accessory> findByIsPopularTrue();
//    List<Accessory> findByNewArrivalTrue();
//    List<Accessory> findBySaleTrue();
}
