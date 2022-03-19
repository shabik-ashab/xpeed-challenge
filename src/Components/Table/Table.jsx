import React, { useEffect, useMemo, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Table = ({ rowData, headerData }) => {
  const [order, setOrder] = useState("asc");
  const [rowD, setRowD] = useState(rowData);


  const sorting = (col, sortable) => {
    // console.log(col);
    // const col = col.toLowerCase();
    const sorted = [...rowD]
    // console.log();
    console.log(order);
    if(sortable === 'false'){
        console.log(sortable);
        return
    }
 
    if (order === "asc" ) {
        sorted.sort((a, b) =>
        a[col] > b[col] ? 1 : -1);
      setRowD(sorted);
      setOrder("dsc");
    }
    if (order === "dsc" ) {
        sorted.sort((a, b) =>
        a[col] < b[col] ? 1 : -1);
      setRowD(sorted);
      setOrder("asc");
    }
  };

  let dataDetails = {};
  //sortable
  if (headerData[0].sortable) {
    const idSortable = {};
  }

  const handleDragEnd = (results) => {
      if(!results.destination) return;
      let temp = [...rowD]
      let [selectedRow] = temp.splice(results.source.index,1)
      console.log(selectedRow);
      temp.splice(results.destination.index,0,selectedRow)
      setRowD(temp);
  }
  return (
    <div>
         <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
      <table className="table">
        <thead>
          <tr>
            {headerData?.map((th, i) => {
              return (
                !th.hidden && (
                  <th onClick={() => sorting(`${th.title.toLowerCase()}`,`${th.sortable}`)} key={th.title}>
                    {th.title}
                  </th>
                )
              );
            })}
          </tr>
        </thead>
        <Droppable droppableId="tbody">
          {(provided) => (
            <tbody ref={provided.innerRef} {...provided.droppableProps}>
              {rowD.map((tr, i) =>  (
                    <Draggable draggableId={tr.name} key={tr.id} index={i}  >
                        {
                            (provided) => (
                                <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                {!headerData[0].hidden && <td>{tr.id}</td>}
                                {!headerData[1].hidden && <td>{tr.name}</td>}
                                {!headerData[2].hidden && <td>{tr.message}</td>}
                                {!headerData[3].hidden && <td>{tr.created_at}</td>}
                                {/* {provided.placeholder} */}
                              </tr>
                            )
                        }
                 
                  </Draggable>
                )
              )}
               {provided.placeholder} 
            </tbody>
          )}
        </Droppable>
      </table>
      </DragDropContext>
    </div>
  );
};

export default Table;
