document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productNameInput = document.getElementById('product-name');
    const productQuantityInput = document.getElementById('product-quantity');
    const productTableBody = document.getElementById('product-table-body');

    // Cargar productos desde localStorage y mostrarlos en la tabla
    function loadProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.forEach(product => addProductToTable(product));
    }

    // Guardar producto en localStorage
    function saveProduct(product) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Agregar producto a la tabla
    function addProductToTable(product) {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const quantityCell = document.createElement('td');
        const actionsCell = document.createElement('td');

        nameCell.textContent = product.name;
        quantityCell.textContent = product.quantity;

        // Botón para eliminar producto
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            row.remove();
            removeProductFromStorage(product.name);
        });

        actionsCell.appendChild(deleteButton);
        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        row.appendChild(actionsCell);

        productTableBody.appendChild(row);
    }

    // Eliminar producto de localStorage
    function removeProductFromStorage(productName) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products = products.filter(product => product.name !== productName);
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Manejar el envío del formulario
    productForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const productName = productNameInput.value.trim();
        const productQuantity = parseInt(productQuantityInput.value.trim());

        if (productName && !isNaN(productQuantity)) {
            const product = { name: productName, quantity: productQuantity };
            addProductToTable(product);
            saveProduct(product);

            // Limpiar los campos del formulario
            productNameInput.value = '';
            productQuantityInput.value = '';
        }
    });

    loadProducts();
});
