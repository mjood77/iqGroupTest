import React, { memo } from 'react'

function TableCells({cells}) {
    const statemnts = (qestion,firstValue,sectionValue) =>{
        return (qestion ? firstValue : sectionValue);
    }
  return (
    <tr>
        {cells.map((cell,index) =>{
            return (<td key={cell.id}>{cell.day}</td>);
        })}
    </tr>
  )
}
export default memo(TableCells)