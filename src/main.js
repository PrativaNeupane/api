import axios from "axios";

document.addEventListener("DOMContentLoaded", () => {
  const product_container = document.querySelector("#product_container");
  const loader = document.querySelector("#loader"); // Select loader

  // Show loader before fetching data
  loader.style.display = "block";

  axios
    .get("https://api.freeapi.app/api/v1/public/randomproducts?")
    .then((feedback) => {
      const items = feedback.data.data.data;

      // Create an array to track image loading
      let imagesLoaded = 0;

      items.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const cardImg = document.createElement("div");
        cardImg.classList.add("img-container");

        // Create image element
        const productImage = document.createElement("img");
        productImage.setAttribute("src", product.thumbnail);
        productImage.classList.add("product-image");

        // Hide loader when all images are loaded
        productImage.onload = () => {
          imagesLoaded++;
          if (imagesLoaded === items.length) {
            loader.style.display = "none"; // Hide loader when all images are loaded
          }
        };

        cardImg.appendChild(productImage);

        const cardDesc = document.createElement("div");
        const productTitle = document.createElement("h2");
        productTitle.textContent = product.title;
        productTitle.classList.add("product-title");
        cardDesc.appendChild(productTitle);

        const productPrice = document.createElement("p");
        productPrice.textContent = `$${product.price}`;
        productPrice.classList.add("product-price");
        cardDesc.appendChild(productPrice);

        card.appendChild(cardImg);
        card.appendChild(cardDesc);
        product_container.appendChild(card);
      });
    })
    .catch((err) => {
      console.log(err);
      loader.style.display = "none"; // Hide loader if there's an error
    });
});
