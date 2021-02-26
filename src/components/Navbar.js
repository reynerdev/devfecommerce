import React, { useContext } from 'react';
import styled from 'styled-components';
import LogoDevf from '../assets/DEVF.svg';
import SearchIcon from '@material-ui/icons/Search';
import CartIcon from '../assets/Cart.svg';
import UserContext from '../contexts/UserContext';
import { Link, useHistory } from 'react-router-dom';
const Navbar = ({ setIsLoginClicked }) => {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const { isLoginClicked } = useContext(UserContext);

  const handleLoginClick = () => {
    setIsLoginClicked(true);
    history.push('/login');
  };

  return (
    <div className="navbar ">
      <div className="navbar-container ">
        <LogoWrapper>
          <img src={LogoDevf} alt="LOGO DEVF" />
        </LogoWrapper>
        <SearchWrapper>
          <SearchBarWrapper>
            <SearchIcon />
            <input type="text" placeholder="Search Products" />
          </SearchBarWrapper>
        </SearchWrapper>

        <LeftWrapper>
          <Home>{user ? `Bienvenido ${user.name}!` : 'Bienvenido'} </Home>

          <Cart>
            <img src={CartIcon} alt="Cart Icon" />
          </Cart>

          {user ? (
            <Button onClick={handleLoginClick}>Login</Button>
          ) : (
            <Button>Log Out</Button>
          )}
        </LeftWrapper>
      </div>
    </div>
  );
};

export default Navbar;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
`;

const SearchWrapper = styled.div``;
const SearchBarWrapper = styled.div`
  margin-left: 32px;
  background-color: #f1f3f4;
  width: 100%;
  display: grid;
  grid-template-columns: 15% auto;
  max-width: 300px;
  border-radius: 5px;
  height: 35px;
  place-items: center;

  input {
    width: 100%;
    font-size: 18px;
    background: none;
    :focus {
      outline: none;
    }
  }
`;
const LeftWrapper = styled.div`
  display: flex;
  align-items: center;

  div {
    margin-left: 32px;
    cursor: pointer;
  }
  justify-self: end;
`;
const Home = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 700;
`;
const Cart = styled.div``;
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff7467;
  width: 108px;
  height: 33px;
  color: white;
  font-weight: 700;
  cursor: pointer;
`;
