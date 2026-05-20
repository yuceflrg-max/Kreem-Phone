const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const productSearch = document.querySelector("#productSearch");
const visibleCount = document.querySelector("#visibleCount");

let activeFilter = "all";

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    updateProducts();
  });
});

productSearch.addEventListener("input", updateProducts);

function updateProducts() {
  const query = productSearch.value.trim().toLowerCase();
  let count = 0;

  productCards.forEach((card) => {
    const categoryMatch = activeFilter === "all" || card.dataset.category === activeFilter;
    const textMatch = card.innerText.toLowerCase().includes(query);
    const shouldShow = categoryMatch && textMatch;

    card.classList.toggle("hidden", !shouldShow);
    if (shouldShow) count += 1;
  });

  visibleCount.textContent = String(count);
}
