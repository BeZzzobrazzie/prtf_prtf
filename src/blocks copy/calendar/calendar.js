class calendar {
  constructor(calendar) {
    
    this.calendar = calendar;
    this.calendarMonthAndYear = calendar.querySelector('.calendar__month-and-year');
    this.calendarBody = calendar.querySelector('.calendar__body');
    this.arrowBack = calendar.querySelector('.calendar__arrow_back');
    this.arrowForward = calendar.querySelector('.calendar__arrow_forward');

    this.arrowBack.addEventListener('click', this);
    this.arrowForward.addEventListener('click', this);

    this.DaysOfWeek = [
      'Пн',
      'Вт',
      'Ср',
      'Чт',
      'Пт',
      'Сб',
      'Вс'
    ];
    this.Months =['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let d = new Date();
    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();

    this.showcurr();
  }

  handleEvent(event) {
    if(event.target == this.arrowBack) {
      this.previousMonth();
    }
    else if (event.target == this.arrowForward) {
      this.nextMonth();
    }
  }

  nextMonth() {
    if ( this.currMonth == 11 ) {
      this.currMonth = 0;
      this.currYear = this.currYear + 1;
    }
    else {
      this.currMonth = this.currMonth + 1;
    }
    this.showcurr();    
  }

  previousMonth() {
    if ( this.currMonth == 0 ) {
      this.currMonth = 11;
      this.currYear = this.currYear - 1;
    }
    else {
      this.currMonth = this.currMonth - 1;
    }
    this.showcurr();
  }

  createCell(elementClass, content) {
    let cell = document.createElement('td');
    cell.classList.add('calendar__cell');
    cell.classList.add(elementClass);
    cell.append(content);

    return cell;
  }

  showcurr() {
    this.showMonth(this.currYear, this.currMonth);
  }

  showMonth(y, m) {
    let d = new Date();
    // Первый день недели в выбранном месяце 
    let firstDayOfMonth = new Date(y, m, 7).getDay();
    // Последний день выбранного месяца
    let lastDateOfMonth =  new Date(y, m+1, 0).getDate();
    // Последний день предыдущего месяца
    let lastDateOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();

    let table = document.createElement('table');
    table.classList.add('calendar__table');

    // Запись выбранного месяца и года
    let MonthsAndYear = document.createTextNode(this.Months[m] + ' ' + y);
    this.calendarMonthAndYear.firstChild.replaceWith(MonthsAndYear);

    let RowDaysOfWeek = document.createElement('tr');
    for(let i=0; i < this.DaysOfWeek.length; i++) {
      RowDaysOfWeek.append(this.createCell('calendar__cell_days-of-week', this.DaysOfWeek[i]));
    }
    table.append(RowDaysOfWeek);

    // Записываем дни
    let i=1;
    let row;
    do {
      let dow = new Date(y, m, i).getDay();
      // Начать новую строку в понедельник
      if ( dow == 1 ) {
        row = document.createElement('tr');
      }
      // Если первый день недели не понедельник показать последние дни предыдущего месяца
      else if ( i == 1 ) {
        row = document.createElement('tr');
        let k = lastDateOfLastMonth - firstDayOfMonth+1;
        for(let j=0; j < firstDayOfMonth; j++) {
          row.append(this.createCell('calendar__cell_not-current', k));
          k++;
        }
      }
      // Записываем текущий день в цикл
      let chk = new Date();
      let chkY = chk.getFullYear();
      let chkM = chk.getMonth();
      if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
        row.append(this.createCell('calendar__cell_today', i));
      } else {
        row.append(this.createCell('calendar__cell_default', i));
      }
      // закрыть строку в воскресенье
      if ( dow == 0 ) {
        table.append(row);
      }
      // Если последний день месяца не воскресенье, показать первые дни следующего месяца
      else if ( i == lastDateOfMonth ) {
        let k=1;
        for(dow; dow < 7; dow++) {
          row.append(this.createCell('calendar__cell_not-current', k));
          k++;
        }
        table.append(row);
      }
      i++;
    }while(i <= lastDateOfMonth);
    this.calendarBody.firstChild.replaceWith(table);
  }
}


let calend = document.querySelector('.calendar');

let objCalendar = new calendar(calend);


