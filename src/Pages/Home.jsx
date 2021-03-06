import React, { useEffect, useState } from "react";
import TableList from '../Components/TableList/TableList'

const Home = () => {
    const [tableData, setTableData] = useState([]);
  // const [thData,setThData] = useState({})
  useEffect(() => {
    const url = `http://localhost/api/list.php`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setTableData(data));
  }, []);
  return (
    <div>
      
        <TableList tableData={tableData} />
    </div>
  )
}

export default Home