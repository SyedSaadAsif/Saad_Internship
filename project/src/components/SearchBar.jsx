import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function SearchBar({

    searchTerm,

    setSearchTerm,

    filterBy,

    setFilterBy

}) {

    return (

        <Row>

            <Col md={4}>

                <select
                    className="form-select"

                    value={filterBy}

                    onChange={(e)=>
                        setFilterBy(
                            e.target.value
                        )
                    }
                >

                    <option value="name">

                        Name

                    </option>

                    <option value="company">

                        Company

                    </option>

                </select>

            </Col>

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

        </Row>

    );

}

export default SearchBar;