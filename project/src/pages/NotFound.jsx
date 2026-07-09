import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function NotFound() {
  return (
    <Container className="text-center py-5">
      <h1 className="display-1" style={{ color: "white" }}>
        404
      </h1>

      <h3 style={{ color: "white" }}>Page Not Found</h3>

      <p style={{ color: "white" }}>
        The page you are looking for doesn't exist.
      </p>

      <Link to="/">
        <Button variant="primary">
          Go Home
        </Button>
      </Link>
    </Container>
  );
}

export default NotFound;