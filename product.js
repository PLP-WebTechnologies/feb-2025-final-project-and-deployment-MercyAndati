// product.js - Product page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    // Find the product
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        window.location.href = 'shop.html';
        return;
    }

    // Display product details
    document.getElementById('product-detail-image').src = product.image;
    document.getElementById('product-detail-image').alt = product.name;
    document.getElementById('product-detail-name').textContent = product.name;
    document.getElementById('product-detail-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('product-detail-description').textContent = product.description;
    
    // Set breadcrumb
    document.getElementById('product-name-breadcrumb').textContent = product.name;
    
    // Show certified badge if applicable
    if (!product.certified) {
        document.getElementById('certified-badge').style.display = 'none';
    }

    // Add to cart button functionality
    document.getElementById('add-to-cart-btn').addEventListener('click', function() {
        const quantity = parseInt(document.getElementById('quantity').value) || 1;
        if (addToCart(product.id, quantity)) {
            alert(`${quantity} ${product.name}(s) added to cart!`);
        }
    });

    // Load related products
    loadRelatedProducts(product);
});

function loadRelatedProducts(currentProduct) {
    const relatedContainer = document.getElementById('related-products');
    if (!relatedContainer) return;
    
    const relatedProducts = products.filter(p => 
        p.category === currentProduct.category && 
        p.id !== currentProduct.id
    ).slice(0, 4);
    
    if (relatedProducts.length === 0) {
        relatedContainer.innerHTML = '<p>No related products found</p>';
        return;
    }
    
    relatedContainer.innerHTML = '';
    
    relatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
            </a>
            <button class="add-to-cart" data-id="${product.id}">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
        `;
        relatedContainer.appendChild(productCard);
    });
    
    // Add event listeners to related product "Add to Cart" buttons
    document.querySelectorAll('#related-products .add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.getAttribute('data-id'));
            if (addToCart(productId)) {
                alert('Product added to cart!');
            }
        });
    });
}