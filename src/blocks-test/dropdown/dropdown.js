import {BaseClass} from '../../js/base/baseClass';

class Dropdown extends BaseClass {

  initEventListener(domElement) {
    super.initEventListener(domElement);
    domElement.addEventListener('click', this);
  }
  
  handleEvent(event) {
    super.handleEvent(event);
    this.h(event);
  }

  h(event) {
    let field = event.target.closest('.dropdown-field');
    if(!field) {
      return;
    }
    this.queryChild('dropdown-floor').changeHidden();
  }
}

export {Dropdown};