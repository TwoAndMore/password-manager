import './Notification.scss';
import React from 'react';

type Props = {
  text: string,
};

export const Notification: React.FC<Props> = (props) => {
  const { text } = props;

  return (
    <div className="notification">
      <p className="notification__text">
        {text}
      </p>
    </div>
  );
};
