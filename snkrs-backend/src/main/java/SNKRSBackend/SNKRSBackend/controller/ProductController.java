package SNKRSBackend.SNKRSBackend.controller;

import SNKRSBackend.SNKRSBackend.enums.Demographic;
import SNKRSBackend.SNKRSBackend.enums.Brand;
import SNKRSBackend.SNKRSBackend.enums.ProductType;
import SNKRSBackend.SNKRSBackend.model.Product;
import SNKRSBackend.SNKRSBackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/")
    public ResponseEntity<List<Product>> getAllProducts() {
        return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        try {
            return new ResponseEntity<>(productService.saveProduct(product), HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Optional<Product> existingProduct = productService.getProductById(id);
        if (existingProduct.isPresent()) {
            product.setId(id);
            try {
                return new ResponseEntity<>(productService.saveProduct(product), HttpStatus.OK);
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductById(@PathVariable Long id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/brand/{brand}")
    public ResponseEntity<List<Product>> getProductsByBrand(@PathVariable Brand brand) {
        return new ResponseEntity<>(productService.getProductsByBrand(brand), HttpStatus.OK);
    }

    @GetMapping("/demographic/{demographic}")
    public ResponseEntity<List<Product>> getProductsByDemographic(@PathVariable Demographic demographic) {
        return new ResponseEntity<>(productService.getProductsByDemographic(demographic), HttpStatus.OK);
    }

    @GetMapping("/popular")
    public ResponseEntity<List<Product>> getPopularProducts() {
        return new ResponseEntity<>(productService.getPopularProducts(), HttpStatus.OK);
    }

    @GetMapping("/newArrivals")
    public ResponseEntity<List<Product>> getNewArrivalProducts() {
        return new ResponseEntity<>(productService.getNewArrivalProducts(), HttpStatus.OK);
    }

    @GetMapping("/onSale")
    public ResponseEntity<List<Product>> getOnSaleProducts() {
        return new ResponseEntity<>(productService.getOnSaleProducts(), HttpStatus.OK);
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

    @GetMapping("/type/{productType}")
    public ResponseEntity<List<Product>> getProductsByType(@PathVariable ProductType productType) {
        return new ResponseEntity<>(productService.getProductsByType(productType), HttpStatus.OK);
    }
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchByUnifiedCriteria(@RequestParam String query) {
        List<Product> results = productService.findByQueryAcrossFields(query);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }



}