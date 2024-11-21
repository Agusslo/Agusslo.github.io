document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productNameInput = document.getElementById('product-name');
    const productQuantityInput = document.getElementById('product-quantity');
    const productTableBody = document.getElementById('product-table-body');

    function loadProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.forEach(product => addProductToTable(product));
    }

    function saveProduct(product) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
    }

    function addProductToTable(product) {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const quantityCell = document.createElement('td');
        const actionsCell = document.createElement('td');

        nameCell.textContent = product.name;
        quantityCell.textContent = product.quantity;

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

    function removeProductFromStorage(productName) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products = products.filter(product => product.name !== productName);
        localStorage.setItem('products', JSON.stringify(products));
    }

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
