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

// Show hide for payment methods takes name of payment method from payment checkbox

const showHide = (name) => {
  // array of objects can be added if more payment options are added
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
