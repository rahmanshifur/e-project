import { useStoreActions, useStoreState } from "easy-peasy"
import { Card, CardBody, CardImg, CardTitle, CardSubtitle, CardText, Col, Row, Button } from "reactstrap"
import Sidebar from "../../components/sidebar"
import { Link } from '@reach/router';


function AllProduct() {

    const pdtData = useStoreState(state => state.product.data)
    const createCart = useStoreActions(action => action.cart.create)

    function addToCartHandler(pdt) {
        pdt.quantity = 1
        createCart(pdt)
    }

    return (
        <section>
            <Row>
                <Col sm={3}>
                    <Sidebar />
                </Col>
                <Col sm={9}>
                    {pdtData.length !== 0 && pdtData.map((pdt, i) =>
                        <Card className='ms-2  float-start' style={{ width: '250px', height: 'auto' }}>
                            <CardImg src={pdt.file} alt='pdtImg' />
                            <CardBody>
                                <CardTitle tag='h5'>{pdt.title}</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Price: {pdt.price} BDT</CardSubtitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Vat: {pdt.vat} %</CardSubtitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Discount: {pdt.discount} %</CardSubtitle>
                                <hr />
                                <CardText>{pdt.description}</CardText>
                                <Link className='btn btn-primary' to={`/product-details/${pdt.id}`}>Details</Link>
                                <Button className='btn btn-warning ms-3' onClick={() => addToCartHandler(pdt)}>Add To Cart</Button>
                            </CardBody>
                        </Card>
                    )}
                </Col>
            </Row>
        </section>
    )
}
export default AllProduct