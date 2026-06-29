import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

import UserForm from "../components/UserForm";
import { useUsers } from "../context/UserContext";
import { useToast } from "../context/ToastContext";
function EditUser() {
  const { id } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { users, setUsers } = useUsers();

  const selectedUser = users.find(
    (user) => user.id === Number(id)
  );

  const updateUser = (formData) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === Number(id)
          ? {
              ...user,
              ...formData,
            }
          : user
      )
    );
    showToast("Developer updated successfully!");
    navigate("/dashboard");
  };

  if (!selectedUser) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          Developer not found.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">

      <Card className="shadow">

        <Card.Body>

          <h2 className="mb-4">
            Edit Developer
          </h2>

          <UserForm
            initialValues={selectedUser}
            onSubmit={updateUser}
            buttonText="Update Developer"
          />

        </Card.Body>

      </Card>

    </Container>
  );
}

export default EditUser;