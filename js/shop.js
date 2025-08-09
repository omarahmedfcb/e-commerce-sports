let logInBtnShopNew = document.querySelector(".logIn");

window.onload = function () {
  if (window.sessionStorage.getItem("username")) {
    logInBtnShopNew.innerText = "Log Out";
  } else {
    logInBtnShopNew.innerText = "Log In";
  }
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
// search
let itemsShop = document.querySelector(".items");

let resultSearchShop = [];
let resultSearchShopOrg = [];

let reqSearchShop = new XMLHttpRequest();
reqSearchShop.open("GET", getBasePath() + "api-products.json");
reqSearchShop.send();

reqSearchShop.onreadystatechange = () => {
  if (reqSearchShop.readyState === 4 && reqSearchShop.status === 200) {
    resultSearchShopOrg = JSON.parse(reqSearchShop.responseText);
  }
};

let searchBtnShop = document.querySelector(".searchBtn");
let searchBarShop = document.querySelector(".searchBar");
searchBtnShop.addEventListener("click", function () {
  searchBtnShop.style.display = "none";
  searchBarShop.style.display = "flex";
  searchBarShop.querySelector("input").focus();
});

let searchBarShopInput = searchBarShop.querySelector("input");

searchBarShopInput.addEventListener("input", function () {
  showSearchShopProducts(searchBarShopInput.value.trim());
});

function showSearchShopProducts(x) {
  if (x == "") {
    resultSearchShop = resultSearchShopOrg;
  } else {
    resultSearchShop = resultSearchShopOrg.filter(function (e) {
      return e.description.toLowerCase().includes(x.toLowerCase());
    });
  }
  itemsShop.innerHTML = "";
  for (let i = 0; i < resultSearchShop.length; i++) {
    itemsShop.innerHTML += `
            <div class='all ${resultSearchShop[i].category} product-card col-12 col-lg-4 col-md-4 col-xl-3'>
                <div class="card p-0  mb-3 card-item">
                <img src=${resultSearchShop[i].image} class="img-fluid card-img  " alt="..." />
                <div class="card-body ">
                    <div class='d-flex justify-content-between'>
                        <span class="card-title text-start  fs-6 card-description">${resultSearchShop[i].description}</span>
                        <a href='#'class="heart-icon"><img src=${resultSearchShop[i].icon} ></a>
                    </div>
                    <p class="card-text pt-2">
                    $${resultSearchShop[i].price}
                    </p>
                    <button data-quick="view" class='btn-view rounded-pill'>Quick View</button>
                </div>
            </div>
                
                </div>
                `;
  }
}

function getBasePath() {
  const isLocalhost =
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "localhost";
  const repoName = "E-commerce-project";

  return isLocalhost ? "/" : `/${repoName}/`;
}
logInBtnShopNew.addEventListener("click", function () {
  if (window.sessionStorage.getItem("username")) {
    window.sessionStorage.setItem("username", "");
    window.sessionStorage.setItem("cart", JSON.stringify([]));
  }
  open(getBasePath() + "index.html", "_self");
});
