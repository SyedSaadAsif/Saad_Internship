import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "./Home.css";
function Home() {

    return (
<div className="hero">
    <div className="hero-card">
   
        <Container
            className="text-center py-5"
        >

            <h1 className="display-3">
                Welcome
            </h1>

            <p className="lead mt-3">

                This application allows you to
                manage developers.

            </p>

            <Link to="/dashboard">

                <Button
                    size="lg"
                    className="mt-4"
                >
                    Go To Dashboard
                </Button>

            </Link>

        </Container>
         </div>
</div>

    );

}

export default Home;