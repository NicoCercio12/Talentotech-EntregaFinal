package com.techlab.categorias;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {

    List<Categoria> findByNombreContainingIgnoreCase(String nombre);

}