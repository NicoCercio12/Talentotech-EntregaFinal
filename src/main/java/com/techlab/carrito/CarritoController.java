package com.techlab.carrito;

import com.techlab.dto.CarritoDTO;
import com.techlab.dto.CarritoItemCrearDTO;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carrito")
public class CarritoController {

    private final CarritoService service;

    public CarritoController(CarritoService service) {
        this.service = service;
    }

    @PostMapping("/items")
    public CarritoDTO agregarItem(@RequestBody CarritoItemCrearDTO dto) {
        return service.agregarItem(dto);
    }

    @GetMapping
    public CarritoDTO verCarrito() {
        return service.getCarrito();
    }

    @DeleteMapping
    public void vaciarCarrito() {
        service.vaciar();
    }
}
