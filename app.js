document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productNameInput = document.getElementById('product-name');
    const productQuantityInput = document.getElementById('product-quantity');
    const productTableBody = document.getElementById('product-table-body');

    productForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const productName = productNameInput.value.trim();
        const productQuantity = parseInt(productQuantityInput.value.trim());

        if (productName && !isNaN(productQuantity)) {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const quantityCell = document.createElement('td');

            nameCell.textContent = productName;
            quantityCell.textContent = productQuantity;

            row.appendChild(nameCell);
            row.appendChild(quantityCell);

            productTableBody.appendChild(row);

            // Limpiar los campos del formulario
            productNameInput.value = '';
            productQuantityInput.value = '';
        }
    });
});
