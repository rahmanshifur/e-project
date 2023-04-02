import { Col, Container, Row } from "reactstrap";
import Sidebar from "../../components/sidebar";
import Tab from "./tab";


function AdminOrder() {
    return (
        <Container>
            <Row>
                <Col sm={3}>
                    <Sidebar />
                </Col>
                <Col sm={9}>
                    <Tab />
                </Col>
            </Row>
        </Container>
    )
}

export default AdminOrder