let items = document.querySelector(".items");
let uptoBtn = document.querySelector(".btn-to-top");
let loaderimg = document.querySelector(".loader");
let productsBtn = document.querySelectorAll(".productsNamesBtn button");

// NavBar

const navbar = document.getElementsByClassName("navbar")[0];
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    navbar.classList.add("white-bg");
  } else {
    navbar.classList.remove("white-bg");
  }
});

function getBasePath() {
  const isLocalhost =
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "localhost";
  const repoName = "E-commerce-project";

  return isLocalhost ? "/" : `/${repoName}/`;
}

// Display Products Section
function showProducts() {
  let req = new XMLHttpRequest();
  req.open("GET", getBasePath() + "api-products.json");
  req.send();
  req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status === 200) {
      let result = JSON.parse(req.responseText);

      for (let i = 0; i < result.length; i++) {
        items.innerHTML += `
            <div class='all ${result[i].category} product-card col-12 col-lg-4 col-md-4 col-xl-3'>
                <div class="card p-0  mb-3 card-item">
                <img src=${result[i].image} class="img-fluid card-img  " alt="..." />
                <div class="card-body ">
                    <div class='d-flex justify-content-between'>
                        <span class="card-title text-start  fs-6 card-description">${result[i].description}</span>
                        <a href='#'class="heart-icon"><img src=${result[i].icon} ></a>
                    </div>
                    <p class="card-text pt-2">
                    $${result[i].price}
                    </p>
                    <button data-quick="view" class='btn-view rounded-pill'>Quick View</button>
                </div>
            </div>
                
                </div>
                `;
      }
    }
  };
}
// Loader
// window.onload = () => {
//   setTimeout(() => {
//     loaderimg.style.display = "none";
//   }, 500);
// };
showProducts();

// Remove Class Active and add it to the current target
productsBtn.forEach((btns) => {
  btns.addEventListener("click", removeActiveBtn);
  btns.addEventListener("click", matchProduct);
});

function removeActiveBtn() {
  productsBtn.forEach((btn) => {
    btn.classList.remove("active");
    this.classList.add("active");
  });
}

// when click on the product btn show all the products for this item
function matchProduct() {
  Array.from(items.children).forEach((products) => {
    products.style.display = "none";
  });
  document.querySelectorAll(this.dataset.product).forEach((prod) => {
    prod.style.display = "flex";
  });
}

// Save Products on WebStorage ( Local Storage)
function viewItem(img, desc, price) {
  const product = {
    image: img,
    description: desc,
    price: price,
  };

  window.localStorage.setItem("productDetails", JSON.stringify(product));
  window.location.href = "./productDetail.html";
}
// To Show uptoBtn
window.onscroll = () => {
  if (this.scrollY > 350) {
    uptoBtn.classList.add("showBtn");
  } else {
    uptoBtn.classList.remove("showBtn");
  }
};

// When Click on uptoBtn go to top
uptoBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

var cartButton = document.querySelector('[data-cart="cart"]');
var cart = document.querySelector(".cart-background");
var closeCart = document.querySelector('[data-close="close"]');
var cartContent = cart.querySelector(".cart-content");
var cartItem = document.querySelector(".item");
var cartItems = document.querySelector(".cart-items");

cartButton.addEventListener("click", () => {
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

// cost buttons
var buy = [
  {
    Num: 2,
    Much: 17.02,
  },
];

// Slider

var element1 = document.querySelector(".mean-0").cloneNode(true);
var element2 = document.querySelector(".mean-1").cloneNode(true);
element2.style.display = "block";
var element3 = document.querySelector(".mean-2").cloneNode(true);
element3.style.display = "block";
var elementsArr = [element1, element2, element3];

var prev = document.querySelector('[data-slider="prev"]');
var next = document.querySelector('[data-slider="next"]');
var container = document.querySelector(".slider-container");
var i = 0;
var t = setInterval(nextElement, 5000);
var isAnimating = false;

function nextElement() {
  isAnimating = true;
  i++;
  if (i >= elementsArr.length) {
    i = 0;
  }
  var j = i == 0 ? elementsArr.length - 1 : i - 1;

  var currentElement = container.querySelector(`.mean-${j}`);
  elementsArr[i].classList.add("hidden");
  container.prepend(elementsArr[i]);
  setTimeout(() => {
    currentElement.classList.add("hidden");
    var newElement = container.querySelector(`.mean-${i}`);
    newElement.classList.remove("hidden");
  }, 1);
  setTimeout(() => {
    currentElement.remove();
    isAnimating = false;
  }, 501);
}

function prevElement() {
  isAnimating = true;
  i--;
  if (i < 0) {
    i = elementsArr.length - 1;
  }
  var j = i == elementsArr.length - 1 ? 0 : i + 1;

  var currentElement = container.querySelector(`.mean-${j}`);
  elementsArr[i].classList.add("hidden");
  container.prepend(elementsArr[i]);
  setTimeout(() => {
    currentElement.classList.add("hidden");
    var newElement = container.querySelector(`.mean-${i}`);
    newElement.classList.remove("hidden");
  }, 1);
  setTimeout(() => {
    currentElement.remove();
    isAnimating = false;
  }, 501);
}

next.addEventListener("click", () => {
  if (isAnimating) return;
  nextElement();
  resetSlide();
});
prev.addEventListener("click", () => {
  if (isAnimating) return;
  prevElement();
  resetSlide();
});

function resetSlide() {
  clearInterval(t);
  t = setInterval(nextElement, 5000);
}

// search
let resultSearch = [];
let resultSearchOrg = [];

let reqSearch = new XMLHttpRequest();
reqSearch.open("GET", getBasePath() + "api-products.json");
reqSearch.send();

reqSearch.onreadystatechange = () => {
  if (reqSearch.readyState === 4 && reqSearch.status === 200) {
    resultSearchOrg = JSON.parse(reqSearch.responseText);
  }
};

let searchBtn = document.querySelector(".searchBtn");
let searchBar = document.querySelector(".searchBar");
searchBtn.addEventListener("click", function () {
  searchBtn.style.display = "none";
  searchBar.style.display = "flex";
  searchBar.querySelector("input").focus();
});

let searchBarInput = searchBar.querySelector("input");

searchBarInput.addEventListener("input", function () {
  console.log(searchBarInput.value);
  showSearchProducts(searchBarInput.value.trim());
});

function showSearchProducts(x) {
  if (x == "") {
    resultSearch = resultSearchOrg;
    console.log(resultSearch);
  } else {
    resultSearch = resultSearchOrg.filter(function (e) {
      return e.description.toLowerCase().includes(x.toLowerCase());
    });
    console.log(resultSearch);
  }
  items.innerHTML = "";
  for (let i = 0; i < resultSearch.length; i++) {
    items.innerHTML += `
            <div class='all ${resultSearch[i].category} product-card col-12 col-lg-4 col-md-4 col-xl-3'>
                <div class="card p-0  mb-3 card-item">
                <img src=${resultSearch[i].image} class="img-fluid card-img  " alt="..." />
                <div class="card-body ">
                    <div class='d-flex justify-content-between'>
                        <span class="card-title text-start  fs-6 card-description">${resultSearch[i].description}</span>
                        <a href='#'class="heart-icon"><img src=${resultSearch[i].icon} ></a>
                    </div>
                    <p class="card-text pt-2">
                    $${resultSearch[i].price}
                    </p>
                    <button data-quick="view" class='btn-view rounded-pill'>Quick View</button>
                </div>
            </div>
                
                </div>
                `;
  }
}

// document.getElementById("darkMode").addEventListener("click", function () {
//   document.body.classList.toggle("darkMode");
//   if (document.body.classList.contains("darkMode")) {
//     localStorage.setItem("darkMode", "true");
//   } else {
//     localStorage.setItem("darkMode", "false");
//   }
// });
