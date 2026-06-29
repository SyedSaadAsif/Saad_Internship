import { useMemo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useUsers } from "../context/UserContext";
import DeveloperCard from "../components/DeveloperCard";
import SearchBar from "../components/SearchBar";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Dashboard() {
    const {
        users,
        setUsers,
        loading,
        error
    } = useUsers();

    const [visibleUsers, setVisibleUsers] = useState(8);

    const loader = useRef(null);

    
    const [searchTerm, setSearchTerm] =
        useState("");

    const [filterBy, setFilterBy] =
        useState("name");

    const filteredUsers = useMemo(() => {

        return users.filter(user => {

            if (filterBy === "name") {

                return user.name
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    );

            }

            return user.company?.name
                ?.toLowerCase()
                .includes(
                    searchTerm.toLowerCase()
                );

        });

    }, [users, searchTerm, filterBy]);

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

    const deleteUser = (id) => {

        setUsers(prev =>
            prev.filter(user =>
                user.id !== id
            )
        );

    };
    

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

                    />

                </Col>

                <Col
                    md={3}
                    className="text-end"
                >

                    <Link to="/add-user">

                        <Button
                            variant="success"
                        >

                            Add Developer

                        </Button>

                    </Link>

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

                            onDelete={deleteUser}

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

</div>
        </Container>
        

    );

}

export default Dashboard;