import React, { useState } from 'react';
import styled from 'styled-components';
import LogoDevf from '../assets/DEVF.svg';
import iconLogo from '../assets/ManStandUp.svg';
import useForm, { TYPEFORM } from '../hooks/useForm';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const SignUp = () => {
  const [inputs, handleInputs] = useForm(TYPEFORM.signUp);
  const [isPasswordOk, setIsPasswordOk] = useState(true);
  const history = useHistory();
  const sendForm = (inputs) => {
    console.log('sendForm');

    if (inputs.password === inputs.password_confirmation) {
      axios
        .post('https://ecomerce-master.herokuapp.com/api/v1/signup', {
          first_name: inputs.name,
          last_name: inputs.lastname,
          email: inputs.user,
          password: inputs.password,
        })
        .then(function (response) {
          console.log(response);
          if (inputs.password === inputs.password_confirmation) {
            history.push('/login');
          }
        })
        .catch(function (error) {
          setIsPasswordOk(false);
          console.log(error.response.data, 'ERROR');
        });
    } else {
      setIsPasswordOk(false);
    }
  };

  const handleSubmit = (e) => {
    console.log('Handle Submit');
    e.preventDefault();

    sendForm(inputs);
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
          <div>Nombre</div>
          <input
            type="text"
            value={inputs.name}
            onChange={handleInputs}
            required
            placeholder="Ingrese Nombre"
            id="name"
          />
        </UserInput>

        <UserInput>
          <div>Apellido</div>
          <input
            type="text"
            value={inputs.lastname}
            onChange={handleInputs}
            required
            placeholder="Ingrese Apellido"
            id="lastname"
          />
        </UserInput>

        <UserInput>
          <div>Usuario</div>
          <input
            type="text"
            required
            value={inputs.user}
            onChange={handleInputs}
            placeholder="Ingrese Usuario"
            id="user"
          />
        </UserInput>

        <UserInput>
          <div>Contraseña</div>
          <input
            type="password"
            value={inputs.password}
            onChange={handleInputs}
            required
            placeholder="Ingrese Contraseña"
            id="password"
          />
        </UserInput>
        <UserInput>
          <div>Vuelva a ingresar contraseña</div>
          <input
            type="password"
            value={inputs.password_confirmation}
            onChange={handleInputs}
            required
            placeholder="Ingrese Contraseña"
            id="password_confirmation"
          />
        </UserInput>
        {!isPasswordOk && <Incorrect>Las contraseñas son iguales !</Incorrect>}

        <Button type="submit"> REGISTRARSE !</Button>
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
  bottom: 0px;
  left: -300px;
`;

const LoginForm = styled.form`
  background-color: #4c45b3;
  width: 600px;
  /* height: 600px; */
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
  margin-bottom: 36px;
`;

const Button = styled.button`
  width: 100%;
  height: 48px;
  background-color: #ffee67;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 36px;
`;

const Incorrect = styled.div`
  margin-top: 12px;
  width: 100%;
  height: 48px;
  background-color: #ff7467;
  color: white;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 36px;
`;

export default SignUp;
