class BaseClass {
  constructor(domElement) {
    this.domElement = domElement;
    this.children = [];
    this.init(this.domElement);
    this.initEventListener(this.domElement);
  }

  
  init(domElement) {
    for (let child of domElement.children) {
      //нужно импортировать js реализацию каждого блока ребёнка
      //если js реализации нет, создать болванку
      for(let c of child.classList) {
        //сделаем допущение, что на одном DOM-элементе может быть только один класс (что не верно, ибо это не так)

        let prom;
        switch(this.checkClassBem(c)) {
          case 'block':
            prom = import('../../blocks/' + this.pathToModuleBlock(c) + '.js');
            prom.then(
              result => this.handlerImportResult(result, child), 
              error => this.handlerImportError(error, child)
            );
            break;
          case 'element':
            prom = import('../../blocks/' + this.pathToModuleElement(c) + '.js');
            prom.then(
              result => this.handlerImportResult(result, child), 
              error => this.handlerImportError(error, child)
            );
            break;
          case 'mod':
            break;
          case 'error':
            break;
        }
      }
    }
  }

  createBlank(child) {
    return new BaseClass(child);
  }
  pathToModuleBlock(cls) {
    let path = String(cls) + '/' + String(cls);
    return path;
  }
  pathToModuleElement(cls) {
    let arrClsSplit = cls.split('__');
    let blockDirr = arrClsSplit[0];
    let elementDirr = '__' + arrClsSplit[1];
    let path = String(blockDirr) + '/' + String(elementDirr) + '/' + String(cls);
    return path;
  }
  translateNameClass(cls) {
    if(cls.includes('-')) {
      let arr = cls.split('-');
      let result = arr[0];
      for(let a = 1; a < arr.length; a++) {
        result += arr[a][0].toUpperCase() + arr[a].slice(1);
      }
      return result;
    }
  }
  handlerImportResult(result, child) {
    //console.log(result);
    for(let key in result) {
      this.children.push(new result[key](child));
    }
  }
  handlerImportError(error, child) {
    //console.log(error);
    this.children.push(this.createBlank(child));
  }
  checkClassBem(cls) {
    if(!cls.includes('_')) {
      return 'block'
    }
    else if(cls.includes(cls.match(/[^_]__[^_]/)) && !cls.includes(cls.match(/[^_]_[^_]/))) {
      return 'element'
    }
    else if(cls.includes(cls.match(/[^_]_[^_]/))) {
      return 'mod'
    }
    else {
      return 'error'
    }
  }


  initEventListener(domElement) {

  }

  handleEvent(event) {

  }

  queryChild(cls) {
    for(let el of this.children) {
      if(el.domElement.classList.contains(cls)) {
        //console.log(el);
        return el;
      }
      else {
        el.queryChild(cls);
      }
    }
  }


  addMod() {} // добавляет модификатор в classList DOMElement'а 
  
  importMod() {} // импортирует модуль модификатора в блок

  removeMod() {} // удаляет модификатор из classList DOMElement'а 


  /*
    Должен иметь:
    - ссылку на dom элемент;
    - метод инициализации детей;
    - коллекцию с сылками на js объекты детей;
    - метод инициализации обработчиков;
  */

}

export {BaseClass};