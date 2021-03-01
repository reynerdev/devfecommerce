import './App.css';
import MainContent from './components/MainContent';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import UserContext from './contexts/UserContext';
import Login from './components/Login';
import { useContext, useState } from 'react';
import Admin from './components/Admin';
import SignUp from './components/SignUp';
import Item from './components/Item';
import Cart from './components/Cart';
// import ProductCard from './components/ProductCard';

function App() {
  const { isLoginClicked } = useContext(UserContext);

  return (
    <>
      <Router>
        {/* <Navbar /> */}
        {!isLoginClicked ? <Navbar /> : <></>}
        <Switch>
          <Route
            exact
            path="/"
            component={MainContent}
            // render={(props) => {
            //   <MainContent {...props} />;
            // }}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/item/:id" component={Item} />
          <Route exact path="/cart" component={Cart} />

          {/* <MainContent /> */}
          {/* <ProductCard /> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
