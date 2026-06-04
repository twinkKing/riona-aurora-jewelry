function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(name, price, image) {
  const cart = getCart();

  const existingProduct = cart.find(item => item.name === name);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image,
      quantity: 1
    });
  }

  saveCart(cart);
  alert(name + " wurde zum Warenkorb hinzugefügt.");
}

function removeFromCart(name) {
  let cart = getCart();
  cart = cart.filter(item => item.name !== name);
  saveCart(cart);
  renderCart();
}

function clearCart() {
  localStorage.removeItem("cart");
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) return;

  const cart = getCart();
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartCount.textContent = totalQuantity;
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItems || !cartTotal) return;

  const cart = getCart();

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <h3>Dein Warenkorb ist leer.</h3>
        <p>Gehe zurück zum Shop und füge ein Produkt hinzu.</p>
      </div>
    `;
    cartTotal.textContent = "CHF 0.00";
    return;
  }

  let total = 0;

  cartItems.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h3>${item.name}</h3>
          <p>Preis: CHF ${item.price.toFixed(2)}</p>
          <p>Menge: ${item.quantity}</p>
          <p>Zwischentotal: CHF ${itemTotal.toFixed(2)}</p>
        </div>
        <button class="remove-btn" onclick="removeFromCart('${item.name}')">Entfernen</button>
      </div>
    `;
  }).join("");

  cartTotal.textContent = "CHF " + total.toFixed(2);
}

updateCartCount();
renderCart();
