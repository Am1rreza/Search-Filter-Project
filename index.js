// get DOM elements
const searchInput = document.querySelector("#search");
const productsDOM = document.querySelector(".product-center");

// global variables
let allProductsData = [];
const filters = {
  searchItem: "",
};

// event listeners
document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
      allProductsData = res.data;
      // render products on DOM
      renderProducts(res.data, filters);
    })
    .catch((err) => console.log(err));
});

searchInput.addEventListener("input", (e) => {
  filters.searchItem = e.target.value;
  renderProducts(allProductsData, filters);
});

// functions
function renderProducts(_products, _filters) {
  const filteredProducts = _products.filter((p) => {
    return p.title.toLowerCase().includes(_filters.searchItem.toLowerCase());
  });
  // clear DOM from last products
  productsDOM.innerHTML = "";
  // render to DOM
  filteredProducts.forEach((item) => {
    // create
    const productsDiv = document.createElement("div");
    productsDiv.classList.add("product");
    // add content
    productsDiv.innerHTML = `<div class="img-container">
    <img class="product-img" src="${item.image}" alt="p-${item.id}" />
  </div>
  <div class="product-desc">
    <p class="product-price">${item.price}$</p>
    <p class="product-title">${item.title}</p>
  </div>`;
    // append to DOM
    productsDOM.appendChild(productsDiv);
  });
}
