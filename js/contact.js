var cartButton = document.querySelector('[data-cart="cart"]');
var cart = document.querySelector(".cart-background");
var closeCart = document.querySelector('[data-close="close"]');
var cartContent = cart.querySelector(".cart-content");
var cartItem = document.querySelector(".item");
var cartItems = document.querySelector(".cart-items");
let logInBtnNew = document.querySelector(".logIn");

cartButton.addEventListener("click", () => {
  console.log(cartButton);
  cart.style.display = "block";
  setTimeout(() => {
    cart.classList.add("cart-background-appear");
  }, 1);
  setTimeout(() => {
    cartContent.classList.add("cart-content-appear");
  }, 301);
});
// cart

closeCart.addEventListener("click", () => {
  cartContent.classList.remove("cart-content-appear");
  setTimeout(() => {
    cart.classList.remove("cart-background-appear");
  }, 200);
  setTimeout(() => {
    cart.style.display = "none";
  }, 350);
});

cart.addEventListener("click", (e) => {
  if (!cartContent.contains(e.target)) {
    cartContent.classList.remove("cart-content-appear");
    setTimeout(() => {
      cart.classList.remove("cart-background-appear");
    }, 200);
    setTimeout(() => {
      cart.style.display = "none";
    }, 350);
  }
});

cartContent.addEventListener("click", (e) => {
  e.stopPropagation();
});

var cartItems = document.querySelector(".cart-items");

function updateCart() {
  var itemsArray = JSON.parse(window.sessionStorage.getItem("cart")) || [];
  document.querySelector(".shoppingNum span").innerText = itemsArray.length;

  cartItems.innerHTML = "";
  itemsArray.forEach((e) => {
    var newItem = cartItem.cloneNode(true);
    newItem.setAttribute("data-template", "false");
    newItem.style.display = "flex";
    newItem.querySelector("img").src = e.Image;
    newItem.querySelector(".item-name").innerHTML = e.Name;
    newItem.querySelector(".num").innerHTML = e.Number;
    newItem.querySelector(".much").innerHTML = e.Price;
    // updateTotal(newItem);
    cartItems.appendChild(newItem);
  });
  updateTotalCost();
}
var total = document.querySelector(".totalMuch");
// window.onload = updateCart;
function updateTotalCost() {
  var cartItemAll = document.querySelectorAll('.item[data-template="false"]');
  var totalUpdated = 0;
  cartItemAll.forEach((e) => {
    totalUpdated +=
      parseInt(e.querySelector(".num").innerHTML) *
      parseFloat(e.querySelector(".much").innerHTML);
  });
  if (cartItemAll.length == 0) {
    total.innerText = "";
  } else {
    total.innerText = totalUpdated;
  }
}

// checkout
var checkOutButton = document.querySelector(".checkout");
checkOutButton.addEventListener("click", function () {
  window.sessionStorage.setItem("cart", JSON.stringify([]));
  updateCart();
});
// checkout

window.onload = function () {
  if (window.sessionStorage.getItem("username")) {
    logInBtnNew.innerText = "Log Out";
  } else {
    logInBtnNew.innerText = "Log In";
  }
  updateCart();
  const darkMode = localStorage.getItem("darkMode");

  if (darkMode === "true") {
    document.body.classList.add("darkMode");
  } else {
    document.body.classList.remove("darkMode");
  }
  if (darkMode === "true") {
    document.body.classList.add("darkMode");
    document.querySelector(".lightIcon").style.display = "block";
    document.querySelector(".darkIcon").style.display = "none";
  } else {
    document.body.classList.remove("darkMode");
    document.querySelector(".lightIcon").style.display = "none";
    document.querySelector(".darkIcon").style.display = "block";
  }
};

document.querySelector(".darkIcon").addEventListener("click", function () {
  document.body.classList.add("darkMode");
  if (document.body.classList.contains("darkMode")) {
    localStorage.setItem("darkMode", "true");
    document.querySelector(".lightIcon").style.display = "block";
    document.querySelector(".darkIcon").style.display = "none";
  } else {
    localStorage.setItem("darkMode", "false");
    document.querySelector(".lightIcon").style.display = "none";
    document.querySelector(".darkIcon").style.display = "block";
  }
});
document.querySelector(".lightIcon").addEventListener("click", function () {
  document.body.classList.remove("darkMode");
  if (document.body.classList.contains("darkMode")) {
    localStorage.setItem("darkMode", "true");
    document.querySelector(".lightIcon").style.display = "block";
    document.querySelector(".darkIcon").style.display = "none";
  } else {
    localStorage.setItem("darkMode", "false");
    document.querySelector(".lightIcon").style.display = "none";
    document.querySelector(".darkIcon").style.display = "block";
  }
});

function getBasePath() {
  const isLocalhost =
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "localhost";
  const repoName = "E-commerce-project";

  return isLocalhost ? "/" : `/${repoName}/`;
}
// login-logout
logInBtnNew.addEventListener("click", function () {
  if (window.sessionStorage.getItem("username")) {
    window.sessionStorage.setItem("username", "");
    window.sessionStorage.setItem("cart", JSON.stringify([]));
  }
  open(getBasePath() + "index.html", "_self");
});
