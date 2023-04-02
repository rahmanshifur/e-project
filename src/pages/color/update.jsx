import { useState } from "react"
import { Button, Col, Form, FormFeedback, FormGroup, Input, Row } from "reactstrap"
import { useStoreActions } from 'easy-peasy';
import { useEffect } from "react";


function Update({ editItem, editHandler }) {

    const [error, setError] = useState({})
    const [name, setName] = useState('')

    const update = useStoreActions(action => action.color.update)

    useEffect(() => {
        setName(editItem.name)
    }, [editItem])

    const submitHandler = (e) => {
        e.preventDefault()

        if (!validator()) {
            return
        }

        update({ id: editItem.id, name })
        setName('')
        editHandler()
    }

    const validator = () => {
        const error = {}

        if (!name) {
            error.name = 'Please the name is required!'
        }

        setError(error)

        return Object.keys(error).length === 0
    }

    return (
        <Row>
            <Col sm={3}>
            </Col>

            <Col sm={6}>
                <Form onSubmit={submitHandler} className='p-3 mt-4 bg-warning'>
                    <FormGroup className='py-2'>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter name'
                            invalid={error.name !== undefined}
                        />
                        <FormFeedback>{error.name}</FormFeedback>
                    </FormGroup>
                    <Button type="submit" color="success">Update</Button>
                </Form>
            </Col>
            <Col sm={3}>
            </Col>
        </Row>
    )
}

export default Update