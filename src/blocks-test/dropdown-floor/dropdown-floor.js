import {BaseClass} from '../../js/base/baseClass';

class DropdownFloor extends BaseClass {

  hide() {
    this.domElement.hidden = true;
  }
  show() {
    this.domElement.hidden = false;
  }
  changeHidden() {
    //this.domElement.hidden = !this.domElement.hidden;
    if(this.domElement.hidden == true) {
      this.show();
    }
    else if(this.domElement.hidden == false) {
      this.hide();
    }
  }
}

export {DropdownFloor};