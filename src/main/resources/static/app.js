// MENÚ y navegación principal
function mostrarSeccion(nombre) {
    const seccion = document.getElementById('seccionPrincipal');
    switch(nombre) {
        case "productos":
            renderGestionProductos(seccion);
            break;
        case "categorias":
            renderGestionCategorias(seccion);
            break;
        case "carrito":
            renderCarrito(seccion);
            break;
        case "realizarPedido":
            renderRealizarPedido(seccion);
            break;
        case "historialPedidos":
            renderHistorialPedidos(seccion);
            break;
        case "admin":
            renderAdministracion(seccion);
            break;
        case "salir":
            seccion.innerHTML = "<h2 class='text-xl text-red-600 text-center mt-10'>Sesión finalizada. ¡Gracias por usar el sistema!</h2>";
            break;
        default:
            seccion.innerHTML = `<h2 class="text-xl font-semibold mt-6 text-center">Selecciona una opción del menú.</h2>`;
    }
}

/* ----------- Productos (1) ----------- */
function renderGestionProductos(seccion) {
    seccion.innerHTML = `
        <h2 class="text-2xl font-bold text-green-600 mb-4 text-center">——————— Gestión de Productos ———————</h2>
        <div class="space-y-2 mb-4 flex flex-col max-w-xl mx-auto">
            <button onclick="renderAgregarProducto()" class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">a) Agregar Producto</button>
            <button onclick="renderListarProductos()" class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">b) Listar Productos</button>
            <button onclick="renderBuscarProducto()" class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">c) Buscar Producto por ID</button>
            <button onclick="renderActualizarProducto()" class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">d) Actualizar Producto</button>
            <button onclick="renderEliminarProducto()" class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">e) Eliminar Producto</button>
            <button onclick="mostrarSeccion('menuPrincipal')" class="bg-blue-300 hover:bg-blue-400 px-4 py-2 rounded">f) Volver al menú principal</button>
        </div>
        <div id="contenidoProducto"></div>
    `;
}

// Listar productos
function renderListarProductos() {
    fetch('/api/productos')
        .then(resp => resp.json())
        .then(productos => {
            const html = productos.map(p => `
                <div class="bg-white p-4 rounded shadow mb-2">
                    <div class="font-bold text-lg">${p.nombre}</div>
                    <div>${p.descripcion ?? ""}</div>
                    <div>Precio: $${p.precio} | Stock: ${p.stock}</div>
                    <div>Categoría: ${p.categoria ?? ""}</div>
                    <img src="${p.urlImagen ?? "#"}" alt="Imagen" class="w-24 h-24 object-cover mt-2"/>
                </div>
            `).join('');
            document.getElementById("contenidoProducto").innerHTML = html || "<div>No hay productos cargados aún.</div>";
        });
}

// Formulario agregar producto
function renderAgregarProducto() {
    document.getElementById("contenidoProducto").innerHTML = `
        <form onsubmit="submitAgregarProducto(event)" class="space-y-2">
            <input name="nombre" placeholder="Nombre" required class="border p-2 w-full"/>
            <input name="descripcion" placeholder="Descripción" required class="border p-2 w-full"/>
            <input name="precio" placeholder="Precio" type="number" step="0.01" required class="border p-2 w-full"/>
            <input name="categoria" placeholder="Categoría" required class="border p-2 w-full"/>
            <input name="urlImagen" placeholder="URL de Imagen" class="border p-2 w-full"/>
            <input name="stock" placeholder="Stock" type="number" min="0" required class="border p-2 w-full"/>
            <button type="submit" class="bg-green-400 px-4 py-2 rounded text-white font-bold">Guardar Producto</button>
        </form>
    `;
}

function submitAgregarProducto(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const producto = Object.fromEntries(fd.entries());
    producto.precio = parseFloat(producto.precio);
    producto.stock = parseInt(producto.stock);

    fetch('/api/productos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(producto)
    })
    .then(resp => {
        if (!resp.ok) {
            return resp.text().then(t => { throw new Error(t || 'Error'); });
        }
        return resp.json();
    })
    .then(() => {
        alert("Producto guardado correctamente");
        renderListarProductos();
    })
    .catch(err => {
        console.error(err);
        alert("Error al guardar producto: " + err.message);
    });
}

// Buscar producto por ID
function renderBuscarProducto() {
    document.getElementById("contenidoProducto").innerHTML = `
        <form onsubmit="submitBuscarProducto(event)" class="space-y-2">
            <input name="id" placeholder="ID del producto" type="number" required class="border p-2 w-full" />
            <button type="submit" class="bg-blue-400 px-4 py-2 rounded text-white font-bold">Buscar</button>
        </form>
        <div id="busquedaProductoResultado"></div>
    `;
}

function submitBuscarProducto(e) {
    e.preventDefault();
    const id = e.target.id.value;
    fetch(`/api/productos/${id}`)
        .then(resp => resp.json())
        .then(p => {
            document.getElementById("busquedaProductoResultado").innerHTML = `
                <div class="bg-white p-4 rounded shadow mb-2 mt-2">
                    <div class="font-bold text-lg">${p.nombre}</div>
                    <div>${p.descripcion ?? ""}</div>
                    <div>Precio: $${p.precio} | Stock: ${p.stock}</div>
                    <div>Categoría: ${p.categoria ?? ""}</div>
                    <img src="${p.urlImagen ?? "#"}" alt="Imagen" class="w-24 h-24 object-cover mt-2"/>
                </div>
            `;
        })
        .catch(() =>
            document.getElementById("busquedaProductoResultado").innerHTML =
                "<div class='text-red-500 mt-2'>Producto no encontrado.</div>"
        );
}

// Actualizar producto (versión simple: envía todo)
function renderActualizarProducto() {
    document.getElementById("contenidoProducto").innerHTML = `
        <form onsubmit="submitActualizarProducto(event)" class="space-y-2">
            <input name="id" placeholder="ID del producto" type="number" required class="border p-2 w-full" />
            <input name="nombre" placeholder="Nuevo nombre" class="border p-2 w-full"/>
            <input name="descripcion" placeholder="Nueva descripción" class="border p-2 w-full"/>
            <input name="precio" placeholder="Nuevo precio" type="number" step="0.01" class="border p-2 w-full"/>
            <input name="categoria" placeholder="Nueva categoría" class="border p-2 w-full"/>
            <input name="urlImagen" placeholder="Nueva URL de Imagen" class="border p-2 w-full"/>
            <input name="stock" placeholder="Nuevo stock" type="number" min="0" class="border p-2 w-full"/>
            <button type="submit" class="bg-yellow-400 px-4 py-2 rounded text-white font-bold">Actualizar Producto</button>
        </form>
    `;
}

function submitActualizarProducto(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const id = fd.get('id');
    const producto = Object.fromEntries(fd.entries());
    if (producto.precio) producto.precio = parseFloat(producto.precio);
    if (producto.stock) producto.stock = parseInt(producto.stock);

    fetch(`/api/productos/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(producto)
    })
    .then(resp => {
        if (!resp.ok) throw new Error();
        return resp.json();
    })
    .then(() => {
        alert("Producto actualizado correctamente");
        renderListarProductos();
    })
    .catch(() => alert("Error al actualizar producto"));
}

// Eliminar producto
function renderEliminarProducto() {
    document.getElementById("contenidoProducto").innerHTML = `
        <form onsubmit="submitEliminarProducto(event)" class="space-y-2">
            <input name="id" placeholder="ID del producto" type="number" required class="border p-2 w-full" />
            <button type="submit" class="bg-red-400 px-4 py-2 rounded text-white font-bold">Eliminar Producto</button>
        </form>
    `;
}

function submitEliminarProducto(e) {
    e.preventDefault();
    const id = e.target.id.value;
    if (!confirm("¿Seguro que desea eliminar el producto?")) return;
    fetch(`/api/productos/${id}`, { method: 'DELETE' })
        .then(resp => {
            if (!resp.ok) throw new Error();
            alert("Producto eliminado correctamente");
            renderListarProductos();
        })
        .catch(() => alert("Error al eliminar producto"));
}

/* --------- CATEGORÍAS (2) --------- */
function renderGestionCategorias(seccion) {
    seccion.innerHTML = `
        <h2 class='text-2xl font-bold text-purple-700 mb-4 text-center'>— Gestión de Categorías —</h2>
        <div class="space-y-2 mb-4 flex flex-col max-w-xl mx-auto">
            <button onclick="renderAgregarCategoria()" class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">a) Agregar Categoría</button>
            <button onclick="renderListarCategorias()" class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">b) Listar Categorías</button>
            <button onclick="renderEliminarCategoria()" class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">c) Eliminar Categoría</button>
        </div>
        <div id="contenidoCategoria"></div>
    `;
}

function renderAgregarCategoria() {
    document.getElementById("contenidoCategoria").innerHTML = `
        <form onsubmit="submitAgregarCategoria(event)" class="space-y-2">
            <input name="nombre" placeholder="Nombre de categoría" required class="border p-2 w-full"/>
            <button type="submit" class="bg-green-400 px-4 py-2 rounded text-white font-bold">Guardar Categoría</button>
        </form>
    `;
}

function submitAgregarCategoria(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const categoria = Object.fromEntries(fd.entries());
    fetch('/api/categorias', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(categoria)
    })
    .then(r => {
        if (!r.ok) throw new Error();
        return r.json();
    })
    .then(() => {
        alert("Categoría guardada");
        renderListarCategorias();
    })
    .catch(() => alert("Error al guardar categoría"));
}

function renderListarCategorias() {
    fetch('/api/categorias')
        .then(r => r.json())
        .then(categorias => {
            const html = categorias.map(c => `
                <div class="bg-white p-3 rounded shadow mb-2">
                    <strong>${c.nombre}</strong> (ID: ${c.id})
                </div>
            `).join('') || "<div>No hay categorías cargadas.</div>";
            document.getElementById("contenidoCategoria").innerHTML = html;
        });
}

function renderEliminarCategoria() {
    document.getElementById("contenidoCategoria").innerHTML = `
        <form onsubmit="submitEliminarCategoria(event)" class="space-y-2">
            <input name="id" placeholder="ID de la categoría" type="number" required class="border p-2 w-full" />
            <button type="submit" class="bg-red-400 px-4 py-2 rounded text-white font-bold">Eliminar Categoría</button>
        </form>
    `;
}

function submitEliminarCategoria(e) {
    e.preventDefault();
    const id = e.target.id.value;
    if (!confirm("¿Seguro que desea eliminar la categoría?")) return;
    fetch(`/api/categorias/${id}`, { method: 'DELETE' })
        .then(resp => {
            if (!resp.ok) throw new Error();
            alert("Categoría eliminada");
            renderListarCategorias();
        })
        .catch(() => alert("Error al eliminar categoría"));
}

/* --------- CARRITO (3) --------- */
function renderCarrito(seccion) {
    seccion.innerHTML = `
        <h2 class='text-2xl font-bold text-yellow-700 mb-4 text-center'>— Carrito de Compras —</h2>
        <div class="space-y-2 mb-4 flex flex-col max-w-xl mx-auto">
            <button onclick="renderAgregarAlCarrito()" class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">a) Agregar producto al carrito</button>
            <button onclick="renderListarCarrito()" class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">b) Ver carrito</button>
            <button onclick="vaciarCarrito()" class="bg-red-300 hover:bg-red-400 px-4 py-2 rounded">c) Vaciar carrito</button>
        </div>
        <div id="contenidoCarrito"></div>
    `;
}

function renderAgregarAlCarrito() {
    document.getElementById("contenidoCarrito").innerHTML = `
        <form onsubmit="submitAgregarAlCarrito(event)" class="space-y-2">
            <input name="productoId" placeholder="ID del producto" type="number" required class="border p-2 w-full" />
            <input name="cantidad" placeholder="Cantidad" type="number" min="1" required class="border p-2 w-full" />
            <button type="submit" class="bg-green-400 px-4 py-2 rounded text-white font-bold">Agregar al carrito</button>
        </form>
    `;
}

function submitAgregarAlCarrito(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const item = Object.fromEntries(fd.entries());
    item.cantidad = parseInt(item.cantidad);
    fetch('/api/carrito/items', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
    })
    .then(r => {
        if (!r.ok) throw new Error();
        alert("Producto agregado al carrito");
        renderListarCarrito();
    })
    .catch(() => alert("Error al agregar al carrito"));
}

function renderListarCarrito() {
    fetch('/api/carrito')
        .then(r => r.json())
        .then(datos => {
            const html = datos.items?.map(i => `
                <div class="bg-white p-3 rounded shadow mb-2">
                    <div>Producto ID: ${i.productoId}</div>
                    <div>Cantidad: ${i.cantidad}</div>
                    <div>Subtotal: $${i.subtotal}</div>
                </div>
            `).join('') || "<div>El carrito está vacío.</div>";
            const total = datos.total ?? 0;
            document.getElementById("contenidoCarrito").innerHTML = `
                ${html}
                <div class="mt-4 font-bold">Total: $${total}</div>
            `;
        });
}

function vaciarCarrito() {
    if (!confirm("¿Vaciar carrito?")) return;
    fetch('/api/carrito', { method: 'DELETE' })
        .then(r => {
            if (!r.ok) throw new Error();
            alert("Carrito vaciado");
            renderListarCarrito();
        })
        .catch(() => alert("Error al vaciar carrito"));
}

/* --------- REALIZAR PEDIDO (4) --------- */
function renderRealizarPedido(seccion) {
    seccion.innerHTML = `
        <h2 class='text-2xl font-bold text-green-700 mb-4 text-center'>— Realizar Pedido —</h2>
        <div class="max-w-xl mx-auto space-y-4">
            <p>Al confirmar, se creará un pedido con los productos del carrito.</p>
            <form onsubmit="submitRealizarPedido(event)" class="space-y-2">
                <input name="usuarioId" placeholder="ID del usuario" type="number" required class="border p-2 w-full" />
                <button type="submit" class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white font-bold">Confirmar Pedido</button>
            </form>
            <div id="resultadoRealizarPedido"></div>
        </div>
    `;
}

function submitRealizarPedido(e) {
    e.preventDefault();
    const usuarioId = parseInt(e.target.usuarioId.value);
    fetch('/api/pedidos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ usuarioId })
    })
    .then(r => {
        if (!r.ok) throw new Error();
        return r.json();
    })
    .then(pedido => {
        document.getElementById("resultadoRealizarPedido").innerHTML = `
            <div class="bg-white p-4 rounded shadow mt-4">
                <div>Pedido ID: ${pedido.id}</div>
                <div>Estado: ${pedido.estado}</div>
                <div>Total: $${pedido.costoTotal}</div>
            </div>
        `;
        alert("Pedido creado correctamente");
    })
    .catch(() => {
        document.getElementById("resultadoRealizarPedido").innerHTML =
            "<div class='text-red-500 mt-2'>No se pudo crear el pedido (revise stock o datos).</div>";
    });
}

/* --------- HISTORIAL PEDIDOS (5) --------- */
function renderHistorialPedidos(seccion) {
    seccion.innerHTML = `
        <h2 class='text-2xl font-bold text-blue-700 mb-4 text-center'>— Historial de Pedidos —</h2>
        <div class="max-w-xl mx-auto space-y-4">
            <form onsubmit="submitHistorialPedidos(event)" class="space-y-2">
                <input name="usuarioId" placeholder="ID del usuario" type="number" required class="border p-2 w-full" />
                <button type="submit" class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white font-bold">Ver historial</button>
            </form>
            <div id="contenidoHistorialPedidos"></div>
        </div>
    `;
}

function submitHistorialPedidos(e) {
    e.preventDefault();
    const usuarioId = e.target.usuarioId.value;
    fetch(`/api/usuarios/${usuarioId}/pedidos`)
        .then(r => r.json())
        .then(pedidos => {
            const html = pedidos.map(p => `
                <div class="bg-white p-4 rounded shadow mb-2">
                    <div>Pedido ID: ${p.id}</div>
                    <div>Fecha: ${p.fecha ?? ""}</div>
                    <div>Estado: ${p.estado}</div>
                    <div>Total: $${p.costoTotal}</div>
                </div>
            `).join('') || "<div>No hay pedidos para este usuario.</div>";
            document.getElementById("contenidoHistorialPedidos").innerHTML = html;
        });
}

/* --------- ADMINISTRACIÓN (6) --------- */
function renderAdministracion(seccion) {
    seccion.innerHTML = `
        <h2 class='text-2xl font-bold text-gray-700 mb-4 text-center'>— Administración —</h2>
        <div class="grid md:grid-cols-2 gap-6">
            <div>
                <h3 class="font-bold mb-2">Usuarios</h3>
                <form onsubmit="submitCrearUsuario(event)" class="space-y-2">
                    <input name="nombre" placeholder="Nombre" required class="border p-2 w-full" />
                    <input name="email" placeholder="Email" type="email" required class="border p-2 w-full" />
                    <button type="submit" class="bg-green-500 px-4 py-2 rounded text-white font-bold">Crear Usuario</button>
                </form>
                <div id="resultadoAdminUsuario" class="mt-2 text-sm text-gray-700"></div>
            </div>
            <div>
                <h3 class="font-bold mb-2">Ajustar stock</h3>
                <form onsubmit="submitAjustarStock(event)" class="space-y-2">
                    <input name="productoId" placeholder="ID del producto" type="number" required class="border p-2 w-full" />
                    <input name="nuevoStock" placeholder="Nuevo stock" type="number" min="0" required class="border p-2 w-full" />
                    <button type="submit" class="bg-yellow-500 px-4 py-2 rounded text-white font-bold">Actualizar Stock</button>
                </form>
                <div id="resultadoAdminStock" class="mt-2 text-sm text-gray-700"></div>
            </div>
        </div>
    `;
}

function submitCrearUsuario(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const usuario = Object.fromEntries(fd.entries());
    fetch('/api/usuarios', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(usuario)
    })
    .then(r => r.json())
    .then(u => {
        document.getElementById("resultadoAdminUsuario").innerHTML =
            `Usuario creado con ID ${u.id}`;
    })
    .catch(() =>
        document.getElementById("resultadoAdminUsuario").innerHTML =
            "Error al crear usuario"
    );
}

function submitAjustarStock(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const productoId = fd.get("productoId");
    const nuevoStock = parseInt(fd.get("nuevoStock"));
    fetch(`/api/productos/${productoId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ stock: nuevoStock })
    })
    .then(r => {
        if (!r.ok) throw new Error();
        return r.json();
    })
    .then(() => {
        document.getElementById("resultadoAdminStock").innerHTML =
            "Stock actualizado correctamente";
    })
    .catch(() =>
        document.getElementById("resultadoAdminStock").innerHTML =
            "Error al actualizar stock"
    );
}

// Mostrar menú principal al iniciar
mostrarSeccion('menuPrincipal');
