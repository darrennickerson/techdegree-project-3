# Treehouse Techdgree Project 3

## Interactive Form

### Form Validation

validate fields takes the field name to validate and the regular expression to compare the form value to.

`validateFields(fieldName, reg)`

### Show Hide function

Show hide makes it easy to hide and show elements, for the payment selection area of the form. Name should be the value of the payment option.

`showHide(name)`

### Realtime error messaging

When typing in the name or email fields the user will see an error message until the regex conditions are met

### Conditional error message

On the name field when the user types a name that is shorter than 3 characters long a message will appear that the name has to be greater than 3 characters. When the field is blank the user will see that the field can't be blank.
