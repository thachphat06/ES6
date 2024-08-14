fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(data => {
        products = data;
        console.log(products);
        displayProducts(products);
    })
    .catch(error => console.error('Lỗi khi lấy dữ liệu danh mục:', error));

function displayProducts(products) {
    document.getElementById('products').innerHTML = products.map(item => {
        let { id, name, price, img, promotion, status } = item;
        return `<div class="products" data-category="${promotion}">
            <div class="row">
            <a href="products-details.html?id=${id}"><img src="${img}" alt="${name}"> </a>
                <div class="products-text">
                    <h5>${promotion}</h5>
                </div>
                <div class="heart-icon">
                    <i class='bx bx-heart'></i>
                </div>
                <div class="ratting">
                    <i class='bx bx-star'></i>
                    <i class='bx bx-star'></i>
                    <i class='bx bx-star'></i>
                    <i class='bx bx-star'></i>
                    <i class='bx bxs-star-half'></i>
                </div>
                <div class="price">
                    <h4>${name}</h4>
                    <p>${price}.000 VND</p>
                    <button class='btn' onclick='addToCart("${id}","${name}","${price}","${img}")'>Thêm Vào Giỏ Hàng</button>
                </div>
            </div>
        </div>`;
    }).join('');
}

document.querySelector(".sidebar").style.display = "none";

function showgiohang() {
    var x = document.querySelector(".sidebar");
    if (x.style.display == "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}


function addToCart(id, name, price, img) {
    // Tạo một đối tượng để biểu diễn sản phẩm
    const product = {
        id: id,
        name: name,
        price: price,
        img: img,
        quantity: 1 // Số lượng mặc định khi thêm vào giỏ hàng
    };

    // Kiểm tra xem giỏ hàng đã tồn tại trong localStorage chưa
    let cart = localStorage.getItem('cart');
    if (!cart) {
        // Nếu chưa có, tạo một giỏ hàng mới và thêm sản phẩm vào đó
        cart = [];
        cart.push(product);
    } else {
        // Nếu đã có, chuyển đổi chuỗi JSON của giỏ hàng thành mảng
        cart = JSON.parse(cart);

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingProductIndex = cart.findIndex(item => item.id === id);
        if (existingProductIndex !== -1) {
            // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
            cart[existingProductIndex].quantity += 1;
        } else {
            // Nếu sản phẩm chưa tồn tại, thêm vào giỏ hàng
            cart.push(product);
        }
    }

    // Lưu giỏ hàng mới vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // In ra thông tin sản phẩm đã được thêm vào giỏ hàng (optional)
    console.log('Product added to cart:', product);
    loadCartUI()
}


function removeItem(id) {
    let cart = localStorage.getItem('cart');
    if (cart) {
        cart = JSON.parse(cart);
        const updatedCart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        loadCartUI();
        // Tính lại tổng tiền sau khi xóa sản phẩm
        updateTotalPrice(updatedCart);
    }
}

// Hàm tính lại tổng tiền
function updateTotalPrice(cart) {
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    document.getElementById('totalPrice').textContent = `Tổng Tiền: ${totalPrice}.000 VNĐ`;
}

// Thay đổi hàm loadCartUI để bao gồm nút "Xóa sản phẩm" và tính toán tổng tiền
// Hàm loadCartUI để hiển thị giỏ hàng
function loadCartUI() {
    const cartContainer = document.getElementById('cartContainer');
    let totalPrice = 0;

    let cart = localStorage.getItem('cart');
    if (!cart || JSON.parse(cart).length === 0) {
        cartContainer.innerHTML = "<p>Giỏ hàng của bạn trống!</p>";
    } else {
        cart = JSON.parse(cart);

        let cartHTML = "<div class='cart-items'>";
        cart.forEach(item => {
            const totalPricePerItem = item.price * item.quantity;
            totalPrice += totalPricePerItem;
            cartHTML += `
                <div class="cart-item">
                    <div class="row-img">
                        <img class='rowing' src="./${item.img}" alt="${item.name}">
                    </div>
                    <p class='name'>${item.name}</p>
                    <p class='price'>${item.price}.000 VND</p>
                    <p class='quantity'>Số lượng: ${item.quantity}</p>
                    <i class='fa-solid fa-trash-can' onclick='removeItem("${item.id}")'></i>
                </div>`;
        });
        cartHTML += "</div>";
        cartContainer.innerHTML = cartHTML;
        document.getElementById('totalPrice').textContent = `Tổng Tiền: ${totalPrice}.000 VNĐ`;
    }
}

