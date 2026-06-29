import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function UserModal({
  show,
  handleClose,
  selectedUser,
}) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
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
              {selectedUser.company?.name}
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
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </Button>

      </Modal.Footer>

    </Modal>
  );
}

export default UserModal;