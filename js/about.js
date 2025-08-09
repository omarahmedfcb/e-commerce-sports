window.onload = function () {
  var myArrayNum = JSON.parse(window.sessionStorage.getItem("cart")) || [];
  document.querySelector(".shoppingNum span").innerText = myArrayNum.length;
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
