import axios from "axios";
document.addEventListener("DOMContentLoaded", () => {
  const product_container = document.querySelector("#product_container");
  const productPromise = axios.get(
    "https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=10&inc=category%252Cprice%252Cthumbnail%252Cimages%252Ctitle%252Cid&query=mens-watches"
  );
  productPromise
    .then((feedback) => {
      const items = feedback.data.data.data;
      // console.log(feedback);
      items.map((product) => {
        // console.log(product);
        const card = document.createElement("div");
        card.classList.add("card");
        const cardImg = document.createElement("div");
        //image fetched
        const productImage = document.createElement("img");
        productImage.setAttribute("src", product.thumbnail);
        cardImg.appendChild(productImage);
        productImage.classList.add("product-image");
        // card.classList.add("card");

        //fetched title
        const cardDesc = document.createElement("div");
        const productTitle = document.createElement("h2");
        productTitle.textContent = product.title;
        cardDesc.appendChild(productTitle);
        productTitle.classList.add("product-title");
        //title
        const productPrice = document.createElement("p");
        productPrice.textContent = product.price;
        productPrice.classList.add("product-price");
        cardDesc.appendChild(productPrice);

        card.appendChild(cardImg);
        card.appendChild(cardDesc);

        product_container.appendChild(card);
      });
    })
    .catch((err) => console.log(err));
});
