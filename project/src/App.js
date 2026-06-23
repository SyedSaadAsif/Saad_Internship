import { useState, useEffect } from "react";
import DeveloperCard from "./components/DeveloperCard";
import "./App.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";

function App() {
  const [users, setUsers] = useState([]);
  const [localUsers, setLocalUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("name");

  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleShowUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const addUser = () => {
    if (!name || !email || !role || !skills) {
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      role,
      skills,
      company: {
        name: "Local Developer",
      },
    };

    setLocalUsers([...localUsers, newUser]);

    setName("");
    setEmail("");
    setRole("");
    setSkills("");

    setToastMessage("User Added Successfully");
    setShowToast(true);
  };

  const allUsers = [...users, ...localUsers];

  const filteredUsers = allUsers.filter((user) => {
    if (filterBy === "name") {
      return user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }

    return user.company?.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const usersPerPage = 4;

  const indexOfLastUser =
    currentPage * usersPerPage;

  const indexOfFirstUser =
    indexOfLastUser - usersPerPage;

  const currentUsers = filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const totalPages = Math.ceil(
    filteredUsers.length / usersPerPage
  );

  if (loading) {
    return (
      <div className="loading-screen">
        <h2>Loading Developers...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-screen">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="dashboard-title">
        Developer Management Dashboard
      </h1>

      {/* Search Section */}
      <div className="search-section">
        <Row>
          <Col md={4}>
            <select
              className="form-select"
              value={filterBy}
              onChange={(e) =>
                setFilterBy(e.target.value)
              }
            >
              <option value="name">
                Search by Name
              </option>

              <option value="company">
                Search by Company
              </option>
            </select>
          </Col>

          <Col md={8}>
            <input
              className="form-control"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </Col>
        </Row>
      </div>

      <h5 className="user-count">
        Total Users: {filteredUsers.length}
      </h5>

      {/* Cards */}
      <Row>
        {currentUsers.map((user) => (
          <Col
            key={user.id}
            xs={12}
            sm={6}
            md={4}
            lg={6}
            className="mb-4"
          >
            <DeveloperCard
              user={user}
              onViewDetails={
                handleShowUser
              }
            />
          </Col>
        ))}
      </Row>

      {/* Add User Form */}
      <div className="form-section">
        <h4>Add New Developer</h4>

        <Row>
          <Col md={3}>
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </Col>

          <Col md={3}>
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </Col>

          <Col md={3}>
            <input
              className="form-control"
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
            />
          </Col>

          <Col md={3}>
            <input
              className="form-control"
              type="text"
              placeholder="Skills"
              value={skills}
              onChange={(e) =>
                setSkills(e.target.value)
              }
            />
          </Col>
        </Row>

        <Button
          variant="success"
          className="mt-3"
          onClick={addUser}
          disabled={
            !name ||
            !email ||
            !role ||
            !skills
          }
        >
          Add User
        </Button>
      </div>

      {/* Pagination */}
      <div className="pagination-section">
        {Array.from(
          { length: totalPages },
          (_, index) => (
            <Button
              key={index}
              variant={
                currentPage ===
                index + 1
                  ? "primary"
                  : "outline-primary"
              }
              className="me-2"
              onClick={() =>
                setCurrentPage(
                  index + 1
                )
              }
            >
              {index + 1}
            </Button>
          )
        )}
      </div>

      {/* Modal */}
      <Modal
        backdrop="static"
        color="primary"
        show={showModal}
        onHide={() =>
          setShowModal(false)
        }
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Developer Details
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedUser && (
            <>
              <p>
                <strong>Name:</strong>{" "}
                {selectedUser.name}
              </p>

              {selectedUser.email && (
                <p>
                  <strong>Email:</strong>{" "}
                  {selectedUser.email}
                </p>
              )}

              {selectedUser.role && (
                <p>
                  <strong>Role:</strong>{" "}
                  {selectedUser.role}
                </p>
              )}

              {selectedUser.skills && (
                <p>
                  <strong>Skills:</strong>{" "}
                  {selectedUser.skills}
                </p>
              )}

              <p>
                <strong>Company:</strong>{" "}
                {
                  selectedUser.company
                    ?.name
                }
              </p>

              {selectedUser.phone && (
                <p>
                  <strong>Phone:</strong>{" "}
                  {selectedUser.phone}
                </p>
              )}
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() =>
              setShowModal(false)
            }
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast */}
      <div className="toast-container-custom">
        <Toast
          position="bottom-end"
          show={showToast}
          onClose={() =>
            setShowToast(false)
          }
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong>
              Notification
            </strong>
          </Toast.Header>

          <Toast.Body>
            {toastMessage}
          </Toast.Body>
        </Toast>
      </div>
    </Container>
  );
}

export default App;