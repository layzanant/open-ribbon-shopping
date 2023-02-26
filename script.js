// List of all the products stored in a object
var products = [
  {
    id: "1",
    name: "Men's Grooming Kit",
    image: "assets/grooming kit.jpg",
    price: 150,
    orderQuantity: 0,
  },
  {
    id: "2",
    name: "Fossil Watch",
    image: "assets/watch.jpg",
    price: 1500,
    orderQuantity: 0,
  },
  {
    id: "3",
    name: "Wallet and Belt Combo",
    image: "assets/wallet and belt.jpg",
    price: 140,
    orderQuantity: 0,
  },
  {
    id: "4",
    name: "Men's Bracelet",
    image: "assets/bracelet.jpg",
    price: 10,
    orderQuantity: 0,
  },
  {
    id: "5",
    name: "Shoes for Men",
    image: "assets/shoes.jpg",
    price: 300,
    orderQuantity: 0,
  },
  {
    id: "6",
    name: "Stud Earrings for Men",
    image: "assets/stud earrings.jpg",
    price: 300,
    orderQuantity: 0,
  },
];

var cards = document.getElementById("cards");
var content = "";
let openedModalIndex = -1;
let finalOrder = []; // Array to store final order
let nameOnOrder = ""; // Name on the order

// Logic to display all the products
for (let i = 0; i < products.length; i++) {
  content += `<div class="card">
    <img src="${products[i].image}" width="250px" height="200px" alt="${products[i].name} image" />
    <div class="card-body product">
      <h5 class="card-title">${products[i].name}</h5>
      <p class="card-text">
        $${products[i].price}.00
      </p>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addToCartModal" id="${i}" onclick="openModal(${i})">Add to Cart</button>
    </div>
  </div>`;
}
cards.innerHTML = content;

// indexing of modal
function openModal(index) {
  openedModalIndex = index;
}

// Add to cart modal validation and logic
function addToCart() {
  const quantity = document.getElementById("quantity").value;
  if (quantity.trim() !== "" && +quantity === +quantity && quantity > 0) {
    products[openedModalIndex].orderQuantity = Number(quantity);
  } else {
    alert("Enter a valid quantity.");
  }
  setOpenedModalIndexDefault();
  showHideCheckoutButton();
}

// setting default index to -1
function setOpenedModalIndexDefault() {
  openedModalIndex = -1;
  document.getElementById("quantity").value = "";
}

/* checkout button show/hide based on the cart item count (checkout button won't be displayed,
 if the items in cart will be 0) */
function showHideCheckoutButton() {
  let checkoutButton = document.getElementById("checkoutButton");
  let flag = 0;
  for (let i = 0; i < products.length; i++) {
    if (products[i].orderQuantity > 0) {
      flag = 1;
    }
  }
  if (flag == 1) {
    checkoutButton.style.display = "block";
  } else {
    checkoutButton.style.display = "none";
  }
}

// function to make the name on order field blank on modal load
function onCheckoutClick() {
  document.getElementById("nameOnOrder").value = "";
}

// Function to prepare the final order and validation of name on order
function placeOrder() {
  nameOnOrder = document.getElementById("nameOnOrder").value;
  const regex = new RegExp("^[a-zA-Z_ ]*$");
  let totalQuantity = 0;
  finalOrder = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].orderQuantity > 0) {
      totalQuantity += products[i].orderQuantity;
      finalOrder.push(products[i]);
    }
  }
  if (totalQuantity > 0) {
    if (regex.test(nameOnOrder)) {
      $("#checkoutModal").modal("hide");
      $("#finalReceipt").modal("show");
      showOrderSummary();
    } else {
      alert("Please enter a valid name.");
    }
  } else {
    alert("Please add an item to cart before checkout.");
  }
}

// Function to prepare order summary/Order Receipt
function showOrderSummary() {
  const orderModal = document.getElementById("order-modal");
  let total = 0;
  let content = `<h5>Name: ${nameOnOrder}</h5>
  <table class="table table-sm">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Product Name</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>`;
  for (let i = 0; i < finalOrder.length; i++) {
    total += finalOrder[i].price * finalOrder[i].orderQuantity;
    content += `<tr>
    <th scope="row">${i + 1}</th>
    <td>${finalOrder[i].name}</td>
    <td>${finalOrder[i].orderQuantity}</td>
    <td>$${finalOrder[i].price * finalOrder[i].orderQuantity}</td>
    </tr>`;
  }
  const tax = (13 / 100) * total;
  content += `<tr>
  <th colspan="3">Tax (GST) @13%</th>
  <td>$${tax}</td>
</tr>
<tr>
  <th colspan="3">Shipping fee (free for orders above $50)</th>
  <td>${total >= 50 ? "Free shipping" : "$10"}</td>
</tr>
<tr>
  <th colspan="3">Total</th>
  <th>$${total + tax + (total >= 50 ? 0 : 10)}</th>
</tr></tbody></table>`;
  orderModal.innerHTML = content;
}
