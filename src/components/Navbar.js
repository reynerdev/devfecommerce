import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import LogoDevf from '../assets/DEVF.svg';
import SearchIcon from '@material-ui/icons/Search';
import CartIcon from '../assets/Cart.svg';
import UserContext from '../contexts/UserContext';
import { Link, useHistory } from 'react-router-dom';
import circleCounter from '../assets/circleCounter.svg';
const Navbar = () => {
  const {
    user,
    setUser,
    setIsLoginClicked,
    shoppingCarItems,
    shoppingCartCount,
    setShoppingCartCount,
  } = useContext(UserContext);
  const history = useHistory();

  const handleLoginClick = () => {
    setIsLoginClicked(true);
    history.push('/login');
  };

  useEffect(() => {
    console.log('NavBar');
  });

  const handleLoginOut = () => {
    setUser(null);
    window.localStorage.removeItem('token');
  };

  const handleOnClickCart = () => {
    history.push('/cart');
  };

  const handleOnClickLogo = () => {
    history.push('/');
  };

  return (
    <div className="navbar ">
      <div className="navbar-container ">
        <LogoWrapper onClick={handleOnClickLogo} style={{ cursor: 'pointer' }}>
          <img src={LogoDevf} alt="LOGO DEVF" />
        </LogoWrapper>
        <SearchWrapper>
          <SearchBarWrapper>
            <SearchIcon />
            <input type="text" placeholder="Search Products" />
          </SearchBarWrapper>
        </SearchWrapper>

        <LeftWrapper>
          <Home>
            {user ? `Bienvenido ${user.name} ${user.last_name}!` : 'Bienvenido'}{' '}
          </Home>

          <Cart onClick={handleOnClickCart}>
            <CircleCounter className="circleCounter">
              {shoppingCartCount}
            </CircleCounter>
            <img src={CartIcon} alt="Cart Icon" />
          </Cart>

          {user ? (
            <Button onClick={handleLoginOut}>Log Out</Button>
          ) : (
            <Button onClick={handleLoginClick}>Login</Button>
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

    div {
      margin-left: 0px;
    }
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
const Cart = styled.div`
  position: relative;
  img {
    z-index: 1;
  }
`;
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

const CircleCounter = styled.div`
  margin-left: 0px;
  height: 22px;
  width: 22px;
  position: absolute;
  top: -15px;
  right: -15px;
  background-image: url(${circleCounter});
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 700;
  font-size: 14px;
`;
