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

  const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  if (!username.trim()) {
    setError("Username is required.");
    return;
  }

  const passwordRegex = /^(?=.*\d).{8,}$/;

  if (!passwordRegex.test(password)) {
    setError(
      "Password must be at least 8 characters long and contain at least one number."
    );
    return;
  }

  const success = await login(username, password);

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
    Username <span style={{ color: "red" }}>*</span>
  </Form.Label>

  <Form.Control
    type="text"
    placeholder="Enter username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    required
  />

  <Form.Text className="text-muted">
    Username is mandatory.
  </Form.Text>

</Form.Group>
              <Form.Group className="mb-4">

  <Form.Label>
    Password <span style={{ color: "red" }}>*</span>
  </Form.Label>

  <Form.Control
    type="password"
    placeholder="Enter password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    pattern="^(?=.*\d).{8,}$"
    title="Password must be at least 8 characters long and contain at least one number."
  />

  <Form.Text className="text-muted">
    Password must contain at least <strong>8 characters</strong> and
    <strong> 1 number</strong>.
  </Form.Text>

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