// get DOM elements
const searchInput = document.querySelector("#search");

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

function renderProducts(_products, _filters) {
  const filteredProducts = _products.filter((p) => {
    return p.title.toLowerCase().includes(_filters.searchItem.toLowerCase());
  });
}
