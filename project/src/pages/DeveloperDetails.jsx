import { Card, Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useUsers } from "../context/UserContext";

function DeveloperDetails() {

    const { id } = useParams();

    const { users } = useUsers();

    const developer = users.find(
        (user) => user.id.toString() === id
    );

    if (!developer) {

        return <h2>User not found</h2>;

    }

    return (

        <Container className="py-5">

            <Card>

                <Card.Body>

                    <h2>{developer.name}</h2>

                    <hr />

                    <p>
                        <strong>Email:</strong>
                        {developer.email}
                    </p>

                    <p>
                        <strong>Role:</strong>
                        {developer.role}
                    </p>

                    <p>
                        <strong>Skills:</strong>
                        {developer.skills}
                    </p>

                    <p>
                        <strong>Company:</strong>
                        {developer.company?.name}
                    </p>

                    <p>
                        <strong>Phone:</strong>
                        {developer.phone}
                    </p>

                    <Link
                        to="/dashboard"
                    >

                        <Button>

                            Back

                        </Button>

                    </Link>

                </Card.Body>

            </Card>

        </Container>

    );

}

export default DeveloperDetails;