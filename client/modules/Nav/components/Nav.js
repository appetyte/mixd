import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './nav.scss';

const Nav = ({ isLoggedIn }) => (
  <nav className="nav">
    {
      isLoggedIn
        ? (
          <ul className="nav__session">
            <li><Profile /></li>
            <li><Link to="/api/logout">log out</Link></li>
          </ul>
        ) : (
          <ul className="nav__session">
            <li><Link to="/login">log in</Link></li>
            <li><Link to="/signup">sign up</Link></li>
          </ul>
        )
    }
  </nav>
);

const mapStateToProps = state => ({
  user: state.session.currentUser,
  isLoggedIn: Boolean(state.session.currentUser.length),
});

export default connect(
  mapStateToProps
)(Nav);
