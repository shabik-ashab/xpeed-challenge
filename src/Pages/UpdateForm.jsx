import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Form from '../Components/Form/Form';

const UpdateForm = () => {
    const [formData, setFormData] = useState([]);
    let { id } = useParams();
    useEffect(() => {
        const url = `http://localhost/api/get_form.php?id=${id}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => setFormData(data));
      }, []);
      
  return (
    <div>
        <Form formData={formData}  />
    </div>
  )
}

export default UpdateForm