import React, { forwardRef, useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import styled from 'styled-components';
import axios from 'axios';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Alert from '@material-ui/lab/Alert';

const columns = [
  { title: '_id', field: '_id', hidden: true },
  { title: 'First Name', field: 'first_name' },
  { title: 'Last Name', field: 'last_name' },
  { title: 'Email ', field: 'email' },
  { title: 'Gender', field: 'gender' },
  {
    title: 'Role',
    field: 'role',
  },
];

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const ClientsTable = () => {
  const [data, setData] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const token = window.localStorage.getItem('token');
  useEffect(() => {
    axios
      .get('https://ecomerce-master.herokuapp.com/api/v1/user', {
        headers: { Authorization: `JWT ${token}` },
      })
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((error) => {
        setErrorMessages(['Cannot load user data']);
        setIserror(true);
      });
  }, []);

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = [];
    if (newData.first_name === '') {
      errorList.push('Please enter First name');
    }
    if (newData.last_name === '') {
      errorList.push('Please enter Last name');
    }
    if (newData.email === '') {
      errorList.push('Please enter a valid Email');
    }
    if (newData.gender === '') {
      errorList.push('Please enter a valid Gender');
    }
    if (newData.role !== oldData) {
      errorList.push('You cant change the ROLE');
    }

    if (errorList.length < 1) {
      const { _id, isActive, __v, role, ...toPush } = newData;
      console.log({ ...toPush, ...newData }, 'TOPUSH');
      axios
        .patch(
          `https://ecomerce-master.herokuapp.com/api/v1/user/${newData._id}`,
          toPush,
          {
            headers: { Authorization: `JWT ${token}` },
          }
        )
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = { ...newData, ...toPush };
          console.log(dataUpdate);
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
        })
        .catch(({ response }) => {
          console.log(response.data, response.status);
          setErrorMessages(['Update failed! Server error']);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  return (
    <div className="flex justify-center centerTable items-start mt-8 flex-col ">
      <div>
        {iserror && (
          <Alert severity="error">
            {errorMessages.map((msg, i) => {
              return <div key={i}>{msg}</div>;
            })}
          </Alert>
        )}
      </div>

      <MaterialTable
        title="Tabla de Datos Clientes"
        columns={columns}
        data={data}
        icons={tableIcons}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
        }}
      />
    </div>
  );
};

export default ClientsTable;
