import React, { forwardRef, useEffect, useState, useContext } from 'react';
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
import UserContext from '../contexts/UserContext';
import iconPerson from '../assets/usuario.svg';
import ClientsTable from './ClientsTable';
import { useHistory } from 'react-router-dom';

const columns = [
  { title: '_id', field: '_id', hidden: true },
  { title: 'Product Name', field: 'product_name' },
  { title: 'Description', field: 'description' },
  { title: 'Category ', field: 'category' },
  { title: 'Price', field: 'price', type: 'currency' },
  {
    title: 'Image URL',
    field: 'image',
    cellStyle: {
      maxWidth: '100px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
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
const styles = {
  largeIcon: {
    width: 60,
    height: 60,
  },
};
const Admin = () => {
  const { setIsLoginClicked } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [view, setView] = useState(true);
  useEffect(() => {
    setIsLoginClicked(true);
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

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = [];
    if (newData.product_name === undefined) {
      errorList.push('Please enter Product Name');
    }
    if (newData.description === undefined) {
      errorList.push('Please enter Description');
    }
    if (newData.category === undefined) {
      errorList.push('Please enter a Category');
    }

    if (newData.category === undefined) {
      errorList.push('Please enter a Price');
    }

    const token = window.localStorage.getItem('token');

    if (errorList.length < 1) {
      //no error
      console.log({ ...newData, headers: { Authorization: `JWT ${token}` } });
      axios
        .post(
          'https://ecomerce-master.herokuapp.com/api/v1/item',
          { ...newData, sku: Date.now() },
          {
            headers: { Authorization: `JWT ${token}` },
          }
        )
        .then((res) => {
          console.log(res);
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve();
          setErrorMessages([]);
          setIserror(false);
        })
        .catch((error) => {
          console.log(error);
          setErrorMessages(['Cannot add data. Server error!']);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };
  const history = useHistory();
  const handleOnClickHome = () => {
    history.push('/');
  };

  return (
    <ContainerAdmin>
      <SideBar>
        <Logo>
          <img
            src={iconPerson}
            style={{ width: '100px', fill: 'white' }}
            alt="iconPerson"
          />
        </Logo>

        <Home onClick={handleOnClickHome}>Home</Home>

        <Clients onClick={() => setView(false)}>Clients</Clients>

        <Products oncClick={() => setView(true)}>Products</Products>
      </SideBar>

      {view ? (
        <div className="flex justify-center centerTable items-start mt-8  ">
          <MaterialTable
            title="Tabla de Datos Productos"
            columns={columns}
            data={data}
            icons={tableIcons}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  handleRowAdd(newData, resolve);
                }),
            }}
          />
        </div>
      ) : (
        <ClientsTable />
      )}
    </ContainerAdmin>
  );
};

export default Admin;

const Logo = styled.div`
  /* width: 100px; */
  /* max-width: 50%; */
`;

const ContainerAdmin = styled.div`
  background-color: #f5f7fa;
  display: flex;
`;

const SideBar = styled.div`
  width: 400px;
  height: 100vh;
  background-color: #9e99ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 36px;
  font-weight: 700;
  color: white;
  div {
    margin-top: 48px;
    cursor: pointer;
  }
`;

const Home = styled.div``;

const Clients = styled.div``;

const Products = styled.div``;
