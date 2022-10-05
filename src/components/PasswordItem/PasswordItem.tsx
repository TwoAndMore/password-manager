import React, { useEffect, useRef, useState } from 'react';

type Props = {
  id: number,
  index: number,
  website: string,
  login: string,
  password: string,
  currentRevealedId: number,
  setCurrentRevealedId: CallableFunction,
  onEdit: CallableFunction,
  onDelete: CallableFunction,
};

export const PasswordItem: React.FC<Props> = (props) => {
  const {
    id,
    index,
    website,
    login,
    password,
    onEdit,
    onDelete,
    currentRevealedId,
    setCurrentRevealedId,
  } = props;

  const [isChanging, setIsChanging] = useState(false);
  const [newPassword, setNewPassword] = useState(password);

  const editField = useRef<HTMLInputElement>(null);

  const handleChangePassword = () => {
    setIsChanging(false);
    onEdit(id, newPassword);
  };

  useEffect(() => {
    if (editField.current) {
      editField.current.focus();
    }
  }, [isChanging]);

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{website}</td>
      <td>{login}</td>
      <td style={{ width: '100px' }}>
        {isChanging ? (
          <form onSubmit={handleChangePassword}>
            <input
              className="dashboard__input-change"
              type="text"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              onBlur={handleChangePassword}
              ref={editField}
            />
          </form>
        ) : (
          <button
            className="dashboard__password-button"
            type="button"
            onClick={() => setCurrentRevealedId(id)}
            onDoubleClick={() => setIsChanging(true)}
          >
            {currentRevealedId !== id
              ? '************'
              : `${password}`}
          </button>
        )}
      </td>
      <td>
        <button
          className="dashboard__delete"
          type="button"
          onClick={() => onDelete(id)}
          title="Delete"
        >
          X
        </button>
      </td>
    </tr>
  );
};
