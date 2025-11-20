package com.techlab.pedidos;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {
    private final PedidoService service;

    public PedidoController(PedidoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Pedido> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Pedido save(@RequestBody Pedido pedido) {
        return service.save(pedido);
    }

    @GetMapping("/{id}")
    public Pedido getById(@PathVariable int id) {
        return service.findById(id).orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
    }
}
