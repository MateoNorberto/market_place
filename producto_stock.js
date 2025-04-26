function agregarAlCarrito(nombre, cantidad, precio) {
    const carritoTabla = document.querySelector('#cart tbody');
    const total = cantidad * precio;

    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td><input type="checkbox"></td>
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>s/${precio}</td>
        <td>s/${total}</td>
        <td><button onclick="eliminarDelCarrito(this)">Eliminar</button></td>
    `;

    carritoTabla.appendChild(fila);
}

function eliminarDelCarrito(boton) {
    const fila = boton.closest('tr');
    fila.remove();
}
// Modo Oscuro
document.getElementById('toggle-theme').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});

// Calificación de Productos
document.querySelectorAll('.rating span').forEach(star => {
    star.addEventListener('click', function () {
        const rating = parseInt(this.dataset.value);
        const averageRatingElement = this.closest('.producto').querySelector('.average-rating');
        let currentRating = parseFloat(averageRatingElement.textContent);
        currentRating = (currentRating + rating) / 2;
        averageRatingElement.textContent = currentRating.toFixed(1);
    });
});

// Filtrar Productos
document.querySelector('#filters form').addEventListener('submit', function (e) {
    e.preventDefault();
    const category = document.querySelector('#category').value;
    const size = document.querySelector('#size').value;
    const color = document.querySelector('#color').value.toLowerCase();
    const price = parseFloat(document.querySelector('#price').value);

    document.querySelectorAll('.producto').forEach(producto => {
        const productCategory = producto.dataset.category || '';
        const productSize = producto.querySelector('p:contains("Tallas")').textContent;
        const productColor = producto.querySelector('p:contains("Colores")').textContent.toLowerCase();
        const productPrice = parseFloat(producto.querySelector('p:contains("Precio")').textContent.match(/s\/(\d+)/)[1]);

        if ((category && productCategory !== category) ||
            (size && !productSize.includes(size)) ||
            (color && !productColor.includes(color)) ||
            (price && productPrice > price)) {
            producto.style.display = 'none';
        } else {
            producto.style.display = 'block';
        }
    });
});
//funcion para agregar productos al carrito 
function comprarSeleccionados() {
    const selectedItems = document.querySelectorAll('tbody tr input[type="checkbox"]:checked');
    if (selectedItems.length === 0) {
        alert('Por favor, seleccione al menos un producto para comprar.');
        return;
    }

    let outOfStockItems = []; // Lista para productos sin stock

    selectedItems.forEach(item => {
        const row = item.closest('tr');
        const stock = parseInt(row.dataset.stock, 10);

        if (stock > 0) {
            row.dataset.stock = stock - 1; // Reduce el stock
        } else {
            outOfStockItems.push(row); // Agrega a la lista de productos sin stock
        }
    });

     {
        alert('Compra realizada con éxito.');
    }
}