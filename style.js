document.getElementById("toggle-button").addEventListener("click", () => {
  const navbarLinks = document.getElementById("navbar-links");
  const toggleButton = document.getElementById("toggle-button");
  navbarLinks.classList.toggle("active");
  toggleButton.classList.toggle("active");
});

function darkmodeToggle() {
  let darkmodeCheckbox = document.getElementById("darkmode-toggle");
  let salesperformance = document.getElementsByClassName("range");
  let body = document.body;

  for (let i = 0; i < salesperformance.length; i++) {
    salesperformance[i].style.color = "black";
    salesperformance[i].style.transition = "color 0.5s";
  }

  body.style.transition = "background-color 0.5s";
  darkmodeCheckbox.addEventListener("change", () => {
    if (darkmodeCheckbox.checked) {
      console.log("Dark mode is on");
      body.style.background = "linear-gradient(180deg, #000000, #ffff00)";
      for (let i = 0; i < salesperformance.length; i++) {
        salesperformance[i].style.color = "white";
      }
    } else {
      console.log("Dark mode is off");
      body.style.background = "linear-gradient(180deg, #01cbfd, #fbff00)";
      for (let i = 0; i < salesperformance.length; i++) {
        salesperformance[i].style.color = "black";
      }
    }
  });
}

darkmodeToggle();
