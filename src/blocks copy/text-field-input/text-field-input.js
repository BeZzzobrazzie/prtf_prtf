class textFieldInput {
  constructor() {
    let arr = document.querySelectorAll('.text-field-input');
    for (let elem of arr) {
      elem.addEventListener('focus', this.handleTextFieldInputFocus);
      elem.addEventListener('blur', this.handleTextFieldInputBlur);
    }
  }

  handleTextFieldInputFocus() {
    if(event.target.value == event.target.getAttribute('value')) {
      event.target.value = '';
    }
  }
  
  handleTextFieldInputBlur() {
    if(event.target.value == '') {
      event.target.value = event.target.getAttribute('value');
    }
  }
}

let objTextFieldInput = new textFieldInput();
