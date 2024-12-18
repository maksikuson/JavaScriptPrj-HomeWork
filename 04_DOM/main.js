function addProduct(name, imageUrl) {
    const productContainer = document.getElementById('product-container');

    const product = document.createElement('div');
    product.className = 'product';

    const imageDiv = document.createElement('div');
    imageDiv.className = 'image';

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = name;
    img.width = 190;
    img.height = 190;

    const p = document.createElement('p');
    p.textContent = name;

    imageDiv.appendChild(img);
    imageDiv.appendChild(p);
    product.appendChild(imageDiv);

    productContainer.appendChild(product);
}