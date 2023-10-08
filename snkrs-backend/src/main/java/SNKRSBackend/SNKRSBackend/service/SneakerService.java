package SNKRSBackend.SNKRSBackend.service;

import SNKRSBackend.SNKRSBackend.enums.Demographic;
import SNKRSBackend.SNKRSBackend.enums.Brand;
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

    public List<Sneaker> getSneakersByBrand(Brand brand) {
        return sneakerRepository.findSneakersByBrand(brand);
    }

    public List<Sneaker> getSneakersByPersonType(Demographic personType) {
        return sneakerRepository.findSneakersByDemographic(personType);
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
