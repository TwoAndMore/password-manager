import './Notification.scss';
import React from 'react';
import classNames from 'classnames';

type Props = {
  text: string,
  isGreen?: boolean,
};

export const Notification: React.FC<Props> = (props) => {
  const { text, isGreen } = props;

  return (
    <div
      className={classNames(
        'notification',
        {
          'notification--green': isGreen,
        },
      )}
    >
      <p className="notification__text">
        {text}
      </p>
    </div>
  );
};
