const clearChoices = () => {
  let inputs = document.getElementsByTagName("input");
  let selections = document.getElementsByTagName("select");

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].type === "checkbox") {
      inputs[i].checked = false;
    } else {
      inputs[i].value = "";
    }
  }
  for (let i = 0; i < selections.length; i++) {
    selections[i].selectedIndex = 0;
  }
};

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
const creditCardReg = /^\d{13,16}$/g;
const zipReg = /^\w{5}$/g;
const nameField = document.querySelector("#name");
const emailRegex = /^\w+@\w+\.\w+$/;
const nameRegex = /^\w+$/;
const emailField = document.querySelector("#email");
const formElement = document.getElementsByTagName("form");
const paymentMethod = document.querySelector("#payment");
const paypalDiv = document.querySelector(".paypal");
const bitcoinDiv = document.querySelector(".bitcoin");
const creditCardDiv = document.querySelector("#credit-card");

// Focus on the first input

nameInput.focus();

// Basic Info

otherJobRole.style.display = "none";
jobTitle.addEventListener("change", () => {
  if (jobTitle.value === "other") {
    otherJobRole.style.display = "block";
  }
});

// Tshirt section

tshirtColor.style.display = "none";

tshirtDesign.addEventListener("change", (e) => {
  tshirtColor.style.display = "block";
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
  let eventCost = e.target.dataset.cost;
  eventCost = parseInt(eventCost);
  if (e.target.checked == true) {
    totalCost += eventCost;
    activityCost.innerHTML = `Total: $${totalCost}`;
  } else {
    totalCost -= eventCost;
    activityCost.innerHTML = `Total: $${totalCost}`;
    console.log(totalCost);
  }
});

// Payment Options ShowHide function located in functions.js
paypalDiv.style.display = "none";
bitcoinDiv.style.display = "none";
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

// Validation name email register for activities card number zipcode cvv form

const formValidation = () => {
  formElement[0].addEventListener("submit", (e) => {
    e.preventDefault();
    validateFields(nameField, nameRegex);
    validateFields(emailField, emailRegex);
    // Only check the validation for the credit card if that payment is selected
    if (paymentMethod.value === "credit-card") {
      validateFields(creditCardField, creditCardReg);
      validateFields(creditCardZip, zipReg);
      validateFields(creditCardCVV, cvvReg);
    }
  });
};

// Credit Card Validation

formValidation();
