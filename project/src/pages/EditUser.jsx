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
  const {
    users,
    addHistory,
    updateUser
} = useUsers();

  const selectedUser = users.find(
    user => user.id === id
);
  
  const updateUser1 = (formData) => {
    const duplicate = users.find(
        (user) =>
            user.email.toLowerCase() ===
                formData.email.toLowerCase() &&
            user.id !== selectedUser.id
    );

    if (duplicate) {
        alert("A developer with this email already exists.");
        return;
    }
  const fields = [
    "name",
    "email",
    "role",
    "skills"
  ];
  if(formData.name === selectedUser.name && formData.email === selectedUser.email && formData.role === selectedUser.role && formData.skills === selectedUser.skills){
    alert("No changes made to the developer's information.");
    navigate("/dashboard");
    return;
  }
  fields.forEach((field) => {

    if (selectedUser[field] !== formData[field]) {

      addHistory({

        id: Date.now() + Math.random(),

        developerId: selectedUser.id,

        developerName: selectedUser.name,

        field,

        oldValue: selectedUser[field],

        newValue: formData[field],

        editedAt: new Date().toLocaleString(),

        editedBy: localStorage.getItem("admin") || "Admin"

      });

    }

  });

  updateUser(
    selectedUser.id,
    formData
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
            onSubmit={updateUser1}
            buttonText="Update Developer"
          />

        </Card.Body>

      </Card>

    </Container>
  );
}

export default EditUser;