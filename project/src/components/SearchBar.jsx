import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
function SearchBar({

    searchTerm,

    setSearchTerm,

    filterBy,
searchDevelopers,
    setFilterBy,

}) {
    return (

        <Row>

            <Col md={8}>

                <input

                    className="form-control"

                    placeholder="Search..."

                    value={searchTerm}

                    onChange={(e)=>
                        setSearchTerm(
                            e.target.value
                        )
                    }

                />
              


            </Col>
            <Col md={4}>
                     <Button onClick={searchDevelopers}>
                    Search
                </Button>
            </Col>
                
            
        </Row>

    );

}

export default SearchBar;