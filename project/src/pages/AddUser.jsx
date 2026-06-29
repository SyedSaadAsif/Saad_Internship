import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import UserForm from "../components/UserForm";
import { useUsers } from "../context/UserContext";
import { useToast } from "../context/ToastContext";
function AddUser() {
const { showToast } = useToast();


  const { setUsers } = useUsers();

  const navigate = useNavigate();

  const addUser = (formData) => {
    const newUser = {
      id: Date.now(),

      ...formData,

      company: {
        name: "Local Developer",
      },
    };

    setUsers((prevUsers) => [
      ...prevUsers,
      newUser,
    ]);
    
    showToast("User Added Successfully");
    navigate("/dashboard");
  };

  return (
    <Container className="py-5">

      <Card className="shadow">

        <Card.Body>

          <h2 className="mb-4">
            Add New Developer
          </h2>

          <UserForm
            initialValues={null}
            onSubmit={addUser}
            buttonText="Add Developer"
          />

        </Card.Body>

      </Card>

    </Container>
  );
}

export default AddUser;