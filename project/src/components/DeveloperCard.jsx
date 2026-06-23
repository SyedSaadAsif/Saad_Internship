import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
function DeveloperCard({
  user,
  onViewDetails
}) {
  return (
    <Card className="developer-card">
      <Card.Body>
        <Card.Title>
          {user.name}
        </Card.Title>

        <Button
          onClick={() =>
            onViewDetails(user)
          }
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default DeveloperCard;