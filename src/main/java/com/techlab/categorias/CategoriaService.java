package com.techlab.categorias;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    private final CategoriaRepository repository;

    public CategoriaService(CategoriaRepository repository) {
        this.repository = repository;
    }

    public List<Categoria> getAll() {
        return repository.findAll();
    }

    public Optional<Categoria> findById(int id) {
        return repository.findById(id);
    }

    public Categoria save(Categoria categoria) {
        if (categoria == null) {
            throw new IllegalArgumentException("Categoria cannot be null");
        }
        return repository.save(categoria);
    }

    public void deleteById(int id) {
        repository.deleteById(id);
    }
}