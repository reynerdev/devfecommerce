import './App.css';
import MainContent from './components/MainContent';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserContext, { UserProvider } from './contexts/UserContext';
import Login from './components/Login';
import { useContext, useState } from 'react';

// import ProductCard from './components/ProductCard';

function App() {
  // const { isLoginClicked } = useContext(UserContext);

  const [isLoginClicked, setIsLoginClicked] = useState(false);

  return (
    <>
      <UserProvider>
        <Router>
          {/* <Navbar /> */}
          {!isLoginClicked ? (
            <Navbar setIsLoginClicked={setIsLoginClicked} />
          ) : (
            <></>
          )}
          <Switch>
            <Route exact path="/" component={MainContent} />
            <Route exact path="/login" component={Login} />
            {/* <MainContent /> */}
            {/* <ProductCard /> */}
          </Switch>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
