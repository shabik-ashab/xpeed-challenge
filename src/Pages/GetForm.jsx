import React, { useEffect, useState } from 'react'
import Form from '../Components/Form/Form'

const GetForm = () => {
    const [formData, setFormData] = useState([]);
    useEffect(() => {
      const url = `http://localhost/api/get_form.php`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setFormData(data));
    }, []);
  return (
    <div>
        <Form formData={formData} />
    </div>
  )
}

export default GetForm