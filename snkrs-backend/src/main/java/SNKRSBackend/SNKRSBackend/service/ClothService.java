package SNKRSBackend.SNKRSBackend.service;
import SNKRSBackend.SNKRSBackend.model.Cloth;
import SNKRSBackend.SNKRSBackend.repository.ClothRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClothService {

    @Autowired
    private ClothRepository clothRepository;
    
    public List<Cloth> getAllClothes() {
        return (List<Cloth>) clothRepository.findAll();
    }
    
    // Additional methods like save, delete, etc.
}
