import { useStoreActions } from "easy-peasy";
import { useState } from "react";
import { Button, Form, FormGroup, Input, Row, Col, FormFeedback } from "reactstrap";


function Create({ editHandler }) {

    const [error, setError] = useState({})
    const [name, setName] = useState('')
    const [file, setFile] = useState('')

    const create = useStoreActions(action => action.category.create)

    const submitHandler = (e) => {
        e.preventDefault()

        if (!validator()) {
            return
        }

        create({ name, file })
        setName('')
        setFile('')
        editHandler()
    }



    const validator = () => {
        const error = {}

        if (!name) {
            error.name = 'Please the name is required!'
        }
        if (!file) {
            error.file = 'Please the file is required!'
        }

        setError(error)

        return Object.keys(error).length === 0
    }


    return (
        <Row>
            <Col sm={3}></Col>
            <Col sm={6}>

                <Form onSubmit={submitHandler} className=' mt-4 p-3 rounded-3 bg-dark' >
                    <FormGroup>
                        <Input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter name'
                            invalid={error.name !== undefined}
                        />
                        <FormFeedback>{error.name}</FormFeedback>
                    </FormGroup>
                    <FormGroup className='text-light py-2'>
                        <Input
                            type='file'
                            onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))}
                            invalid={error.file !== undefined}
                        />
                        {file && <img src={file} alt="catImg" height='100' />}
                        <FormFeedback>{error.file}</FormFeedback>
                    </FormGroup>
                    <Button type='submit' color='primary'> Save</Button>
                </Form >
            </Col>
            <Col sm={3}></Col>
        </Row>
    )
}

export default Create