package com.techlab.productos;

import com.techlab.excepciones.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    private final ProductoRepository repository;

    public ProductoService(ProductoRepository repository) {
        this.repository = repository;
    }

    public List<Producto> getAll() {
        return repository.findAll();
    }

    public Producto save(Producto producto) {
        // No seteás id; lo genera la DB
        if (producto == null) {
            throw new IllegalArgumentException("El producto no puede ser nulo");
        }
        return repository.save(producto);
    }

    public Optional<Producto> findById(int id) {
        return repository.findById(id);
    }

    public Producto getById(int id) {
        return findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Producto no encontrado con id: " + id)
        );
    }

    public Producto update(int id, Producto nuevoProducto) {
        Producto existente = getById(id); // lanza excepción si no existe
        // copiás campos que quieras actualizar
        existente.setNombre(nuevoProducto.getNombre());
        existente.setDescripcion(nuevoProducto.getDescripcion());
        existente.setPrecio(nuevoProducto.getPrecio());
        existente.setCategoria(nuevoProducto.getCategoria());
        existente.setUrlImagen(nuevoProducto.getUrlImagen());
        existente.setStock(nuevoProducto.getStock());
        return repository.save(existente);
    }

    public void deleteById(int id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Producto no encontrado con id: " + id);
        }
        repository.deleteById(id);
    }

    public List<Producto> findByName(String nombre) {
        // Implementar búsqueda por nombre si es necesario
        throw new UnsupportedOperationException("Búsqueda por nombre no implementada");
    }   

}
