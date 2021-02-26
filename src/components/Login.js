import React from 'react';
import styled from 'styled-components';
import LogoDevf from '../assets/DEVF.svg';
const Login = () => {
  return (
    <LoginWrapper>
      <LoginForm>
        <Logo>
          <img src={LogoDevf} alt="Logo Devf" width="200px" />
        </Logo>
        <UserInput>
          <div>Usuario</div>
          <input type="text" placeholder="Ingrese Usuario" />
        </UserInput>

        <UserInput>
          <div>Contraseña</div>
          <input type="text" placeholder="Ingrese Contraseña" />
        </UserInput>
      </LoginForm>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  background-color: #6c63ff;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.div`
  background-color: #4c45b3;
  width: 600px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 120px;
`;

const UserInput = styled.div`
  margin-bottom: 36px;
  width: 100%;
  input {
    width: 100%;
    height: 48px;
  }
`;
const Logo = styled.div`
  margin-bottom: 48px;
`;
export default Login;
