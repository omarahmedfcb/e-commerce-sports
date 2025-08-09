var plus = document.querySelectorAll("[data-cost='plus']");
var minus = document.querySelectorAll("[data-cost='minus']");
let logInBtnNew = document.querySelector(".logIn");

var container = document.querySelector(".bought-items");

function updateTotal(e) {
  e.querySelector(".total").querySelector("span").innerHTML =
    parseFloat(e.querySelector(".price").querySelector("span").innerHTML) *
    parseInt(e.querySelector(".quantity").querySelector("div").innerHTML);
}
var itemCart = document.querySelector(".item-cart");
// updateTotal(itemCart);
// updateTotal(itemCart);

// we are here

window.addEventListener("click", (e) => {
  if (e.target.closest("[data-cost='plus']")) {
    var itemsArray = JSON.parse(window.sessionStorage.getItem("cart")) || [];
    var quantity = e.target.closest(".quantity");
    var num = quantity.querySelector("div");
    var item = e.target.closest(".item-cart");
    for (var i = 0; i < itemsArray.length; i++) {
      if (item.querySelector("p").innerHTML == itemsArray[i].Name) {
        itemsArray[i].Number =
          parseInt(
            item.querySelector(".quantity").querySelector("div").innerHTML
          ) + 1;
      }
    }
    window.sessionStorage.setItem("cart", JSON.stringify(itemsArray));
    num.innerHTML = parseInt(num.innerHTML) + 1;
    updateTotal(item);
    updateTotalCost();
    updateCart();
  }
});

window.addEventListener("click", (e) => {
  if (e.target.closest("[data-cost='minus']")) {
    var itemsArray = JSON.parse(window.sessionStorage.getItem("cart")) || [];
    var quantity = e.target.closest(".quantity");
    var num = quantity.querySelector("div");
    var item = e.target.closest(".item-cart");
    for (var i = 0; i < itemsArray.length; i++) {
      if (item.querySelector("p").innerHTML == itemsArray[i].Name) {
        if (num.innerHTML == 1) {
          itemsArray.splice(i, 1);
          window.sessionStorage.setItem("cart", JSON.stringify(itemsArray));
        } else {
          itemsArray[i].Number =
            parseInt(
              item.querySelector(".quantity").querySelector("div").innerHTML
            ) - 1;
          window.sessionStorage.setItem("cart", JSON.stringify(itemsArray));
        }
      }
    }
    if (num.innerHTML == 1) {
      item.remove();
      updateTotalCost();
    } else {
      num.innerHTML = parseInt(num.innerHTML) - 1;
      updateTotal(item);
      updateTotalCost();
    }
    updateCart();
  }
});

// cost total
var totalCost = 0;
var bigTotal = document.querySelector(".bigTotal");
var subtotal = document.querySelector(".subtotal");
var input = document.querySelector("#ship");

function updateTotalCost() {
  var itemsForTotal = document.querySelectorAll(".item-cart");
  totalCost = 0;
  itemsForTotal.forEach((e) => {
    if (getComputedStyle(e).display === "none") {
      totalCost += 0;
    } else {
      totalCost +=
        parseInt(e.querySelector(".quantity").querySelector("div").innerHTML) *
        parseFloat(e.querySelector(".price").querySelector("span").innerHTML);
    }
  });
  subtotal.querySelector("span").innerHTML = totalCost;
  bigTotal.querySelector("span").innerHTML = totalCost;
}

document
  .querySelector('[data-update="update"]')
  .addEventListener("click", function () {
    if (parseFloat(input.value)) {
      bigTotal.querySelector("span").innerHTML =
        parseFloat(subtotal.querySelector("span").innerHTML) +
        parseFloat(input.value);
    } else {
      bigTotal.querySelector("span").innerHTML = parseFloat(
        subtotal.querySelector("span").innerHTML
      );
    }
  });

function updateCart() {
  var itemsArray = JSON.parse(window.sessionStorage.getItem("cart")) || [];
  document.querySelector(".shoppingNum span").innerText = itemsArray.length;
  container.innerHTML = "";
  console.log(itemsArray);
  itemsArray.forEach((e) => {
    var newItem = itemCart.cloneNode(true);
    newItem.style.display = "flex";
    newItem.querySelector("img").src = e.Image;
    newItem.querySelector("p").innerHTML = e.Name;
    newItem.querySelector(".quantity").querySelector("div").innerHTML =
      e.Number;
    newItem.querySelector(".price").querySelector("span").innerHTML = e.Price;
    updateTotal(newItem);
    container.appendChild(newItem);
    updateTotalCost();
  });
}

document.querySelector(".checkoutNow").addEventListener("click", function () {
  window.sessionStorage.setItem("cart", JSON.stringify([]));
  updateCart();
});

// cart popup
var cartButton = document.querySelector('[data-cart="cart"]');
var cart = document.querySelector(".cart-background");
var closeCart = document.querySelector('[data-close="close"]');
var cartContent = cart.querySelector(".cart-content");
var cartItem = document.querySelector(".item");
var cartItems = document.querySelector(".cart-items");

cartButton.addEventListener("click", () => {
  cart.style.display = "block";
  updatePopupCart();
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
function updatePopupCart() {
  var itemsArray = JSON.parse(window.sessionStorage.getItem("cart")) || [];
  document.querySelector(".shoppingNum span").innerText = itemsArray.length;

  cartItems.innerHTML = "";
  itemsArray.forEach((e) => {
    var newItem = cartItem.cloneNode(true);
    cartItem.setAttribute("data-template", "false");
    newItem.style.display = "flex";
    newItem.querySelector("img").src = e.Image;
    newItem.querySelector(".item-name").innerHTML = e.Name;
    newItem.querySelector(".num").innerHTML = e.Number;
    newItem.querySelector(".much").innerHTML = e.Price;
    // updateTotal(newItem);
    cartItems.appendChild(newItem);
  });
  updatePopupTotalCost();
}
var totalPopup = document.querySelector(".totalMuch");
window.onload = function () {
  if (window.sessionStorage.getItem("username")) {
    logInBtnNew.innerText = "Log Out";
  } else {
    logInBtnNew.innerText = "Log In";
  }
  updatePopupCart();
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

// darkmode

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

// darkmode

function updatePopupTotalCost() {
  var cartItemAll = document.querySelectorAll('.item[data-template="false"]');
  var totalUpdated = 0;
  cartItemAll.forEach((e) => {
    totalUpdated +=
      parseInt(e.querySelector(".num").innerHTML) *
      parseFloat(e.querySelector(".much").innerHTML);
  });

  if (cartItemAll.length == 0) {
    totalPopup.innerText = "";
  } else {
    totalPopup.innerText = totalUpdated;
  }
}

document
  .querySelector('[data-cart="cart"]')
  .addEventListener("click", updatePopupCart);

var checkOutButton = document.querySelector(".checkout");
checkOutButton.addEventListener("click", function () {
  window.sessionStorage.setItem("cart", JSON.stringify([]));
  updatePopupCart();
  // updatePopupTotalCost();
  updateCart();
});
// checkout

// dark mode

// dark mode

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
