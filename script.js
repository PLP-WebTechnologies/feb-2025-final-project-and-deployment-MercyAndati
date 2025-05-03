// script.js - Global cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in navbar
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.setAttribute('data-count', count || '');
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add to cart function (shared across pages)
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({...product, quantity});
        }
        saveCart();
        updateCartCount();
        alert(`${product.name} added to cart!`);
        return true;
    }
    return false;
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);

// Update cart count display
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.setAttribute('data-count', count || '');
    }
}
// Load cart from localStorage when script loads
function loadCart() {
    const savedCart = localStorage.getItem('nourishEatsCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCartCount();
});

// Function to display featured products on homepage
function displayFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;

    // Get 10 random products 
    const featuredProducts = [...products]
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);

    featuredContainer.innerHTML = '';

    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
            </a>
            <button class="add-to-cart" data-id="${product.id}">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
        `;
        featuredContainer.appendChild(productCard);
    });

    // Add event listeners to featured product "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.getAttribute('data-id'));
            if (addToCart(productId)) {
                alert('Product added to cart!');
            }
        });
    });
}

// Initialize featured products when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    displayFeaturedProducts();
});

// Function to show the back-to-top button when scrolling down
function ToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
});}
