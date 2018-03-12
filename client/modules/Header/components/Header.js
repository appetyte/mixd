import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => (
  <header className="header">
    <Link to="/">
      mixd
    </Link>
  </header>
);

export default Header;
