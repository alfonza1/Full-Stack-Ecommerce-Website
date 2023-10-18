package SNKRSBackend.SNKRSBackend.service;

import SNKRSBackend.SNKRSBackend.enums.Demographic;
import SNKRSBackend.SNKRSBackend.enums.Brand;
import SNKRSBackend.SNKRSBackend.enums.ProductType;
import SNKRSBackend.SNKRSBackend.model.Product;
import SNKRSBackend.SNKRSBackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return (List<Product>) productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product saveProduct(Product product) {
        validateProduct(product);
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public List<Product> getProductsByBrand(Brand brand) {
        return productRepository.findProductsByBrand(brand);
    }

    public List<Product> getProductsByDemographic(Demographic personType) {
        return productRepository.findProductsByDemographic(personType);
    }

    public List<Product> getPopularProducts() {
        return productRepository.findByIsPopularTrue();
    }

    public List<Product> getNewArrivalProducts() {
        return productRepository.findByNewArrivalTrue();
    }

    public List<Product> getOnSaleProducts() {
        return productRepository.findBySaleTrue();
    }

    public List<Product> getProductsByType(ProductType productType) {
        return productRepository.findAllProductsByProductType(productType);
    }

    private void validateProduct(Product product) {
        if (product == null) {
            throw new IllegalArgumentException("Product cannot be null");
        }

        if (product.getBrand() == null || product.getProductType() == null || product.getName() == null
                || product.getPhoto() == null || product.getPhoto().trim().isEmpty()
                || product.getDemographic() == null || Double.isNaN(product.getPrice())) {
            throw new IllegalArgumentException("One or more product fields are missing, null or empty");
        }
    }

    public List<Product> findByQueryAcrossFields(String query) {
        if (query == null || query.trim().isEmpty()) {
            return Collections.emptyList();
        }
        Brand brandEnum = null;
        Demographic demographicEnum = null;
        ProductType productTypeEnum = null;
        try {
            brandEnum = Brand.valueOf(query.toUpperCase());
        } catch (IllegalArgumentException e) {}

        try {
            demographicEnum = Demographic.valueOf(query.toUpperCase());
        } catch (IllegalArgumentException e) {}

        try {
            productTypeEnum = ProductType.valueOf(query.toUpperCase());
        } catch (IllegalArgumentException e) {}

        return productRepository.findByQueryAcrossFields(brandEnum, demographicEnum, productTypeEnum, query);
    }

    public void deleteAllProducts() {
        productRepository.deleteAll();
    }
}
