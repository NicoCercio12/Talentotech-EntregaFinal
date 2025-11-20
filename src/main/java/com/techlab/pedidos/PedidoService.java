package com.techlab.pedidos;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {
    private final List<Pedido> pedidos = new ArrayList<>();
    private int currentId = 1;

    public List<Pedido> getAll() {
        return pedidos;
    }

    public Pedido save(Pedido pedido) {
        pedido.setId(currentId++);
        pedido.calcularTotal();
        pedidos.add(pedido);
        return pedido;
    }

    public Optional<Pedido> findById(int id) {
        return pedidos.stream().filter(p -> p.getId() == id).findFirst();
    }
}
