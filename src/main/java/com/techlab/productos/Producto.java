package com.techlab.productos;

import jakarta.persistence.*;

@Entity
@Table(name = "producto")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;   // mantener Integer aquí

    private String nombre;
    private String descripcion;
    private double precio;
    private String categoria;
    private String urlImagen;
    private int stock;

    public Producto() {}

    // Constructor SIN id (la DB lo genera)
    public Producto(String nombre, String descripcion, double precio, String categoria, String urlImagen, int stock) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.categoria = categoria;
        this.urlImagen = urlImagen;
        this.stock = stock;
    }

    public Integer getId() {          // devolver Integer
        return id;
    }

    public void setId(Integer id) {   // recibir Integer
        this.id = id;
    }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public double getPrecio() { return precio; }
    public void setPrecio(double precio) { this.precio = precio; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public String getUrlImagen() { return urlImagen; }
    public void setUrlImagen(String urlImagen) { this.urlImagen = urlImagen; }

    public int getStock() { return stock; }
    public void setStock(int stock) { this.stock = stock; }
}
