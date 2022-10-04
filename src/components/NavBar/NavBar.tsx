import './NavBar.scss';
import React from 'react';
import { PageNavLink } from '../PageNavLink/PageNavLink';

export const NavBar: React.FC = () => {
  return (
    <nav className="navbar page__section">
      <ul className="navbar__list">
        <PageNavLink to="/" text="Login" isEnd />
        <PageNavLink to="/register" text="Register" />
      </ul>
    </nav>
  );
};
