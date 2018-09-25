package com.bhonea.artmap.services;

import com.bhonea.artmap.models.entities.Mural;
import com.bhonea.artmap.repositories.MuralRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MuralService {

    @Autowired
    private MuralRepository muralRepository;

    public Mural save(Mural mural) {
        return muralRepository.save(mural);
    }

    public List<Mural> getAll() {
        return muralRepository.findAll();
    }
}
