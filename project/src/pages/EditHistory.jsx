import { Table, Container } from "react-bootstrap";
import { useUsers } from "../context/UserContext";

function EditHistory() {

    const { history } = useUsers();

    return (

        <Container className="mt-4">

            <h2>Edit History</h2>

            <Table
                striped
                bordered
                hover
                responsive
            >

                <thead>

                    <tr>

                        <th>Date</th>

                        <th>Developer</th>

                        <th>Field</th>

                        <th>Old Value</th>

                        <th>New Value</th>

                        <th>Edited By</th>

                    </tr>

                </thead>

                <tbody>

                    {history.length === 0 ? (

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center"
                            >
                                No edit history
                            </td>

                        </tr>

                    ) : (

                        history.map((item) => (

                            <tr key={item.id}>

                                <td>{item.editedAt}</td>

                                <td>{item.developerName}</td>

                                <td>{item.field}</td>

                                <td>{item.oldValue}</td>

                                <td>{item.newValue}</td>

                                <td>{item.editedBy}</td>

                            </tr>

                        ))

                    )}

                </tbody>

            </Table>

        </Container>

    );

}

export default EditHistory;