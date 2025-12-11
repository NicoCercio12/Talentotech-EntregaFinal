package com.techlab.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "pedido")
public class PedidoProperties {
    private String estadoInicial = "PENDIENTE";
    private String estadoPagado = "PROCESANDO";
    private String estadoEnviado = "ENVIADO";

    public String getEstadoInicial() {
        return estadoInicial;
    }

    public void setEstadoInicial(String estadoInicial) {
        this.estadoInicial = estadoInicial;
    }

    public String getEstadoPagado() {
        return estadoPagado;
    }

    public void setEstadoPagado(String estadoPagado) {
        this.estadoPagado = estadoPagado;
    }

    public String getEstadoEnviado() {
        return estadoEnviado;
    }

    public void setEstadoEnviado(String estadoEnviado) {
        this.estadoEnviado = estadoEnviado;
    }
}