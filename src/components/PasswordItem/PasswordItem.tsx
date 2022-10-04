import React, { useState } from 'react';

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

  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState(password);

  const handleChangePassword = () => {
    setIsEditing(false);
    onEdit(newPassword);
  };

  return (
    <tr key={id}>
      <td>{index + 1}</td>
      <td>{website}</td>
      <td>{login}</td>
      <td
        onClick={() => setCurrentRevealedId(id)}
        onDoubleClick={() => setIsEditing(true)}
      >
        {isEditing ? (
          <>

          </>
        ) : (
          <>
            {currentRevealedId !== id
              ? '*********'
              : `${password}`}
          </>
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
