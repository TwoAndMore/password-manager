import './InputField.scss';
import React from 'react';

type Props = {
  id: string,
  type: 'text' | 'password',
  label: string,
  isRequired: boolean,
  placeholder: string,
  value: string,
  onChange: CallableFunction,
};

export const InputField: React.FC<Props> = (props) => {
  const {
    id,
    type,
    placeholder,
    label,
    isRequired,
    value,
    onChange,
  } = props;

  return (
    <div className="inputField">
      <label htmlFor={id} className="inputField__label">
        <p className="inputField__label-text">{label}</p>

        <input
          className="inputField__input"
          id={id}
          type={type}
          placeholder={placeholder}
          required={isRequired}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
};
