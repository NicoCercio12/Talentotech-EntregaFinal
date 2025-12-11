package com.techlab.dto;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;


public class LineaPedidoDTO {
    
    @NotNull(message = "El ID del producto no puede ser nulo")
    @Positive(message = "El ID del producto debe ser un número positivo")
    private Long productoId;

    @NotNull(message = "La cantidad no puede ser nula")
    @Min(value = 1, message = "La cantidad debe ser al menos 1")
    private Integer cantidad;

    @Positive(message = "El precio unitario debe ser un número positivo")
    private Double precioUnitario;

    public LineaPedidoDTO() {}
    
    public LineaPedidoDTO(Long productoId, Integer cantidad, Double precioUnitario) {
        this.productoId = productoId;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    }
    
    // Getters y Setters
    public Long getProductoId() {
        return productoId;
    }
    
    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }
    
    public Integer getCantidad() {
        return cantidad;
    }
    
    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }
    
    public Double getPrecioUnitario() {
        return precioUnitario;
    }
    
    public void setPrecioUnitario(Double precioUnitario) {
        this.precioUnitario = precioUnitario;
    }
    
    // Método utilitario para precio total
    public Double getPrecioTotal() {
        return cantidad * precioUnitario;
    }
    
    @Override
    public String toString() {
        return "LineaPedidoDTO{" +
                "productoId=" + productoId +
                ", cantidad=" + cantidad +
                ", precioUnitario=" + precioUnitario +
                '}';
    }
}
