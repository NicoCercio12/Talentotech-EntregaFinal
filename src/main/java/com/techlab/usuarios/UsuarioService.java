package com.techlab.usuarios;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    private final List<Usuario> usuarios = new ArrayList<>();
    private int currentId = 1;

    public List<Usuario> getAll() { return usuarios; }

    public Usuario save(Usuario usuario) {
        usuario.setId(currentId++);
        usuarios.add(usuario);
        return usuario;
    }

    public Optional<Usuario> findById(int id) {
        return usuarios.stream().filter(u -> u.getId() == id).findFirst();
    }
}

