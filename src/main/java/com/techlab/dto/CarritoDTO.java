package com.techlab.dto;

import java.util.List;

public class CarritoDTO {
    private List<CarritoItemDTO> items;
    private double total;

    public List<CarritoItemDTO> getItems() { return items; }
    public void setItems(List<CarritoItemDTO> items) { this.items = items; }

    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }
}
