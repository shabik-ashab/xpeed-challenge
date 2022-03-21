import React, { useEffect, useMemo, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";

const Table = ({ rowData, headerData, tableHeader }) => {
  const [order, setOrder] = useState("asc");
  const [rowD, setRowD] = useState(rowData);
  const [searchData,setSearchData] = useState(rowData);

  const handleSearch = (event, col) => {
    const searchText = event.target.value;
    
    const matchedProducts = searchData.filter((product) =>
      product[col]
        .toString()
        .toLowerCase()
        .includes(searchText.toString().toLowerCase())
    );
    setRowD(matchedProducts);
  };

  const sorting = (col, sortable) => {
    const sorted = [...rowD];

    if (sortable === "false") {
      return;
    }

    if (order === "asc") {
      sorted.sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setRowD(sorted);
      setOrder("dsc");
    }
    if (order === "dsc") {
      sorted.sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setRowD(sorted);
      setOrder("asc");
    }
  };


// const tifOptions = Object.entries(tableHeader[0]).map(key => 
//     console.log(key)

// )

  const handleDragEnd = (results) => {
    if (!results.destination) return;
    let temp = [...rowD];
    let [selectedRow] = temp.splice(results.source.index, 1);
    temp.splice(results.destination.index, 0, selectedRow);
    setRowD(temp);
    fetch("http://localhost/api/reorder.php ", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(temp),
      })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
          if (data.status === 'success') {
            alert('ok')
          }
        });
  };
 
  return (
    <div className="mt-5" >
        <div>
        <h5>Search Field :</h5>
   {
       Object.entries(tableHeader[0]).map( (th,i) => (
        <div key={i} >
        {
            th[1].searchable &&
            <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              {th[1].title}
            </span>
            <input
              onChange={(e) => handleSearch(e, `${th[0].toLowerCase()}`)}
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
        }
    </div>
       )
       
    )
   }
      </div>

      <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
        <table className="table mt-4">
          <thead>
            <tr>
               {
        Object.entries(tableHeader[0]).map(th => {
            return (
              !th[1].hidden && (
                <th
                  onClick={() =>
                    sorting(`${th[0].toLowerCase()}`, `${th[1].sortable}`)
                  }
                  key={th[1].title}
                >
                  {th[1].title}
                </th>
              )
            );
          }
        )
    }
            <th>
                Update
            </th>
            </tr>
          </thead>
          <Droppable droppableId="tbody">
            {(provided) => (
              <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {rowD.map((tr, i) => (
                  <Draggable draggableId={tr.name} key={tr.id} index={i}>
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {!headerData[0].hidden && <td>{tr.id}</td>}
                        {!headerData[1].hidden && <td>{tr.name}</td>}
                        {!headerData[2].hidden && <td>{tr.message}</td>}
                        {!headerData[3].hidden && <td>{tr.created_at}</td>}
                        <td>
                            <Link to={`/form/${tr.id}`} >
                            <button className="btn btn-primary " >Update</button> 
                            </Link>
                        </td>
                      </tr>
                    )}

                  </Draggable>
                ))}
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
