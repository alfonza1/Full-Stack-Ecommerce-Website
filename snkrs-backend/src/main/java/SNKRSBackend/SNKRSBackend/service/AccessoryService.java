package SNKRSBackend.SNKRSBackend.service;

import SNKRSBackend.SNKRSBackend.model.Accessory;
import SNKRSBackend.SNKRSBackend.repository.AccessoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccessoryService {

    @Autowired
    private AccessoryRepository accessoryRepository;
    
    public List<Accessory> getAllAccessories() {
        return (List<Accessory>) accessoryRepository.findAll();
    }
    
    // Additional methods like save, delete, etc.
}
