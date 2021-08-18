// clear form when page refreshes

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

/*
 *
 * Show hide for payment methods takes name of payment method from payment checkbox
 *
 */

const showHide = (name) => {
  // external array of objects can be added if more payment options are added

  const paymentOptions = [
    {
      name: "credit-card",
      mainDiv: creditCardDiv,
    },
    {
      name: "paypal",
      mainDiv: paypalDiv,
    },
    {
      name: "bitcoin",
      mainDiv: bitcoinDiv,
    },
  ];

  // loop through the array to find the currently selected payment option

  for (let i = 0; i < paymentOptions.length; i++) {
    if (paymentOptions[i].name === name) {
      const currentOption = paymentOptions[i];
      paymentOptions.splice(i, 1);
      currentOption.mainDiv.style.display = "block";
      for (let i = 0; i < paymentOptions.length; i++) {
        paymentOptions[i].mainDiv.style.display = "none";
      }
    }
  }
};

/*
 *
 * Form Validation for submit and keyup event Listeners
 *
 */

// Form validation takes the field name and regular expression

const validateFields = (fieldName, reg) => {
  if (reg.test(fieldName.value)) {
    fieldName.parentElement.className = "valid";
    fieldName.parentElement.classList.remove("not-valid");
    fieldName.parentElement.lastElementChild.style.display = "none";
  } else {
    fieldName.parentElement.className = "not-valid";
    fieldName.parentElement.classList.remove("valid");
    fieldName.parentElement.lastElementChild.style.display = "block";
  }
};
const formValidation = () => {
  formElement[0].addEventListener("submit", (e) => {
    validateFields(emailField, emailRegex);

    // Only check the validation for the credit card if that payment is selected

    if (paymentMethod.value === "credit-card") {
      validateFields(creditCardField, creditCardReg);
      validateFields(creditCardZip, zipReg);
      validateFields(creditCardCVV, cvvReg);
    }

    // Make sure that at lease one activity is selected
    let checked = 0;
    for (let i = 0; i < addOnActivites.length; i++) {
      if (addOnActivites[i].children[0].checked) {
        checked += 1;
      }
    }
    if (checked === 0) {
      activityFields.lastElementChild.style.display = "block";
      activityFields.parentElement.className = "not-valid";
    } else {
      activityFields.lastElementChild.style.display = "none";
      activityFields.parentElement.classList.remove("not-valid");
    }
    if (document.querySelectorAll(".not-valid").length > 0) {
      e.preventDefault();
    }
  });
  // call validateFields before the keyup so that the error messaging starts before keyup

  validateFields(nameField, nameRegex);
  validateFields(emailField, emailRegex);

  // Realtime error messaging and conditional messages

  formElement[0].addEventListener("keyup", () => {
    validateFields(nameField, nameRegex);
    validateFields(emailField, emailRegex);
    if (nameField.value.length > 0 && nameField.value.length < 3) {
      nameHint.innerText = "Name must be 3 or more characters long.";
    }
  });
};
