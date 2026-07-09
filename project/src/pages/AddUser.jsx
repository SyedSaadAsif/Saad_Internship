import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import UserForm from "../components/UserForm";
import { useUsers } from "../context/UserContext";
import { useToast } from "../context/ToastContext";
function AddUser() {
const { showToast } = useToast();


  const {
    users,
    addUser
} = useUsers();

  const navigate = useNavigate();

  const addUser1 = (formData) => {
    const newUser = {

      ...formData,

      company: {
        name: "Local Developer",
      },
    };
    const duplicate = users.find(
        (user) =>
            user.email.toLowerCase() ===
                formData.email.toLowerCase() &&
            user.id !== formData.id
    );

    if (duplicate) {
        alert("A developer with this email already exists.");
        return;
    }
    addUser(newUser);
    
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
            onSubmit={addUser1}
            buttonText="Add Developer"
          />

        </Card.Body>

      </Card>

    </Container>
  );
}

export default AddUser;