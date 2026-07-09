import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(username, password);

    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="login-page">
      <Container>
        <Card className="login-card shadow-lg">

          <Card.Body>

            <div className="text-center mb-4">

              <div className="login-icon">
                👨‍💻
              </div>

              <h2 className="mt-3">
                Developer Dashboard
              </h2>

              <p className="text-muted">
                Administrator Login
              </p>

            </div>

            {error && (
              <Alert variant="danger">
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>

              <Form.Group className="mb-3">

                <Form.Label>
                  Username
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                />

              </Form.Group>

              <Form.Group className="mb-4">

                <Form.Label>
                  Password
                </Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

              </Form.Group>

              <Button
                type="submit"
                className="w-100"
                size="lg"
              >
                Login
              </Button>

            </Form>

            <hr />

            <div className="demo-login">

              <h6>Demo Credentials</h6>

              <p>
                <strong>Username:</strong> a
              </p>

              <p>
                <strong>Password:</strong> 123
              </p>

            </div>

          </Card.Body>

        </Card>
      </Container>
    </div>
  );
}

export default Home;