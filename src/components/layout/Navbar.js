import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark mb-5">
      <i
        className="navbar-brand mb-0 h1 mx-left far fa-play-circle"
        style={{ color: '#df691a' }}
      >
        {' '}
        <span style={{ color: 'white' }}> Lyrica</span>
      </i>
    </nav>
  );
};

export default Navbar;
