document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productNameInput = document.getElementById('product-name');
    const productQuantityInput = document.getElementById('product-quantity');
    const productTableBody = document.getElementById('product-table-body');

    function loadProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        productTableBody.innerHTML = '';
        products.forEach(product => addProductToTable(product));
    }

    function saveProduct(product) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        const existingProductIndex = products.findIndex(p => p.name.toLowerCase() === product.name.toLowerCase());
        if (existingProductIndex !== -1) {
            products[existingProductIndex].quantity += product.quantity;
        } else {
            products.push(product);
        }
        localStorage.setItem('products', JSON.stringify(products));
    }

    function addProductToTable(product) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td><button class="eliminar">Eliminar</button></td>
        `;
        const deleteButton = row.querySelector('.eliminar');
        deleteButton.addEventListener('click', () => {
            row.remove();
            removeProductFromStorage(product.name);
        });
        productTableBody.appendChild(row);
    }

    function removeProductFromStorage(productName) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products = products.filter(product => product.name.toLowerCase() !== productName.toLowerCase());
        localStorage.setItem('products', JSON.stringify(products));
    }

    productForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const productName = productNameInput.value.trim();
        let productQuantity = parseInt(productQuantityInput.value.trim());
        if (productName && !isNaN(productQuantity) && productQuantity > 0) {
            const product = { name: productName, quantity: productQuantity };
            addProductToTable(product);
            saveProduct(product);
            productNameInput.value = '';
            productQuantityInput.value = '';
        } else {
            alert('Por favor, ingrese un nombre y una cantidad válidos.');
        }
    });

    loadProducts();
});
