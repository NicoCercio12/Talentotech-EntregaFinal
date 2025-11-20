package com.techlab.usuarios;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @GetMapping
    public List<Usuario> getAll() { return service.getAll(); }

    @PostMapping
    public Usuario save(@RequestBody Usuario usuario) {
        return service.save(usuario);
    }

    @GetMapping("/{id}")
    public Usuario getById(@PathVariable int id) {
        return service.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
}
