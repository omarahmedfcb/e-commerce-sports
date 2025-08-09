var res = 0;
let logInBtnNew = document.querySelector(".logIn");

var apiData = new XMLHttpRequest();
apiData.open("GET", getBasePath() + "api-products.json");
apiData.send();
apiData.onreadystatechange = function () {
  if (apiData.readyState === 4 && apiData.status == 200) {
    res = JSON.parse(apiData.responseText);
    // console.log(res);
  }
};

// var quickView = document.querySelector('[data-quick="view"]');
var openDetails = document.querySelector(".details");
var currentItemName = "";
var itemExists = false;
var sliderItems = openDetails.querySelectorAll(".carousel-item");
var sliderMiniItems = openDetails
  .querySelector(".mini-items")
  .querySelectorAll("img");
window.addEventListener("click", function (e) {
  if (e.target.closest('[data-quick="view"]')) {
    var quickView = e.target.closest('[data-quick="view"]');
    var item = quickView.closest(".card-body");
    var itemName = item.querySelector(".card-description");
    currentItemName = itemName.innerText;
    for (var i = 0; i < res.length; i++) {
      if (res[i].description == currentItemName) {
        openDetails.querySelector(".product-price-pop").innerText =
          res[i].price;
        openDetails.querySelector(".product-name-pop").innerText =
          res[i].description;
        sliderItems[0].querySelector("img").src = res[i].image;
        sliderItems[1].querySelector("img").src = res[i].image2;
        sliderItems[2].querySelector("img").src = res[i].image3;
        sliderMiniItems[0].src = res[i].image;
        sliderMiniItems[1].src = res[i].image2;
        sliderMiniItems[2].src = res[i].image3;

        itemExists = true;
        break;
      } else {
        itemExists = false;
      }
    }
    openDetails.style.display = "flex";
    openDetails
      .querySelector("section")
      .classList.remove("hidden-details-main");

    setTimeout(() => {
      openDetails.classList.remove("hidden-details-back");
    }, 200);
    // console.log(currentItemName);
  }
});

var closeButton = document.querySelector(".close-details");
closeButton.addEventListener("click", closeDetails);

function closeDetails() {
  var details = closeButton.closest(".details");
  details.querySelector("section").classList.add("hidden-details-main");
  setTimeout(() => {
    details.classList.add("hidden-details-back");
  }, 300);
  setTimeout(() => {
    details.style.display = "none";
  }, 600);
  // var detailsSection = e.target.closest(".details");
  details.querySelector(".num").innerText = 1;
}

function goToSlider(index) {
  const carouselElement = document.querySelector("#productCarousel");
  const bsCarousel =
    bootstrap.Carousel.getInstance(carouselElement) ||
    new bootstrap.Carousel(carouselElement);
  bsCarousel.to(index);
}

// functionality of plus, minus and add cart

var plus = document.querySelector("[data-cost='plusDetails']");
var minus = document.querySelector("[data-cost='minusDetails']");
plus.addEventListener("click", (e) => {
  var quantity = e.target.closest(".input-group");
  var num = quantity.querySelector(".num");
  num.innerHTML = parseInt(num.innerHTML) + 1;
});

minus.addEventListener("click", (e) => {
  var quantity = e.target.closest(".input-group");
  var num = quantity.querySelector(".num");

  if (num.innerHTML == 1) {
    return;
  } else {
    num.innerHTML = parseInt(num.innerHTML) - 1;
  }
});

var addButton = document.querySelector('[data-add="cart"]');
addButton.addEventListener("click", function (e) {
  if (window.sessionStorage.getItem("username")) {
    var found = false;
    var detailsSection = e.target.closest(".details");
    var detailsName =
      detailsSection.querySelector(".product-name-pop").innerText;
    var detailsNumber = detailsSection.querySelector(".num").innerText;
    var detailsPrice =
      detailsSection.querySelector(".product-price-pop").innerText;
    var detailsImage = detailsSection.querySelector(".det-img-1").src;
    var itemsArray = JSON.parse(window.sessionStorage.getItem("cart")) || [];
    for (var i = 0; i < itemsArray.length; i++) {
      if (detailsName == itemsArray[i].Name) {
        itemsArray[i].Number += parseInt(detailsNumber);
        found = true;
        break;
      } else {
        found = false;
      }
    }
    if (found === false) {
      itemsArray.push({
        Image: detailsImage,
        Name: detailsName,
        Price: parseFloat(detailsPrice),
        Number: parseInt(detailsNumber),
      });
    }
    window.sessionStorage.setItem("cart", JSON.stringify(itemsArray));
    updateCart();
    closeDetails();
    detailsSection.querySelector(".num").innerText = 1;
  } else {
    alert("you should log in first");
    open(getBasePath() + "index.html", "_self");
  }
});

var cartItem = document.querySelector(".item");
var cartItems = document.querySelector(".cart-items");

function updateCart() {
  var itemsArray = JSON.parse(window.sessionStorage.getItem("cart")) || [];
  document.querySelector(".shoppingNum span").innerText = itemsArray.length;
  console.log(itemsArray);
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

// dark  mode
// ////////////////////////////////////////////////
// ////////////////////////////////////////

window.onload = function () {
  if (window.sessionStorage.getItem("username")) {
    logInBtnNew.innerText = "Log Out";
  } else {
    logInBtnNew.innerText = "Log In";
  }
  var myArrayNum = JSON.parse(window.sessionStorage.getItem("cart")) || [];
  document.querySelector(".shoppingNum span").innerText = myArrayNum.length;
  updateCart();
  const darkMode = localStorage.getItem("darkMode");

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

// dark mode

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
// login-logout

function getBasePath() {
  const isLocalhost =
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "localhost";
  const repoName = "e-commerce-sports";

  return isLocalhost ? "/" : `/${repoName}/`;
}
logInBtnNew.addEventListener("click", function () {
  if (window.sessionStorage.getItem("username")) {
    window.sessionStorage.setItem("username", "");
    window.sessionStorage.setItem("cart", JSON.stringify([]));
  }
  open(getBasePath() + "index.html", "_self");
});

// window.sessionStorage.getItem("username");
