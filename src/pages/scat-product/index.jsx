import { Link } from '@reach/router';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Col, Container, Row, Card, CardImg, CardBody, CardTitle, CardSubtitle, Button, CardText } from 'reactstrap';
import Sidebar from '../../components/sidebar';


function ScatProduct(props) {

    const scatData = useStoreState(state => state.subcategory.data)
    const catData = useStoreState(state => state.category.data)
    const pdtData = useStoreState(state => state.product.data)
    const createCart = useStoreActions(action => action.cart.create)

    function addToCartHandler(pdt) {
        pdt.quantity = 1
        createCart(pdt)
    }

    return (
        <Container>
            <Row>
                <Col sm={3}>
                    <Sidebar />
                </Col>
                <Col sm={9}>
                    <h4>{scatData.length !== 0 && scatData.map(scat => scat.id === props.scatId && <span key={scat.id}>{catData.map(cat => cat.id === scat.categoryId && <span key={cat.id}> {cat.name}</span>)} = {scat.name}</span>)}</h4>

                    <div className="pdt-group">
                        <h3>List of Product in this subcategory</h3>
                        {pdtData.length !== 0 && pdtData.map(pdt => pdt.subcategoryId === props.scatId &&
                            <Card key={pdt.id} className="w-25">
                                <CardImg src={pdt.file} alt='pdtImg' />
                                <CardBody>
                                    <CardTitle tag="h5">{pdt.title}</CardTitle>
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
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ScatProduct