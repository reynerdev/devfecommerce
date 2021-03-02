import axios from 'axios';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import LogoDevf from '../assets/DEVF.svg';
import iconLogo from '../assets/ManStandUp.svg';
import useForm, { TYPEFORM } from '../hooks/useForm.js';
import { useHistory } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import getUserInfo from '../utils/getUserInfo';

// import 'animate.min.css';
const Login = () => {
  const [inputs, handleInputs] = useForm(TYPEFORM.logIn);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const history = useHistory();

  const { setIsLoginClicked, setUser, user } = useContext(UserContext);

  const sendForm = (inputs) => {
    console.log('sendForm');
    axios
      .post('https://ecomerce-master.herokuapp.com/api/v1/login', {
        email: inputs.user,
        password: inputs.password,
      })
      .then(function (response) {
        console.log(response);

        const { token } = response.data;

        window.localStorage.setItem('token', token);
        setIsLoginClicked(false);

        return token;
      })
      .then((token) => {
        console.log(token, 'TOKENNNN');
        const config = {
          headers: {
            Authorization: `JWT ${token}`,
          },
        };
        return axios.get(
          'https://ecomerce-master.herokuapp.com/api/v1/user/me',
          config
        );
      })
      .then((data, status) => {
        console.log(data, 'DATA');
        const userData = data.data;
        setUser({
          ...user,
          name: userData.user.first_name,
          last_name: userData.user.last_name,
          _id: userData.user._id,
          role: userData.user.role,
        });
        history.push('/');
      })
      .catch(function (error) {
        setIsLoginFailed(true);
        console.log(error, 'ERROR');
      });
  };

  const handleSubmit = (e) => {
    console.log('Handle Submit');
    e.preventDefault();

    sendForm(inputs);
  };

  const handleOnClickSignUp = () => {
    history.push('/signup');
  };

  return (
    <LoginWrapper>
      <LoginForm onSubmit={handleSubmit}>
        <StandUpLogoWrapper>
          <img src={iconLogo} alt="StandUpLogo" />
        </StandUpLogoWrapper>
        <Logo>
          <img src={LogoDevf} alt="Logo Devf" width="200px" />
        </Logo>
        <UserInput>
          <div>Usuario</div>
          <input
            type="text"
            value={inputs.user}
            required
            onChange={handleInputs}
            placeholder="Ingrese Usuario"
            id="user"
          />
        </UserInput>

        <UserInput>
          <div>Contraseña</div>
          <input
            value={inputs.password}
            type="password"
            onChange={handleInputs}
            required
            placeholder="Ingrese Contraseña"
            id="password"
          />
        </UserInput>

        {isLoginFailed && <ButtonIncorrect>INCORRECTO</ButtonIncorrect>}

        <Button type="submit">INICIAR SESIÓN</Button>

        <ButtonRegistrarse type="submit" onClick={handleOnClickSignUp}>
          REGÍSTRATE
        </ButtonRegistrarse>
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

const StandUpLogoWrapper = styled.div`
  position: absolute;
  top: 225px;
  left: -300px;
`;

const LoginForm = styled.form`
  background-color: #4c45b3;
  width: 600px;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 120px;
  position: relative;
`;

const UserInput = styled.div`
  margin-bottom: 36px;
  width: 100%;
  input {
    font-size: 16px;
    width: 100%;
    height: 48px;
    /* color: #9e99ff; */
    font-weight: 700;
    padding-left: 18px;
    :focus {
      outline: none;
    }
  }

  div {
    color: white;
    font-weight: 700;
    margin-bottom: 12px;
    font-size: 20px;
  }
`;
const Logo = styled.div`
  margin-bottom: 48px;
`;

const Button = styled.button`
  width: 100%;
  height: 48px;
  background-color: #ffee67;
  font-weight: 700;
  display: flex;
  align-items: center;
  margin-bottom: 36px;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px hsla(0, 0%, 0%, 0.2);
  :active {
    box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.2);
  }

  :focus {
    outline: none;
  }
`;

const ButtonIncorrect = styled.div`
  width: 100%;
  height: 48px;
  background-color: #ff7467;
  color: white;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 36px;
  cursor: pointer;
`;

const ButtonRegistrarse = styled.div`
  background-color: #ceccff;
  width: 100%;
  height: 48px;
  font-weight: 700;
  display: flex;
  align-items: center;
  margin-bottom: 36px;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px hsla(0, 0%, 0%, 0.2);
  :active {
    box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.2);
  }

  :focus {
    outline: none;
  }
`;
export default Login;
