package SNKRSBackend.SNKRSBackend.controller;

import SNKRSBackend.SNKRSBackend.enums.Demographic;
import SNKRSBackend.SNKRSBackend.enums.Brand;
import SNKRSBackend.SNKRSBackend.enums.ProductType;
import SNKRSBackend.SNKRSBackend.model.Sneaker;
import SNKRSBackend.SNKRSBackend.service.SneakerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
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
    public ResponseEntity<List<Sneaker>> getSneakersByBrand(@PathVariable Brand brand) {
        return new ResponseEntity<>(sneakerService.getSneakersByBrand(brand), HttpStatus.OK);
    }

    @GetMapping("/demographic/{demographic}")
    public ResponseEntity<List<Sneaker>> getSneakersByDemographic(@PathVariable Demographic demographic) {
        return new ResponseEntity<>(sneakerService.getSneakersByPersonType(demographic), HttpStatus.OK);
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
    @GetMapping("/demographics")
    public ResponseEntity<List<Demographic>> getAllDemographics() {
        List<Demographic> demographics = Arrays.asList(Demographic.values());
        return new ResponseEntity<>(demographics, HttpStatus.OK);
    }

    @GetMapping("/brands")
    public ResponseEntity<List<Brand>> getAllBrands() {
        List<Brand> brands = Arrays.asList(Brand.values());
        return new ResponseEntity<>(brands, HttpStatus.OK);
    }

    @GetMapping("/producttypes")
    public ResponseEntity<List<String>> getAllProductTypes() {
        List<String> productTypes = new ArrayList<>();

        for (ProductType type : ProductType.values()) {
            productTypes.add(type.toString());
        }

        return new ResponseEntity<>(productTypes, HttpStatus.OK);
    }



}
