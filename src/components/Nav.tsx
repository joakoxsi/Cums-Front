import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const LoggedMenu = ({ logout }: { logout: () => void }) => (
  <ul className="navbar-nav me-auto mb-2 mb-md-0">
    <li className="nav-item">
      <Link to="/user" className="nav-link active">
        Perfil
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/login" className="nav-link active" onClick={logout}>
        Logout
      </Link>
    </li>
  </ul>
);

const UnloggedMenu = () => (
  <ul className="navbar-nav me-auto mb-2 mb-md-0">
    <li className="nav-item">
      <Link to="/login" className="nav-link active">
        Login
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/register" className="nav-link active">
        Register
      </Link>
    </li>
  </ul>
);

const nav = (props: {
  name: string;
  setName: (name: string) => void;
  isLoggedIn: boolean;
  logout: () => void;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logout = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      setIsLoggedIn(false);
      props.setName("");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user", {
          method: "GET",
          credentials: "include",
        });
        const content = await response.json();
        if (content.name != undefined) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error while checking login status:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <Navbar className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
        </Nav>
        <Nav>
          {isLoggedIn ? <LoggedMenu logout={logout} /> : <UnloggedMenu />}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default nav;
