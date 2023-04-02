import Sidebar from "../../components/sidebar"
import { Col, Container, Row } from "reactstrap"


function Home() {
    return (
        <section id='home'>
            <Container>
                <Row>
                    <Col sm={3}><Sidebar /></Col>
                    <Col sm={9}>
                        <div className='hello'>
                            <h1>Hello world</h1>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Home