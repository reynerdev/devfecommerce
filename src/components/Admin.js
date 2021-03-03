import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
const columns = [
  { title: '_id', field: '_id', hidden: true },
  { title: 'Product Name', field: 'product_name' },
  { title: 'Description', field: 'description' },
  { title: 'Category ', field: 'category' },
  { title: 'Price', field: 'price', type: 'currency' },
  { title: 'Image URL', field: 'image' },
];

const Admin = () => {
  const [data, setData] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  useEffect(() => {
    axios
      .get('https://ecomerce-master.herokuapp.com/api/v1/item')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((error) => {
        setErrorMessages(['Cannot load user data']);
        setIserror(true);
      });
  }, []);

  //for error handling

  return (
    <div>
      <MaterialTable
        title="User data from remote source"
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default Admin;
