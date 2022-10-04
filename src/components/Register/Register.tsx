import './Register.scss';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../InputField/InputField';
import { createUser, isLoginAvailable } from '../../api/users';
import { Notification } from '../Notification/Notification';
import { Loader } from '../Loader/Loader';

export const Register: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const canRegister = useMemo(() => {
    if (login.trim().length <= 0) {
      return false;
    }

    if (password.trim().length <= 0) {
      return false;
    }

    return true;
  }, [login, password]);

  const clearInputs = () => {
    setLogin('');
    setPassword('');
  };

  const registerUser = () => {
    return createUser({ login, password })
      .then(() => {
        setErrorMessage('User was created');

        setTimeout(() => {
          navigate('/');
        }, 1000);
      })
      .catch(() => setErrorMessage('Something went wrong'));
  };

  const handleLogin = (value: string) => {
    setLogin(value);
    setErrorMessage('');
  };

  const handlePassword = (value: string) => {
    setPassword(value);
    setErrorMessage('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage('');
    setIsLoading(true);

    try {
      const canCreateUser = await isLoginAvailable(login);

      if (canCreateUser) {
        await registerUser();
      } else {
        setErrorMessage('A user with this login already exists');
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
    } finally {
      clearInputs();
    }
  };

  return (
    <div className="register">
      <h1 className="register__title title">Registration</h1>

      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__input">
          <InputField
            id="register-login"
            type="text"
            label="Login"
            isRequired
            placeholder="Create a login"
            value={login}
            onChange={handleLogin}
          />
        </div>

        <div className="register__input">
          <InputField
            id="register-password"
            type="password"
            label="Password"
            isRequired
            placeholder="Create a password"
            value={password}
            onChange={handlePassword}
          />
        </div>

        <button
          type="submit"
          className="register__button button"
          disabled={!canRegister}
        >
          {isLoading ? <Loader /> : 'Register'}
        </button>
      </form>

      {errorMessage.length !== 0 && (
        <div className="login__message">
          <Notification text={errorMessage} />
        </div>
      )}
    </div>
  );
};
