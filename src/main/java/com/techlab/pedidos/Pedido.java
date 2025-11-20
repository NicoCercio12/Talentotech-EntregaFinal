package com.techlab.pedidos;
import java.util.List;
import java.util.ArrayList;


public class Pedido {

    private int id;
    private List<LineaPedido> lineas = new ArrayList<>();
    private EstadoPedido estado;
    private double total;

    public Pedido(){}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<LineaPedido> getLineas() {
        return lineas;
    }

    public void setLineas(List<LineaPedido> lineas) {
        this.lineas = lineas;
    }

    public EstadoPedido getEstado() {
        return estado;
    }

    public void setEstado(EstadoPedido estado) {
        this.estado = estado;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public double calcularTotal() {
        double suma = 0.0;
        for (LineaPedido linea : lineas) {
            suma += linea.calcularSubtotal();
        }
        return suma;
    }





}