import React, { memo } from 'react';
import "../../assets/style/table/table.css";
import TableRows from './TableRows';
import parser from 'html-react-parser';
function Table() {
  //variables
  let today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  var monthLabel;
  showCalendar(currentMonth,currentYear);
  //functions

  //next 
  function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
  }

  //previous 
  function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth,currentYear);
  }

  //check how many days was in last month or after month
  function howManyDaysInMonth(currentMonth,currentYear){
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    let firstDay = (new Date(currentYear, currentMonth)).getDay();
    let daysInMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();
    return {days: daysInMonth,dayOne: firstDay,month: currentMonth,year: currentYear};
  }

  //show calendar
  function showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let infoLastMonth = howManyDaysInMonth(month,year);
    let checkDiffrentBwMonths = firstDay -1;
    monthLabel = month;
    // clearing all previous cells
    let rows = [];
    let date = 1;
    // creating all cells
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (row === 0 && col < firstDay) {
            let daysInLastMonth = infoLastMonth.days;
            //console.log( checkDiffrentBwMonths,daysInLastMonth);
            daysInLastMonth -= checkDiffrentBwMonths;
            checkDiffrentBwMonths--;
            rows = [...rows,{
              id: Math.random(0,200000),
              day: daysInLastMonth,
              month: infoLastMonth.month,
              year: infoLastMonth.year,
              hasEvent: false,
              _event: {
                title: '',
                desc: ''
              }
            }];
          }
          else if (date > daysInMonth) {
            break;
          }
          else {
            rows = [...rows,{
              id: date,
              day: date,
              month: month,
              year: year,
              hasEvent: false,
              _event: {
                title: '',
                desc: ''
              }
            }];
            date++;
          }
        }
      localStorage.setItem("infoLastMonth",JSON.stringify(infoLastMonth));  
      localStorage.setItem("rows",JSON.stringify(rows));    
    }
}
//${(date === today.getDate() && year === today.getFullYear() && month === today.getMonth())? "class='today'": ""}
  const rows = JSON.parse(localStorage.getItem("rows"));

  return (
    <section className='calendar'>
      <div className='calendar__controls'>
        <input type="submit" value="<" name='beforeMonth' className='calendar__controls__beforeMonth btns' onClick={previous}/>
        {parser(`<label>${months[monthLabel]}</label>`)}
        <input type="submit" value=">" name='afterMonth' className='calendar__controls__afterMonth btns' onClick={next} />
        <input type="submit" name="today" className='calendar__controls__today btns' value="Cегодня"/>
      </div>
      <table className="calendar__body">
        <TableRows rows={rows}/>
      </table>
    </section>
  )
}
export default memo(Table);