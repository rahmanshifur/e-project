import { Button, CardSubtitle, CardText, CardTitle, Col, Container, InputGroup, Row, Input } from "reactstrap"
import Sidebar from "../../components/sidebar"
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useState } from "react";
import Comment from '../comment/index';



function ProductDetails(props) {

    const [quantity, setQuantity] = useState(0)
    const [commentId, setCommentId] = useState(null)


    const pdtData = useStoreState(state => state.product.data)
    const selPdt = pdtData.filter(item => item.id === props.PdtId)[0]

    const clrData = useStoreState(state => state.color.data)
    const tagData = useStoreState(state => state.tag.data)
    const sizData = useStoreState(state => state.size.data)

    const cartData = useStoreState(state => state.cart.data)
    const createCart = useStoreActions(action => action.cart.create)
    const updateCart = useStoreActions(action => action.cart.update)



    const addToCartHandler = (item) => {
        if (quantity < 1 || quantity > 50) {
            alert('Please provide a valid quantity!')
            return;
        }


        // IF NO HAVE ANY PRODUCT
        if (cartData.length === 0) {
            item.quantity = quantity
            createCart(item)
            return;
        }



        //  CHECK ALREADY HAVE THIS PRODUCT OR NOT 
        let checkPdt = cartData.filter(pdt => pdt.id === item.id)

        // IF ALREADY NOT ADD THIS PRODUCT
        if (checkPdt.length === 0) {
            item.quantity = quantity
            createCart(item)
            return;
        }

        // IF ALREADY ADD THIS PRODUCT
        updateCart({ id: item.id, quantity })

    }





    return (
        <Container>
            <Row>
                <Col sm={3}>
                    <Sidebar />
                </Col>
                <Col sm={9}>
                    < div >
                        <Row>
                            <Col sm={6}>
                                <div>
                                    <img src={selPdt.file} alt='product' height='250' />
                                    <div>
                                        {selPdt.files.length !== 0 && selPdt.files.map(item => <img src={item} key={item} alt='subPdt' height='100' width='100' />)}
                                    </div>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <CardTitle tag='h5'>{selPdt.title}</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted" >Price: {selPdt.price}BDT</CardSubtitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Vat: {selPdt.vat}%</CardSubtitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted" >Discount: {selPdt.discount}%</CardSubtitle>
                                <hr />
                                <CardSubtitle tag="h6" className="mb-2 text-muted"> Color: {clrData.length !== 0 && clrData.map(clr => clr.id === selPdt.colors && <span key={clr.id}>{clr.name}</span>)}</CardSubtitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted"> Size: {sizData.length !== 0 && sizData.map(siz => siz.id === selPdt.sizes && <span key={siz.id}>{siz.name}</span>)}</CardSubtitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted"> Tag: {tagData.length !== 0 && tagData.map(tag => tag.id === selPdt.tags && <span key={tag.id}>{tag.name}</span>)}</CardSubtitle>
                                <hr />
                                <CardText>{selPdt.description}</CardText>
                                <InputGroup>
                                    <Input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        placeholder='Enter quantity'
                                    />
                                    <Button onClick={() => addToCartHandler(selPdt)} >Add To Cart</Button>
                                </InputGroup>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>


            {/* COMMENTS OF PRODUCT */}
            <Comment productId={selPdt.id} commentId={commentId} setCommentId={setCommentId} />

        </Container >
    )
}

export default ProductDetails

