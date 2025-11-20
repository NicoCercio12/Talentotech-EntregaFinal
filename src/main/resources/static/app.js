// MENÚ y navegação principal
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
            seccion.innerHTML = `<h2 class="text-xl font-semibold mt-6">Selecciona una opción del menú.</h2>`;
    }
}

/* ----------- Productos ----------- */
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
    .then(resp => resp.json())
    .then(res => {
        alert("Producto guardado correctamente");
        renderListarProductos();
    })
    .catch(() => alert("Error al guardar producto"));
}

// Buscador de producto por ID (BÁSICO)
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

// Las siguientes son funciones de ejemplo vacías para completar luego
function renderActualizarProducto() {
    document.getElementById("contenidoProducto").innerHTML = `
        <p>Aquí irá el formulario para actualizar productos (lógica a implementar).</p>
    `;
}
function renderEliminarProducto() {
    document.getElementById("contenidoProducto").innerHTML = `
        <p>Aquí irá el formulario para eliminar productos (lógica a implementar).</p>
    `;
}

/* --------- SECCIONES EXTRAS --------- */
function renderGestionCategorias(seccion) {
    seccion.innerHTML = "<h2 class='text-2xl font-bold text-purple-700 mb-4 text-center'>— Gestión de Categorías —</h2><p>Acá irá la gestión de categorías.</p>";
}
function renderCarrito(seccion) {
    seccion.innerHTML = "<h2 class='text-2xl font-bold text-yellow-700 mb-4 text-center'>— Carrito de Compras —</h2><p>Acá irá el listado de productos agregados al carrito y acciones.</p>";
}
function renderRealizarPedido(seccion) {
    seccion.innerHTML = "<h2 class='text-2xl font-bold text-green-700 mb-4 text-center'>— Realizar Pedido —</h2><p>Acá irá el formulario para realizar el pedido.</p>";
}
function renderHistorialPedidos(seccion) {
    seccion.innerHTML = "<h2 class='text-2xl font-bold text-blue-700 mb-4 text-center'>— Historial de Pedidos —</h2><p>Acá aparecerán los pedidos realizados por el usuario.</p>";
}
function renderAdministracion(seccion) {
    seccion.innerHTML = "<h2 class='text-2xl font-bold text-gray-700 mb-4 text-center'>— Administración —</h2><p>Gestión avanzada de usuarios y stock aquí.</p>";
}

// Mostrar menú principal de inicio al cargar
mostrarSeccion('menuPrincipal');
