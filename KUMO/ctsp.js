// Lấy id của sản phẩm từ URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Sử dụng id để lấy thông tin chi tiết sản phẩm từ JSON Server
fetch(`http://localhost:3000/products/${productId}`)
    .then(response => response.json())
    .then(data => {
        displayProductDetails(data);
    })
    .catch(error => console.error('Lỗi khi lấy thông tin chi tiết sản phẩm:', error));

function displayProductDetails(product) {
    // Hiển thị thông tin chi tiết sản phẩm
    document.querySelector('.small-container.signle-product .rows').innerHTML = `
        <div class="col-2">
            <img src="${product.img}" alt="${product.name}" width="100%">
            </div>
        <div class="col-2">
            <p>Trang chủ/${product.name} </p>
            <h1>${product.name}</h1>
            <h4>${product.price}.000 VND</h4>
            <select>
                <option>Chọn theo size</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
                <option>XXL</option>
            </select>
            <input type="number" value="1">
            <a href="" class="btn">Mua ngay</a>
            <h3>Chi tiết sản phẩm</h3>
            <p>Sản phẩm ${product.name} là 1 sản phẩm có chất lượng đến từ Việt Nam với chất liệu vải dày hợp với phong cách của giới trẻ hiện nay. </p>
        </div>`;
}
