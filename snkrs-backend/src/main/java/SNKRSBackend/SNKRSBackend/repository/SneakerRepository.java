package SNKRSBackend.SNKRSBackend.repository;

import SNKRSBackend.SNKRSBackend.enums.Person;
import SNKRSBackend.SNKRSBackend.enums.SneakerBrand;
import SNKRSBackend.SNKRSBackend.model.Sneaker;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SneakerRepository extends CrudRepository<Sneaker, Long> {
    List<Sneaker> findBySneakerBrand(SneakerBrand brand);
    List<Sneaker> findByPerson(Person person);
    List<Sneaker> findByIsPopularTrue();
    List<Sneaker> findByNewArrivalTrue();
    List<Sneaker> findBySaleTrue();
}
