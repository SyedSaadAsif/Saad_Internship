import { useEffect, useRef, useState } from "react";
import { useUsers } from "../context/UserContext";
import DeveloperCard from "../components/DeveloperCard";
import SearchBar from "../components/SearchBar";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { puter } from '@heyputer/puter.js';
function Dashboard() {
    const {
    users,
    deleteUser,
    loading,
    error
} = useUsers();

    const [filteredUsers, setFilteredUsers] = useState(users);
    const [visibleUsers, setVisibleUsers] = useState(8);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [aimode, setAImode] = useState(false);
    const loader = useRef(null);

    const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
    };
    const [searchTerm, setSearchTerm] =
        useState("");

    const [filterBy, setFilterBy] =
        useState("name");

    const searchDevelopers = async () => {

    try {
        setAImode(true);
        const developers = users.map(user => ({
            id: user.id,
            name: user.name,
            role: user.role,
            skills: user.skills,
            company: user.company?.name
        }));

        const prompt = `
You are searching a developer database.

Developers:

${JSON.stringify(developers)}

User Query:

"${searchTerm}"

Return ONLY a JSON array of matching developer IDs.

Example:
["abc123","xyz456"]

If none match return [].

Do not explain anything.
Do not wrap the JSON in markdown.
`;

        const response = await puter.ai.chat(prompt, {
            model: "gemini-3.5-flash"
        });

        const cleaned = response.message.content
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const ids = JSON.parse(cleaned);

        const results = users.filter(user =>
            ids.includes(user.id)
        );

        setFilteredUsers(results);

    }
    catch (err) {

        console.error(err);

        alert(err.message);

    }

};

    const currentUsers =
    filteredUsers.slice(
        0,
        visibleUsers
    );


      useEffect(() => {

    const observer =
        new IntersectionObserver(

            (entries) => {

                const target =
                    entries[0];

                if (
                    target.isIntersecting
                ) {

                    setVisibleUsers(prev =>

                        Math.min(

                            prev + 4,

                            filteredUsers.length

                        )

                    );

                }

            },

            {

                threshold: 1

            }

        );

    if (loader.current) {

        observer.observe(
            loader.current
        );

    }

    return () => {

        if (loader.current) {

            observer.unobserve(
                // eslint-disable-next-line react-hooks/exhaustive-deps
                loader.current
            );

        }

    };

}, [filteredUsers.length]);

  useEffect(() => {

    setVisibleUsers(8);

}, [searchTerm, filterBy]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }
    if(searchTerm.trim() === "" && aimode) {
        setFilteredUsers(users);
        setAImode(false);
    }

    return (

        <Container className="py-4">

            <h1 className="dashboard-title mb-4">
                Developer Dashboard
            </h1>

            <Row className="mb-4">

                <Col md={9}>

                    <SearchBar

                        searchTerm={searchTerm}

                        setSearchTerm={setSearchTerm}

                        filterBy={filterBy}

                        setFilterBy={setFilterBy}
                        searchDevelopers={searchDevelopers}

                    />

                </Col>

            </Row>

            <h5 className="user-count mb-3">

                Total Users :
                {" "}
                {filteredUsers.length}

            </h5>

            <Row>

                {currentUsers.map(user => (

                    <Col
                        key={user.id}
                        xs={12}
                        sm={6}
                        lg={4}
                        xl={3}
                        className="mb-4"
                    >

                        <DeveloperCard

                            user={user}

                            onDelete={() => handleDeleteClick(user)}    

                            onViewDetails={
                                user
                            }

                        />

                    </Col>

                ))}

            </Row>


          <div
    ref={loader}
    className="text-center py-5"
>

    {visibleUsers < filteredUsers.length && (

        <h5 className="ignite">

            Scroll to load more...

        </h5>

    )}

</div
>
    <Modal
    show={showDeleteModal}
    onHide={() => setShowDeleteModal(false)}
    centered
>
    <Modal.Header closeButton>
        <Modal.Title>
            Confirm Delete
        </Modal.Title>
    </Modal.Header>

    <Modal.Body>
        {userToDelete && (
            <>
                Are you sure you want to delete
                <strong> {userToDelete.name}</strong>?
                <br />
                This action cannot be undone.
            </>
        )}
    </Modal.Body>

    <Modal.Footer>
        <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
        >
            Cancel
        </Button>

        <Button
            variant="danger"
            onClick={async () => {

    await deleteUser(
        userToDelete.id
    );

    setShowDeleteModal(false);

}}
        >
            Delete
        </Button>
    </Modal.Footer>
</Modal>
        </Container>
        

    );

}

export default Dashboard;