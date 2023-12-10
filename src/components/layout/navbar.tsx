import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

interface NavBarProps {
  user: any;
  nickname: string;
}

const NavBar: FC<NavBarProps> = ({ user, nickname }) => {
  return (
    <Navbar bg="primary" expand="lg" style={{ marginBottom: 25 }}>
      <Navbar.Brand as={Link} to="/" className="text-light">
        Tic-tac-toe
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNavAltMarkup" />
      <Navbar.Collapse id="navbarNavAltMarkup">
        <Nav className="mr-auto">
          {user ? (
            <>
              <Nav.Link as={NavLink} className="text-light" to="/games">
                Games
              </Nav.Link>
              <Nav.Link as={NavLink} className="text-light" to="/history">
                History
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={NavLink} className="text-light" to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} className="text-light" to="/register">
                Register
              </Nav.Link>
            </>
          )}
          {user && (
            <>
              <Nav.Link as={NavLink} className="text-light" to="/profile">
                {nickname} <i className="fa fa-key" aria-hidden="true"></i>
              </Nav.Link>
              <Nav.Link as={NavLink} className="text-light" to="/logout">
                Logout
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
