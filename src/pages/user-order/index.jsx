import Sidebar from '../../components/sidebar';
import Tab from './tab';
const { Container, Row, Col } = require("reactstrap");


function UserOrder() {
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

export default UserOrder