document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector('.table-data tbody');

    function createProductRow(product, index) {
        return `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${product.img}" alt=""></td>
                <td>${product.name}</td>
                <td>${product.price}.000VND</td>
                <td>
                    <button class="status completed edit-btn" data-id="${product.id}">Sửa</button>
                    <button class="status completed delete-btn" data-id="${product.id}">Xóa</button>
                </td>
            </tr>
        `;
    }

    function loadProducts() {
        fetch('http://localhost:3000/products') 
            .then(response => response.json()) 
            .then(data => {
                tableBody.innerHTML = '';
                data.forEach((product, index) => {
                    const row = createProductRow(product, index);
                    tableBody.innerHTML += row; 
                });
            })
            .catch(error => console.error('Error:', error));
    }

    tableBody.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('delete-btn')) {
            const productId = target.dataset.id;
            if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
                fetch(`http://localhost:3000/products/${productId}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Xóa sản phẩm không thành công');
                    }
                    return response.json();
                })
                .then(() => {
                    alert('Đã xóa sản phẩm thành công');
                    loadProducts();
                })
                .catch(error => {
                    console.error('Lỗi:', error);
                    alert('Đã xảy ra lỗi khi xóa sản phẩm');
                });
            }
        } else if (target.classList.contains('edit-btn')) {
            const productId = target.dataset.id;
            const productRow = target.closest('tr');
            const productName = productRow.querySelector('td:nth-child(3)').textContent;
            const productPrice = productRow.querySelector('td:nth-child(4)').textContent;
            const productImage = productRow.querySelector('img').getAttribute('src');

            const editProductForm = document.getElementById('editProductForm');
            editProductForm.style.display = 'block';
            editProductForm.querySelector('#editProductName').value = productName;
            editProductForm.querySelector('#editProductPrice').value = productPrice;
            editProductForm.querySelector('#editProductImage').setAttribute('src', productImage);

            editProductForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const updatedProductName = document.getElementById('editProductName').value;
                const updatedProductPrice = document.getElementById('editProductPrice').value;
                const updatedProductImageInput = document.getElementById('editProductImage');
                const updatedProductImageFile = updatedProductImageInput.files[0];

                const reader = new FileReader();
                reader.readAsDataURL(updatedProductImageFile);
                reader.onload = function() {
                    const updatedProductImage = reader.result;

                    const updatedProduct = {
                        name: updatedProductName,
                        price: updatedProductPrice,
                        img: updatedProductImage
                    };

                    fetch(`http://localhost:3000/products/${productId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedProduct)
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Sửa sản phẩm không thành công');
                        }
                        return response.json();
                    })
                    .then(() => {
                        alert('Đã sửa sản phẩm thành công');
                        loadProducts();
                        editProductForm.reset();
                        editProductForm.style.display = 'none';
                    })
                    .catch(error => {
                        console.error('Lỗi:', error);
                        alert('Đã xảy ra lỗi khi sửa sản phẩm');
                    });
                };
            });
        }
    });

    document.getElementById('toggleProductForm').addEventListener('click', function(event) {
        const addProductForm = document.getElementById('addProductForm');
        addProductForm.style.display = addProductForm.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('addProductForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const productName = document.getElementById('productName').value;
        const productImageInput = document.getElementById('productImage');
        const productPrice = document.getElementById('productPrice').value;
        const productImageFile = productImageInput.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(productImageFile);
        reader.onload = function() {
            const productImage = reader.result;

            const newProduct = {
                name: productName,
                img: productImage,
                price: productPrice
            };

            fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Thêm sản phẩm không thành công');
                }
                return response.json();
            })
            .then(() => {
                alert('Đã thêm sản phẩm thành công');
                window.location.href = 'sanpham.html';
                loadProducts();
                document.getElementById('addProductForm').reset();
            })
            .catch(error => {
                console.error('Lỗi:', error);
                alert('Đã xảy ra lỗi khi thêm sản phẩm');
            });
        };
    });

    loadProducts();
});

