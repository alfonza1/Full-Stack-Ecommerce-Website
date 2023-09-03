package SNKRSBackend.SNKRSBackend.service;

import SNKRSBackend.SNKRSBackend.enums.Person;
import SNKRSBackend.SNKRSBackend.enums.SneakerBrand;
import SNKRSBackend.SNKRSBackend.model.Sneaker;
import SNKRSBackend.SNKRSBackend.repository.SneakerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SneakerService {

    @Autowired
    private SneakerRepository sneakerRepository;

    public List<Sneaker> getAllSneakers() {
        return (List<Sneaker>) sneakerRepository.findAll();
    }

    public Optional<Sneaker> getSneakerById(Long id) {
        return sneakerRepository.findById(id);
    }

    public Sneaker saveSneaker(Sneaker sneaker) {
        return sneakerRepository.save(sneaker);
    }

    public void deleteSneaker(Long id) {
        sneakerRepository.deleteById(id);
    }

    public List<Sneaker> getSneakersByBrand(SneakerBrand brand) {
        return sneakerRepository.findBySneakerBrand(brand);
    }

    public List<Sneaker> getSneakersByPersonType(Person personType) {
        return sneakerRepository.findByPerson(personType);
    }

    public List<Sneaker> getPopularSneakers() {
        return sneakerRepository.findByIsPopularTrue();
    }

    public List<Sneaker> getNewArrivalSneakers() {
        return sneakerRepository.findByNewArrivalTrue();
    }

    public List<Sneaker> getOnSaleSneakers() {
        return sneakerRepository.findBySaleTrue();
    }
}
