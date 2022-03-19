import { useEffect, useMemo, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Table from "../Table/Table";

const TableList = ({ tableData }) => {
  if (!tableData.data) {
    return <p>loading</p>;
  }

  const tableHeader = tableData?.data?.headers;
  const tableRow = tableData?.data?.rows;
  const rowData = Object.entries(tableRow).map((arr) => arr[1]);
  //  useEffect(() => {},[])

  const headerData = Object.entries(tableHeader[0]).map((arr) => arr[1]);

  console.log(headerData);
//   console.log(tableHeader[0]);

  return (
    <div className="container">
     
        <Table rowData={rowData} headerData={headerData} tableHeader={tableHeader} />

    </div>
  );
};

export default TableList;
