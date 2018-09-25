package com.bhonea.artmap.repositories;

import com.bhonea.artmap.models.entities.Mural;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MuralRepository extends JpaRepository<Mural, Long> {
}
