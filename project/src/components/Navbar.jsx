import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function NavigationBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>

        <Navbar.Brand as={Link} to="/">
          Developer Dashboard
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>

          <Nav className="ms-auto">

            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>

            <Nav.Link as={Link} to="/add-user">
              Add Developer
            </Nav.Link>
            <Nav.Link
            as={Link}
            to="/history"
            >
              Edit History
            </Nav.Link>
            <Button
              variant="outline-light"
              onClick={() => {
              logout();
              navigate("/");
            }}
            >
              Logout
            </Button>

          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default NavigationBar;