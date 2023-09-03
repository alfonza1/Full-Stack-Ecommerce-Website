package SNKRSBackend.SNKRSBackend.controller;

import SNKRSBackend.SNKRSBackend.enums.Person;
import SNKRSBackend.SNKRSBackend.enums.SneakerBrand;
import SNKRSBackend.SNKRSBackend.model.Sneaker;
import SNKRSBackend.SNKRSBackend.service.SneakerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/sneakers")
public class SneakerController {

    @Autowired
    private SneakerService sneakerService;

    @GetMapping("/")
    public ResponseEntity<List<Sneaker>> getAllSneakers() {
        return new ResponseEntity<>(sneakerService.getAllSneakers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sneaker> getSneakerById(@PathVariable Long id) {
        Optional<Sneaker> sneaker = sneakerService.getSneakerById(id);
        return sneaker.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
    public ResponseEntity<Sneaker> createSneaker(@RequestBody Sneaker sneaker) {
        return new ResponseEntity<>(sneakerService.saveSneaker(sneaker), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sneaker> updateSneaker(@PathVariable Long id, @RequestBody Sneaker sneaker) {
        Optional<Sneaker> existingSneaker = sneakerService.getSneakerById(id);
        if (existingSneaker.isPresent()) {
            sneaker.setId(id); // Assume that Sneaker has a setter for id
            return new ResponseEntity<>(sneakerService.saveSneaker(sneaker), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSneaker(@PathVariable Long id) {
        sneakerService.deleteSneaker(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/brand/{brand}")
    public ResponseEntity<List<Sneaker>> getSneakersByBrand(@PathVariable SneakerBrand brand) {
        return new ResponseEntity<>(sneakerService.getSneakersByBrand(brand), HttpStatus.OK);
    }

    @GetMapping("/personType/{personType}")
    public ResponseEntity<List<Sneaker>> getSneakersByPersonType(@PathVariable Person personType) {
        return new ResponseEntity<>(sneakerService.getSneakersByPersonType(personType), HttpStatus.OK);
    }

    @GetMapping("/popular")
    public ResponseEntity<List<Sneaker>> getPopularSneakers() {
        return new ResponseEntity<>(sneakerService.getPopularSneakers(), HttpStatus.OK);
    }

    @GetMapping("/newArrivals")
    public ResponseEntity<List<Sneaker>> getNewArrivalSneakers() {
        return new ResponseEntity<>(sneakerService.getNewArrivalSneakers(), HttpStatus.OK);
    }

    @GetMapping("/onSale")
    public ResponseEntity<List<Sneaker>> getOnSaleSneakers() {
        return new ResponseEntity<>(sneakerService.getOnSaleSneakers(), HttpStatus.OK);
    }
}
