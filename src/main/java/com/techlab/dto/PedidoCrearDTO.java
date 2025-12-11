package com.techlab.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;
import java.util.List;

public class PedidoCrearDTO {

    @NotNull(message = "El ID del cliente es obligatorio")
    private Long clienteId;

    @Email(message = "Debe ser un email válido")
    @Size(min = 5, max = 100, message = "El email debe tener entre 5 y 100 caracteres")
    private String emailCliente;

    @NotNull(message = "La dirección de entrega es obligatoria")
    @Size(min = 10, max = 200, message = "La dirección debe tener entre 10 y 200 caracteres")
    private String direccionEntrega;

    private String notas;

    @NotNull(message = "Debe contener al menos una línea de pedido")
    private List<LineaPedidoDTO> lineas;

    public PedidoCrearDTO() {}

    public PedidoCrearDTO(Long clienteId, String emailCliente, String direccionEntrega, String notas, List<LineaPedidoDTO> lineas) {
        this.clienteId = clienteId;
        this.emailCliente = emailCliente;
        this.direccionEntrega = direccionEntrega;
        this.notas = notas;
        this.lineas = lineas;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public String getEmailCliente() {
        return emailCliente;
    }

    public void setEmailCliente(String emailCliente) {
        this.emailCliente = emailCliente;
    }

    public String getDireccionEntrega() {
        return direccionEntrega;
    }

    public void setDireccionEntrega(String direccionEntrega) {
        this.direccionEntrega = direccionEntrega;
    }

    public String getNotas() {
        return notas;
    }

    public void setNotas(String notas) {
        this.notas = notas;
    }

    public List<LineaPedidoDTO> getLineas() {
        return lineas;
    }

    public void setLineas(List<LineaPedidoDTO> lineas) {
        this.lineas = lineas;
    }
}
