clearChoices();

// Variable Decloration
const nameInput = document.querySelector("#name");
const jobTitle = document.querySelector("#title");
const otherJobRole = document.querySelector("#other-job-role");
const tshirtColor = document.querySelector("#shirt-colors");
const tshirtDesign = document.querySelector("#design");
const colorSelect = document.querySelector("#color");
const activityFields = document.querySelector("#activities");
const activityCost = document.querySelector("#activities-cost");
const shirtRegex = /^(.+?)\((.*?)\)/g;
let totalCost = 0;
const checkboxElements = document.querySelectorAll("input[type='checkbox']");
const creditCardField = document.querySelector("#cc-num");
const creditCardZip = document.querySelector("#zip");
const creditCardCVV = document.querySelector("#cvv");
const cvvReg = /^\d{3}$/;
const creditCardReg = /^\d{13,16}$/;
const zipReg = /^\w{5}$/;
const nameField = document.querySelector("#name");
const emailRegex = /^\w+@\w+\.\w+$/;
const nameRegex = /^\w{3,}$/;
const emailField = document.querySelector("#email");
const formElement = document.getElementsByTagName("form");
const paymentMethod = document.querySelector("#payment");
const paypalDiv = document.querySelector(".paypal");
const bitcoinDiv = document.querySelector(".bitcoin");
const creditCardDiv = document.querySelector("#credit-card");
const addOnActivites = document.querySelector("#activities-box").children;
const nameHint = document.querySelector("#name-hint");

// Focus on the first input

nameInput.focus();

// Basic Info

otherJobRole.style.display = "none";
jobTitle.addEventListener("change", () => {
  if (jobTitle.value === "other") {
    otherJobRole.style.display = "block";
  } else {
    otherJobRole.style.display = "none";
  }
});

// Tshirt section

tshirtColor.lastElementChild.disabled = true;

tshirtDesign.addEventListener("change", (e) => {
  tshirtColor.lastElementChild.disabled = false;
  tshirtColor.lastElementChild.selectedIndex = 0;
  colorSelect.options[0].textContent = "Pick a color";

  if (tshirtDesign.value === "js puns") {
    for (let i = 0; i < colorSelect.length; i++) {
      if (colorSelect.options[i].dataset.theme === "heart js") {
        colorSelect.options[i].hidden = true;
      }

      if (colorSelect.options[i].dataset.theme === "js puns") {
        colorSelect.options[i].hidden = false;
        //prettier-ignore
        colorSelect.options[i].textContent = colorSelect.options[i].textContent.replace(shirtRegex, "$1");
      }
    }
  }

  if (tshirtDesign.value === "heart js") {
    for (let i = 0; i < colorSelect.length; i++) {
      if (colorSelect.options[i].dataset.theme === "js puns") {
        colorSelect.options[i].hidden = true;
      }

      if (colorSelect.options[i].dataset.theme === "heart js") {
        colorSelect.options[i].hidden = false;
        //prettier-ignore
        colorSelect.options[i].textContent = colorSelect.options[i].textContent.replace(shirtRegex, "$1");
      }
    }
  }
});

//Conference Selection

activityFields.addEventListener("change", (e) => {
  if (e.target.checked === true) {
    let selectedTime = e.target.dataset.dayAndTime;
    activityFields.lastElementChild.style.display = "none";
    activityFields.parentElement.classList.remove("not-valid");
    for (let i = 0; i < addOnActivites.length; i++) {
      let dayAndTime = addOnActivites[i].children[0].dataset.dayAndTime;
      if (dayAndTime === selectedTime) {
        addOnActivites[i].className = "disabled";
        addOnActivites[i].children[0].disabled = true;
        e.target.parentElement.classList.remove("disabled");
        e.target.disabled = false;
      }
    }
  }

  if (e.target.checked === false) {
    selectedTime = e.target.dataset.dayAndTime;

    for (let i = 0; i < addOnActivites.length; i++) {
      dayAndTime = addOnActivites[i].children[0].dataset.dayAndTime;
      if (dayAndTime === selectedTime) {
        addOnActivites[i].className = "";
        addOnActivites[i].children[0].disabled = false;
      }
    }
  }

  let eventCost = e.target.dataset.cost;
  eventCost = parseInt(eventCost);
  if (e.target.checked == true) {
    totalCost += eventCost;
    activityCost.innerHTML = `Total: $${totalCost}`;
  } else {
    totalCost -= eventCost;
    activityCost.innerHTML = `Total: $${totalCost}`;
  }
  let checked = 0;
  for (let i = 0; i < addOnActivites.length; i++) {
    if (addOnActivites[i].children[0].checked) {
      checked += 1;
    }
  }
  if (checked > 0) {
    activityFields.classList.remove("not-valid");
  } else {
    activityFields.classList.add("not-valid");
  }
});

// Payment Options ShowHide function located in helpers.js
paypalDiv.style.display = "none";
bitcoinDiv.style.display = "none";
paymentMethod.selectedIndex = 1;
paymentMethod.addEventListener("change", () => {
  showHide(paymentMethod.value);
});

// checkbox focus and blur

for (let i = 0; i < checkboxElements.length; i++) {
  checkboxElements[i].addEventListener("focus", (e) => {
    e.target.parentElement.className = "focus";
  });
  checkboxElements[i].addEventListener("blur", (e) => {
    e.target.parentElement.classList.remove("focus");
  });
}

// validate form elements

formValidation();
