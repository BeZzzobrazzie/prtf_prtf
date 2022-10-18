import {BaseClass} from './base/baseClass';

class Main extends BaseClass {
  constructor(domElement) {
    super(domElement);
    console.log(this);
  }


}


let m = new Main(document.querySelector('body'));
