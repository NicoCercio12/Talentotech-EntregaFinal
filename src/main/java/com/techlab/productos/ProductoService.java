package com.techlab.productos;

import com.techlab.excepciones.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductoService {
    private final List<Producto> productos = new ArrayList<>();
    private int currentId = 1;

    public List<Producto> getAll() {
        return productos;
    }

    public Producto save(Producto producto) {
        producto.setId(currentId++);
        productos.add(producto);
        return producto;
    }

    public Optional<Producto> findById(int id) {
        return productos.stream().filter(p -> p.getId() == id).findFirst();
    }

    // Devuelve el producto o lanza ResourceNotFoundException
    public Producto getById(int id) {
        return findById(id).orElseThrow(() ->
            new ResourceNotFoundException("Producto no encontrado con id: " + id));
    }

    // Actualiza reemplazando el objeto manteniendo el id
    public Producto update(int id, Producto nuevoProducto) {
        int index = -1;
        for (int i = 0; i < productos.size(); i++) {
            if (productos.get(i).getId() == id) {
                index = i;
                break;
            }
        }
        if (index == -1) {
            throw new ResourceNotFoundException("Producto no encontrado con id: " + id);
        }
        nuevoProducto.setId(id);
        productos.set(index, nuevoProducto);
        return nuevoProducto;
    }

    public void deleteById(int id) {
        boolean removed = productos.removeIf(p -> p.getId() == id);
        if (!removed) {
            throw new ResourceNotFoundException("Producto no encontrado con id: " + id);
        }
    }

    // Buscar por nombre (case-insensitive, contiene)
    public List<Producto> findByName(String nombre) {
        if (nombre == null || nombre.isBlank()) {
            return new ArrayList<>();
        }
        String q = nombre.toLowerCase();
        return productos.stream()
                .filter(p -> {
                    try {
                        return p.getNombre() != null && p.getNombre().toLowerCase().contains(q);
                    } catch (Exception e) {
                        return false;
                    }
                })
                .collect(Collectors.toList());
    }

    
}
