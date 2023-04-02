import { useState } from "react";
import { Row, Col, Form, FormFeedback, FormGroup, Input, Button } from "reactstrap";
import { useStoreState, useStoreActions } from 'easy-peasy';



function Create() {
    const [error, setError] = useState({})
    const [comment, setComment] = useState('')
    const [star, setStar] = useState('')
    const [userId, setUserId] = useState('')
    const [productId, setProductId] = useState('')

    const create = useStoreActions(action => action.review.create)
    const userData = useStoreState(state => state.user.data)
    const pdtData = useStoreState(state => state.product.data)

    const submitHandler = (e) => {
        e.preventDefault()

        if (!validator()) {
            return
        }

        let obj = {
            comment,
            star,
            userId,
            productId,
        }
        create({ ...obj, successHandler })
    }

    const validator = () => {
        const error = {}
        if (!comment) {
            error.comment = 'Please the comment is required!'
        }
        if (!star) {
            error.star = 'Please the star is required!'
        }
        if (!userId) {
            error.userId = 'Please the user is required!'
        }
        if (!productId) {
            error.productId = 'Please the product is required!'
        }

        setError(error)

        return Object.keys(error).length === 0
    }

    const successHandler = () => {
        setComment('')
        setStar('')
        setUserId('')
        setProductId('')
    }

    return (
        <Form onSubmit={submitHandler} className='p-3 bg-dark mt-3'>
            <Row>
                <Col sm={6}>
                    <FormGroup className='py-1'>
                        <Input
                            type="select"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder='Enter comment'
                            invalid={error.userId !== undefined}
                        >
                            <option value=''>Select User</option>
                            {userData.length !== 0 && userData.map(item =>
                                <option key={item.id} value={item.id}>{item.name}</option>)}
                        </Input>
                        <FormFeedback>{error.userId}</FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm={6}>
                    <FormGroup className='py-1'>
                        <Input
                            type="select"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            invalid={error.productId !== undefined}
                        >
                            <option value=''>Select Product</option>
                            {pdtData.length !== 0 && pdtData.map(item =>
                                <option key={item.id} value={item.id}>{item.title}</option>)}
                        </Input>
                        <FormFeedback>{error.productId}</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <FormGroup className='py-1'>
                        <Input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder='Enter comment'
                            invalid={error.comment !== undefined}
                        />
                        <FormFeedback>{error.comment}</FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm={6}>
                    <FormGroup className='py-1'>
                        <Input
                            type="select"
                            value={star}
                            onChange={(e) => setStar(e.target.value)}
                            invalid={error.star !== undefined}
                        >
                            <option value=''>Select Star</option>
                            <option value='1'>1 Star</option>
                            <option value='2'>2 Star</option>
                            <option value='3'>3 Star</option>
                            <option value='4'>4 Star</option>
                            <option value='5'>5 Star</option>
                        </Input>
                        <FormFeedback>{error.star}</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
            <Button className='mt-2' colors="primary" type="submit">Save</Button>
        </Form>
    )
}

export default Create