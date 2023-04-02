import { Container, Form, Row, Col, Button, InputGroup, Input } from "reactstrap";
import { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";


function Create(props) {
    const [body, setBody] = useState('')
    const [commentId, setCommentId] = useState(null)

    useEffect(() => {
        setCommentId(props.commentId || null)
    }, [props.commentId])

    const create = useStoreActions(action => action.comment.create)
    const auth = useStoreState(state => state.auth.data)

    function submitHandler(e) {
        e.preventDefault()
        if (!body) {
            return
        }

        let obj = {
            body,
            productId: props.productId,
            userId: auth[0].id,
            commentId: commentId
        }
        create(obj)
        setBody('')
        setCommentId(null)
    }

    return (
        <Container>
            <Row >
                <Form onSubmit={submitHandler} className='pt-3'>
                    <Col sm={6} >

                    </Col>
                    <Col sm={6} >
                        <InputGroup>
                            <Input
                                type="text"
                                value={body}
                                placeholder='Enter comment'
                                onChange={(e) => setBody(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter'}
                            />
                            {/* <Button type="submit" color="primary">Sent</Button> */}
                        </InputGroup>
                    </Col>
                </Form>
            </Row>
        </Container>
    )
}

export default Create
