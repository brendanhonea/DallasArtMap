package com.bhonea.artmap.controllers;

import com.bhonea.artmap.models.entities.Mural;
import com.bhonea.artmap.services.MuralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/murals")
public class MuralController {

    @Autowired
    private MuralService muralService;

    @PostMapping
    public Mural saveMural(@RequestBody Mural mural) {
        return muralService.save(mural);
    }

    @GetMapping
    public List<Mural> getMurals() {
        return muralService.getAll();
    }
}
