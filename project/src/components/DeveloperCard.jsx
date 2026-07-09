import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function DeveloperCard({
  user,
  onDelete,
  onViewDetails,
}) {
  return (
    <Card className="developer-card h-100">

      <Card.Body>

        <Card.Title>
          {user.name}
        </Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
          {user.role || "Developer"}
        </Card.Subtitle>

        <Card.Text>

          <strong>Email:</strong>

          <br />

          {user.email}

        </Card.Text>

        <Card.Text>

          <strong>Company:</strong>

          <br />

          {user.company?.name}

        </Card.Text>

        {user.skills && (
          <Card.Text>

            <strong>Skills:</strong>

            <br />

            {user.skills}

          </Card.Text>
        )}

      </Card.Body>

      <Card.Footer className="d-flex justify-content-between">

       <Link
          to={`/developer/${user.id}`}
        >
          <Button variant="warning">
            View Details
          </Button>
        </Link>

        <Link
          to={`/edit-user/${user.id}`}
        >
          <Button variant="primary">
            Edit
          </Button>
        </Link>

        <Button
    variant="danger"
    onClick={onDelete}
>
    Delete
</Button>

      </Card.Footer>

    </Card>
  );
}

export default DeveloperCard;