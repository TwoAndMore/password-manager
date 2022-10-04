import './Login.scss';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { User } from '../../types/User';
import { getUserByData } from '../../api/users';
import { InputField } from '../InputField/InputField';
import { Notification } from '../Notification/Notification';
import { Loader } from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';

type Props = {
  onLogin: CallableFunction,
};

export const Login: React.FC<Props> = (props) => {
  const { onLogin } = props;

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const saveUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    onLogin(user);

    navigate('/dashboard');
  };

  const loadUser = async () => {
    const user = await getUserByData(login, password);

    if (user) {
      saveUser(user);
    } else {
      setErrorMessage('Incorrect login or password');
    }
  };

  const canLogin = useMemo(() => {
    if (login.trim().length <= 0) {
      return false;
    }

    if (password.trim().length <= 0) {
      return false;
    }

    return true;
  }, [login, password]);

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
      await loadUser();
    } catch (error) {
      setErrorMessage('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (!userData) {
      return;
    }

    const user = JSON.parse(userData) as User;

    onLogin(user);
  }, []);

  return (
    <div className="login">
      <h1 className="login__title title">Sign in</h1>

      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__input">
          <InputField
            id="login-login"
            type="text"
            label="Login"
            isRequired
            placeholder="Enter your login"
            value={login}
            onChange={handleLogin}
          />
        </div>

        <div className="login__input">
          <InputField
            id="login-password"
            type="password"
            label="Password"
            isRequired
            placeholder="Enter your password"
            value={password}
            onChange={handlePassword}
          />
        </div>

        <button
          type="submit"
          className="login__button button"
          disabled={!canLogin}
        >
          {isLoading ? <Loader /> : 'Login'}
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
