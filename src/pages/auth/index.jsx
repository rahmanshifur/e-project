import { useState } from "react"
import { Col, Form, FormFeedback, FormGroup, Input, Row, Label, Button } from "reactstrap"
import { useStoreActions, useStoreState } from 'easy-peasy';

function Auth() {

    const [error, setError] = useState({})
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = useStoreActions(action => action.auth.login)
    const users = useStoreState(state => state.user.data)

    function submitHandler(e) {
        e.preventDefault()

        if (!validator()) {
            return
        }

        // let obj = {
        //     email,
        //     password,
        //     users
        // }

        login({
            email: email,
            password: password,
            users
        })

    }

    function validator() {
        const error = {}

        if (!email) {
            error.email = 'Please the email is required!'
        }
        if (!password) {
            error.password = 'Please the password is required!'
        }

        setError(error)

        return Object.keys(error).length === 0
    }

    return (
        <Row>
            <Col sm={4}></Col>
            <Col sm={4}>
                <h3 className='text-center'><b>LogIn</b></h3>
                <Form onSubmit={submitHandler} className='p-3 bg-warning'>
                    <FormGroup>
                        <Label className='m1-1 text-dark'><b>Email:</b></Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter email'
                            invalid={error.email !== undefined}
                        />
                        <FormFeedback>{error.email}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label className='my-1 text-dark'><b>Password:</b></Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter password'
                            invalid={error.password !== undefined}
                        />
                        <FormFeedback>{error.password}</FormFeedback>
                    </FormGroup>
                    <Button color='primary' className='w-100 mt-4' type='submit'>LogIn</Button>
                </Form>
            </Col>
            <Col sm={4}></Col>
        </Row>
    )
}

export default Auth