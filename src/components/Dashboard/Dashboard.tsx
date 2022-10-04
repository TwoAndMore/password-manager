import './Dashboard.scss';
import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { PasswordModule } from '../../types/PasswordModule';
import { useNavigate } from 'react-router-dom';
import { createPassword, deletePassword, getPasswords, updatePassword } from '../../api/passwordItems';
import { Loader } from '../Loader/Loader';
import { PasswordItem } from '../PasswordItem/PasswordItem';
import { InputField } from '../InputField/InputField';
import { User } from '../../types/User';

type Props = {
  user: User,
  setUser: CallableFunction,
};

export const Dashboard: React.FC<Props> = (props) => {
  const { user, setUser } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<PasswordModule[]>([]);
  const [currentRevealedId, setCurrentRevealedId] = useState(0);
  const [isCreating, setIsCreating] = useState(false);

  const [website, setWebsite] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigate();

  const handleDeletePassword = (itemId: number): void => {
    deletePassword(itemId)
      .then(() => {
        setItems((prev: PasswordModule[]) => prev.filter(item => item.id !== itemId));
      });
  };

  const handleUpdatePassword = (
    itemId: number,
    newPassword: string,
  ): void => {
    updatePassword(itemId, {
      title: newPassword,
    })
      .then(() => setItems((prev: PasswordModule[]) => prev.map(oldPassword => {
        if (oldPassword.id === itemId) {
          return {
            ...oldPassword,
            password: newPassword,
          };
        }

        return oldPassword;
      })));
  };

  const handleCreatePasswordItem = async (
    event: FormEvent,
    newWebsite: string,
    newLogin: string,
    newPassword: string,
  ) => {
    event.preventDefault();

    if (!user) {
      return;
    }

    const optimisticResponseId = -(items.length);
    const optimisticPassword = {
      id: optimisticResponseId,
      userId: user.id,
      website: newWebsite,
      login: newLogin,
      password: newPassword,
    };

    setItems((prev: PasswordModule[]) => [...prev, optimisticPassword]);

    const createdItem = await createPassword({
      userId: user.id,
      website: newWebsite,
      login: newLogin,
      password: newPassword,
    }) as PasswordModule;

    setItems((prev: PasswordModule[]) => prev.map(item => {
      return item.id === optimisticResponseId
        ? createdItem
        : item;
    }));
  };

  const handleExitClick = () => {
    localStorage.clear();
    setUser(null);
    navigation('/login');
  };

  const handleOpenWindow = () => setIsCreating(true);
  const handleCloseWindow = () => setIsCreating(false);

  const canCreate = useMemo(() => {
    if (website.trim().length <= 0) {
      return false;
    }

    if (login.trim().length <= 0) {
      return false;
    }

    if (password.trim().length <= 0) {
      return false;
    }

    return true;
  }, [login, password, website]);

  const ClearFields = () => {
    setWebsite('');
    setLogin('');
    setPassword('');
  };

  const handleSubmitCreation = (event: FormEvent) => {
    handleCreatePasswordItem(event, website, login, password)
      .then(() => {
        ClearFields();
        setIsCreating(false);
      });
  };

  useEffect(() => {
    if (user) {
      setIsLoading(true);

      getPasswords(user.id)
        .then(setItems)
        .finally(() => setIsLoading(false));
    }
  }, []);

  return (
    <div className="dashboard">
      <h1 className="dashboard__title title">
        Dashboard
      </h1>

      <button
        className="dashboard__create-button button"
        type="button"
        onClick={handleOpenWindow}
      >
        New
      </button>

      {isCreating && (
        <div className="dashboard__create">
          <form
            className="dashboard__form"
            onSubmit={handleSubmitCreation}
          >
            <div className="dashboard__input">
              <InputField
                id="create-website"
                type="text"
                label="Website"
                isRequired
                placeholder="Enter website"
                value={website}
                onChange={setWebsite}
              />
            </div>

            <div className="dashboard__input">
              <InputField
                id="create-login"
                type="text"
                label="Login"
                isRequired
                placeholder="Enter your login"
                value={login}
                onChange={setLogin}
              />
            </div>

            <div className="dashboard__input">
              <InputField
                id="create-password"
                type="password"
                label="Password"
                isRequired
                placeholder="Enter your password"
                value={password}
                onChange={setPassword}
              />
            </div>

            <button
              className="button"
              type="submit"
              disabled={!canCreate}
            >
              Create
            </button>

            <button
              className="dashboard__create-close"
              type="button"
              onClick={handleCloseWindow}
            >
              X
            </button>
          </form>
        </div>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div className="dashboard__list">
          <table className="dashboard__table">
            <thead>
              <tr>
                <th>№</th>
                <th>Web-site</th>
                <th>Login</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <PasswordItem
                  key={item.id}
                  id={item.id}
                  index={index}
                  website={item.website}
                  login={item.login}
                  password={item.password}
                  onEdit={handleUpdatePassword}
                  onDelete={handleDeletePassword}
                  currentRevealedId={currentRevealedId}
                  setCurrentRevealedId={setCurrentRevealedId}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        className="dashboard__exit button"
        type="button"
        onClick={handleExitClick}
      >
        Exit
      </button>
    </div>
  );
};
