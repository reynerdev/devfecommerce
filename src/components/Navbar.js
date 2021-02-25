import React from 'react';
import styled from 'styled-components';
import LogoDevf from '../assets/DEVF.svg';
const Logo = styled.div``;

const Navbar = () => {
  return (
    <div className="navbar ">
      <div className="navbar-container ">dasdasdasd</div>
      <Logo>
        <img src={LogoDevf} alt="LOGO DEVF" />
      </Logo>
    </div>
  );
};

export default Navbar;
