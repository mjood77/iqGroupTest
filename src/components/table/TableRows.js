import React, { Fragment, memo } from 'react'
import parser from 'html-react-parser'
import TableCells from './TableCells';
function TableRows({rows}) {
    const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    const thead = rows.filter((item,index) => {if(index <= 6) return item});
    const tbody = rows.filter((item,index) => {if(index > 6) return item});
    const infoLastMonth = JSON.parse(localStorage.getItem("infoLastMonth"));
    var counter = 0,counter2 =6;
    var firstLoopFinshed  = false;
    var content=[],clearContent=[];
    return (

    <Fragment>
        <thead>
            <tr>
                {thead.map((cell,index) => {
                    return (<th key={cell.id}>{cell.day}  {days[index]}</th>)
                })}
            </tr>       
        </thead>
        <tbody>
            {
                tbody.map((item,index) => {
                    console.log(counter,counter2);
                    if(counter === counter2 && firstLoopFinshed === false){
                        console.log("step 2")
                        clearContent = [];
                        counter2 += 7;
                        clearContent = [...content];
                        console.log(clearContent);
                        content = [];
                        return(<TableCells key={index}cells={clearContent} />)
                    } 
                    else{
                        if(counter === counter2) firstLoopFinshed = true;
                        else firstLoopFinshed = false;
                        content = [...content,item];
                        counter++;
                    }
                })
            }
        </tbody>
    </Fragment>
    )
}
export default memo(TableRows);