import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string,
  text: string,
  isEnd?: boolean
};

export const PageNavLink: React.FC<Props> = (props) => {
  const { to, text, isEnd } = props;

  return (
    <NavLink
      to={to}
      end={isEnd}
      className={({ isActive }) => classNames(
        'navbar__item',
        {
          'navbar__item--active': isActive,
        },
      )}
    >
      {text}
    </NavLink>
  );
};
