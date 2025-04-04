document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartIcon = document.getElementById("cart-icon");
    const cartModal = document.getElementById("cart-modal");
    const closeCart = document.getElementById("close-cart");
    const cartItems = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");
    const cartCount = document.getElementById("cart-count");

    // Scroll to menu when clicked
    document.querySelector('a[href="#menu"]').addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
    });

    // Add item to cart
    document.querySelectorAll(".order-btn").forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = parseFloat(button.getAttribute("data-price"));

            cart.push({ name, price });
            updateCart();
        });
    });

    // Update Cart UI
    function updateCart() {
        cartItems.innerHTML = "";
        let totalPrice = 0;
        
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${item.name} - $${item.price.toFixed(2)} 
                            <button class="remove-btn" data-index="${index}">❌</button>`;
            cartItems.appendChild(li);
            totalPrice += item.price;
        });

        totalPriceEl.textContent = `Total: $${totalPrice.toFixed(2)}`;
        cartCount.textContent = cart.length;
        attachRemoveEvent();
    }

    // Remove item from cart
    function attachRemoveEvent() {
        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", () => {
                const index = button.getAttribute("data-index");
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    // Show and hide cart modal
    cartIcon.addEventListener("click", () => {
        cartModal.style.display = "block";
    });

    closeCart.addEventListener("click", () => {
        cartModal.style.display = "none";
    });
});
