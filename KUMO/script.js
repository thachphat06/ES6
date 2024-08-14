document.querySelector(".sidebar").style.display = "none";

function showgiohang() {
    var x = document.querySelector(".sidebar");
    if (x.style.display == "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}
loadCartUI()


const categories = [...new Set(products.map(item => item.promotion))];

document.getElementById('aa').innerHTML = products.map((item, index) => {
    var { name, price, img, promotion, status } = item;
    return `<div class="products" data-category="${promotion}">
        <div class="row">
            <a href="products-details.html"><img src="${img}" alt=""></a>
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
                <button class='btn' onclick='addcart(${index})'>Thêm Vào Giỏ Hàng</button>
            </div>
        </div>
    </div>`;
}).join('');

var cart = [];

function addcart(index) {
    const selectedProduct = products[index];
    const existingProduct = cart.find(item => item.id === selectedProduct.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...selectedProduct, quantity: 1 });
    }

    displaycart();
}

function delcart(index) {
    cart.splice(index, 1);
    displaycart();
}

function displaycart() {
    let j = 0;
    let tong = 0;
    document.getElementById('count').innerHTML = cart.length;

    if (cart.length === 0) {
        document.getElementById('cartItem').innerHTML = "Giỏ Hàng Trống";
        document.getElementById('tt').innerHTML = tong + " VND";
    } else {
        document.getElementById('cartItem').innerHTML = cart.map((item, index) => {
            var { name, price, img, quantity } = item;
            tong += price * quantity;
            return (
                `<div class="cart-item">
                    <div class="row-img">
                        <img class='rowing' src="${img}">
                    </div>
                    <p style='font-size: 14px'>${name}</p>
                    <h2 style='font-size: 12px'>${price * quantity}.000 VND</h2>
                    <p style='font-size: 12px'>Số lượng: ${quantity}</p>
                    <i class='fa-solid fa-trash-can' onclick='delcart(${index})'></i>
                </div>`
            );
        }).join('');

        document.getElementById('tt').innerHTML = tong + ".000 VND";
    }
}

function displayProducts(products) {
    let i = 0;
    document.getElementById('aa').innerHTML = products.map(item => {
        var { name, price, img, promotion, status } = item;
        return `<div class="products" data-category="${promotion}">
            <div class="row">
            <a href="products-details.html"><img src="${img}" alt=""></a>
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
                    <button class='btn' onclick='addcart(${i++})'>Thêm Vào Giỏ Hàng</button>
                </div>
            </div>
        </div>`;
    }).join('');
}

// Hiển thị ban đầu
displayProducts(products);


