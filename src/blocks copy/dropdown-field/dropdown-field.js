class dropdownField {
  constructor(selectorDropdownField) {
    let arr = document.querySelectorAll(selectorDropdownField);
    for (let elem of arr) {
      elem.addEventListener("click", this);
    }
  }

  handleEvent(event) {
    this.dropdownHide(event);
  }

  dropdownHide(event) {
    let dropdownField;
    if(event.target.classList.contains('dropdown-field')) {
      dropdownField = event.target;
    }
    else {
      dropdownField = event.target.closest('.dropdown-field');
    }
    let dropdown = dropdownField.closest('.dropdown');
    let dropdownFieldExpand = dropdownField.querySelector('.dropdown-field__expand');
    let dropdownFloor = dropdown.parentElement.querySelector('.dropdown-floor');


    if(dropdownFloor.hidden) {
        dropdownFloor.hidden = false;
        dropdownFieldExpand.querySelector('p').textContent = "expand_less";
        dropdownField.classList.toggle("dropdown-field_expanded");
    }
    else {
      dropdownFloor.hidden = true;
      dropdownFieldExpand.querySelector('p').textContent = "expand_more";
      dropdownField.classList.toggle("dropdown-field_expanded");
    }
  }

}

let objDropdownField = new dropdownField('.dropdown-field');