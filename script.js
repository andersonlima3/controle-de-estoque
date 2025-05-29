const productsContainer = document.getElementById("productsContainer");
const addProductForm = document.getElementById("addProductForm");
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

let products = JSON.parse(localStorage.getItem("products")) || [];

function renderProducts() {
  productsContainer.innerHTML = "";

  products.forEach((product, index) => {
    const item = document.createElement("div");
    item.className = "portfolio-item";
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <h3>${product.name}</h3>
        <p><strong>Quantidade:</strong> ${product.quantity}</p>
        <p><strong>Preço:</strong> R$ ${Number(product.price).toFixed(2)}</p>
      </div>
      <div class="product-actions">
        <button class="edit-btn" onclick="editProduct(${index})">Editar</button>
        <button class="delete-btn" onclick="deleteProduct(${index})">Remover</button>
      </div>
    `;
    productsContainer.appendChild(item);
  });
}

function addProduct(e) {
  e.preventDefault();

  const name = document.getElementById("productName").value.trim();
  const image = document.getElementById("productImage").value.trim();
  const quantity = document.getElementById("productQuantity").value.trim();
  const price = document.getElementById("productPrice").value.trim();

  if (!name || !image || !quantity || !price) {
    alert("Preencha todos os campos!");
    return;
  }

  products.push({ name, image, quantity, price });
  saveAndRender();
  addProductForm.reset();
}

function deleteProduct(index) {
  if (confirm("Tem certeza que deseja remover este produto?")) {
    products.splice(index, 1);
    saveAndRender();
  }
}

function editProduct(index) {
  const product = products[index];

  document.getElementById("productName").value = product.name;
  document.getElementById("productImage").value = product.image;
  document.getElementById("productQuantity").value = product.quantity;
  document.getElementById("productPrice").value = product.price;

  products.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

// Inicializa a lista com os produtos do localStorage
renderProducts();

// Listener para adicionar produtos
addProductForm.addEventListener("submit", addProduct);

// Função para mudar abas
tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active de todos
    tabButtons.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));

    // Ativa a aba clicada
    btn.classList.add("active");
    const tab = btn.getAttribute("data-tab");
    document.getElementById(tab).classList.add("active");
  });
});
