package com.techlab.carrito;

import com.techlab.dto.CarritoDTO;
import com.techlab.dto.CarritoItemCrearDTO;
import com.techlab.dto.CarritoItemDTO;
import com.techlab.productos.Producto;
import com.techlab.productos.ProductoService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CarritoService {

    private final ProductoService productoService;
    private final List<CarritoItemDTO> items = new ArrayList<>();

    public CarritoService(ProductoService productoService) {
        this.productoService = productoService;
    }

    public CarritoDTO agregarItem(CarritoItemCrearDTO dto) {
        Producto p = productoService.getById(dto.getProductoId());
        CarritoItemDTO item = new CarritoItemDTO();
        item.setProductoId(p.getId());
        item.setNombreProducto(p.getNombre());
        item.setCantidad(dto.getCantidad());
        item.setSubtotal(p.getPrecio() * dto.getCantidad());
        items.add(item);
        return getCarrito();
    }

    public CarritoDTO getCarrito() {
        CarritoDTO dto = new CarritoDTO();
        dto.setItems(new ArrayList<>(items));
        double total = items.stream().mapToDouble(CarritoItemDTO::getSubtotal).sum();
        dto.setTotal(total);
        return dto;
    }

    public void vaciar() {
        items.clear();
    }

    public List<CarritoItemDTO> getItemsInternos() {
        return items;
    }
}
