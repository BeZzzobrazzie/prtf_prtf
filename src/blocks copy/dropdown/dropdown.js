class dropdown {
  constructor(selectorDropdown) {
    let dropdownField = selectorDropdown.querySelector(".dropdown-field");
    let arr = document.querySelectorAll(selectorDropdown);
    for (let elem of arr) {
      elem.addEventListener("click", this);
    }


  }

  handleEvent(event) {
    dropdownHide();
  }

  dropdownHide() {
    if(floor.hidden) {
        floor.hidden = false;
        expand.querySelector('p').textContent = "expand_less";
        field.classList.toggle("dropdown-field_expanded");
    }
    else {
        floor.hidden = true;
        expand.querySelector('p').textContent = "expand_more";
        field.classList.toggle("dropdown-field_expanded");
    }
}

}

let objDropdown = new dropdown;



let field = document.querySelector(".dropdown-field");
let expand = document.querySelector(".dropdown-field__expand");
let list = document.querySelector(".dropdown__list");
let floor = document.querySelector(".dropdown__floor");


field.addEventListener("click", dropdownHide);
list.addEventListener("click", quantityChange);

function dropdownHide() {
    if(floor.hidden) {
        floor.hidden = false;
        expand.querySelector('p').textContent = "expand_less";
        field.classList.toggle("dropdown-field_expanded");
    }
    else {
        floor.hidden = true;
        expand.querySelector('p').textContent = "expand_more";
        field.classList.toggle("dropdown-field_expanded");
    }
}

function quantityChange() {
    let target = event.target;
    if(target.classList.contains("dropdown__btn-count_minus")) {
        let dropdown__countGroup = target.closest(".dropdown__count-group");
        let dropdown__count = dropdown__countGroup.querySelector(".dropdown__count");
        if(dropdown__count.textContent == 99) {
            dropdown__countGroup.querySelector(".dropdown__btn-count_plus").classList.add("dropdown__btn-count_further");
        }
        if(dropdown__count.textContent > 0) {
            dropdown__count.textContent = + dropdown__count.textContent - 1;
            totalCount("-", target);

            if(dropdown__count.textContent == 0) {
                target.classList.remove("dropdown__btn-count_further");
            }
            
        }
    }
    else if(target.classList.contains("dropdown__btn-count_plus")) {


        let dropdown__countGroup = target.closest(".dropdown__count-group");
        let dropdown__count = dropdown__countGroup.querySelector(".dropdown__count");
        if(dropdown__count.textContent == 0) {
            dropdown__countGroup.querySelector(".dropdown__btn-count_minus").classList.add("dropdown__btn-count_further");
        }
        if(dropdown__count.textContent < 99) {
            dropdown__count.textContent = + dropdown__count.textContent + 1;
            totalCount("+", target);

            if(dropdown__count.textContent == 99) {
                target.classList.remove("dropdown__btn-count_further");
            }
            
        }
    }
}

function totalCount(sign, target) {
    let dropdown__value = target.closest(".dropdown").querySelector(".dropdown-field__value");
    if(dropdown__value.textContent == "Сколько гостей") {
        dropdown__value.textContent = 0;
    }
    if(sign == "+") {
        dropdown__value.textContent = (+dropdown__value.textContent.split(" ")[0] + 1) + " " + getNoun((+dropdown__value.textContent.split(" ")[0] + 1), "гость", "гостя", "гостей");
    }
    else if (sign == "-") {
        dropdown__value.textContent = (+dropdown__value.textContent.split(" ")[0] - 1) + " " + getNoun((+dropdown__value.textContent.split(" ")[0] - 1), "гость", "гостя", "гостей");
        if(+dropdown__value.textContent.split(" ")[0] == 0) {
            dropdown__value.textContent = "Сколько гостей";
        }
    }
}

function getNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  }

