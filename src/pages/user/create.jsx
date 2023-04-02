import { useStoreActions, useStoreState } from "easy-peasy";
import { useState } from "react/cjs/react.development";
import { Button, Form, FormFeedback, FormGroup, Input, Label, Row, Col } from "reactstrap";


function Create() {

    const [error, setError] = useState({})
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [streetId, setStreetId] = useState('')
    const [status, setStatus] = useState('')
    const [contact, setContact] = useState('')
    const [file, setFile] = useState('')

    const create = useStoreActions(action => action.user.create)
    const countData = useStoreState(state => state.country.data)
    const stateData = useStoreState(state => state.state.data)
    const cityData = useStoreState(state => state.city.data)
    const streetData = useStoreState(state => state.street.data)


    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert(`Confirm Password doesn't match!`)
            return
        }

        if (!validator()) {
            return
        }

        let obj = {
            name,
            username,
            email,
            password,
            streetId,
            status,
            contact,
            file
        }

        create({ ...obj, successHandler })
    }


    const validator = () => {
        const error = {}

        if (!name) {
            error.name = 'Please the name is required!'
        }
        if (!username) {
            error.username = 'Please the username is required!'
        }
        if (!email) {
            error.email = 'Please the email is required!'
        }
        if (!password) {
            error.password = 'Please the password is required!'
        }
        if (!confirmPassword) {
            error.confirmPassword = 'Please the confirmPassword is required!'
        }
        if (!country) {
            error.country = 'Please the country is required!'
        }
        if (!state) {
            error.state = 'Please the state is required!'
        }
        if (!city) {
            error.city = 'Please the city is required!'
        }
        if (!streetId) {
            error.streetId = 'Please the street is required!'
        }
        if (!contact) {
            error.contact = 'Please the contact is required!'
        }
        if (!status) {
            error.status = 'Please the status is required!'
        }
        if (!file) {
            error.file = 'Please the photo is required!'
        }

        setError(error)

        return Object.keys(error).length === 0
    }


    const successHandler = () => {
        setName('')
        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setCountry('')
        setState('')
        setCity('')
        setStreetId('')
        setContact('')
        setStatus('')
        setFile('')
    }

    return (
        <Form onSubmit={submitHandler} className="p-3 mt-3 bg-dark">
            <Row>
                <Col sm={6}>
                    <FormGroup>
                        <Label className=' text-light'><b>Name: </b></Label>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name"
                            invalid={error.name !== undefined}
                        />
                        <FormFeedback>{error.name}</FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm={6}>
                    <FormGroup>
                        <Label className=' text-light'><b>Username: </b></Label>
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            invalid={error.username !== undefined}
                        />
                        <FormFeedback>{error.username}</FormFeedback>
                    </FormGroup>
                </Col>

            </Row>
            <Row>
                <Col sm={6}>
                    <FormGroup>
                        <Label className=' text-light'><b>Email: </b></Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            invalid={error.email !== undefined}
                        />
                        <FormFeedback>{error.email}</FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm={6}>
                    <FormGroup>
                        <Label className=' text-light'><b>Password: </b></Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            invalid={error.password !== undefined}
                        />
                        <FormFeedback>{error.password}</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <FormGroup>
                        <Label className=' text-light'><b>Confirm Password: </b></Label>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Enter confirm password"
                            invalid={error.confirmPassword !== undefined}
                        />
                        <FormFeedback>{error.confirmPassword}</FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm={6}>
                    <FormGroup>
                        <Label className=' text-light'><b>Contact: </b></Label>
                        <Input
                            type="Number"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="Enter contact"
                            invalid={error.contact !== undefined}
                        />
                        <FormFeedback>{error.contact}</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                <h4 className="text-light">Address:</h4>
                <hr className='m-0 text-light' />
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <Label className='mb-2 text-light'><b>Country: </b></Label>
                            <Input
                                type='select'
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                invalid={error.country !== undefined}
                            >
                                <option value=''>Select Country</option>
                                {countData.length !== 0 && countData.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>)}
                            </Input>
                            <FormFeedback>{error.country}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup>
                            <Label className='mb-2 text-light'><b>State: </b></Label>
                            <Input
                                type='select'
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                invalid={error.state !== undefined}
                            >
                                <option value=''>Select state</option>
                                {stateData.length !== 0 && stateData.map(item => item.countryId === country &&
                                    <option key={item.id} value={item.id}>{item.name}</option>)}
                            </Input>
                            <FormFeedback>{error.state}</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <Label className='mb-2 text-light'><b>City: </b></Label>
                            <Input
                                type='select'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                invalid={error.city !== undefined}
                            >
                                <option value=''>Select City</option>
                                {cityData.length !== 0 && cityData.map(item => item.stateId === state &&
                                    <option key={item.id} value={item.id}>{item.name}</option>)}
                            </Input>
                            <FormFeedback>{error.city}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup>
                            <Label className='mb-2 text-light'><b>Street: </b></Label>
                            <Input
                                type='select'
                                value={streetId}
                                onChange={(e) => setStreetId(e.target.value)}
                                invalid={error.streetId !== undefined}
                            >
                                <option value=''>Select Street</option>
                                {streetData.length !== 0 && streetData.map(item => item.cityId === city &&
                                    <option key={item.id} value={item.id}>{item.name}</option>)}
                            </Input>
                            <FormFeedback>{error.streetId}</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
            </FormGroup>
            <Row>
                <Col sm={6}>
                    <FormGroup>
                        <Label className='mb-2 text-light'><b>Status: </b></Label>
                        <Input
                            type='select'
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            invalid={error.status !== undefined}
                        >
                            <option value=''>Select Status</option>
                            <option value={0}>Inactive</option>
                            <option value={1}>Active</option>
                        </Input>
                        <FormFeedback>{error.status}</FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm={6}>
                    <FormGroup className="text-light">
                        <Label className="d-block p-1" ><b>Photo: </b></Label>
                        <Input
                            type="file"
                            onChange={(e) => e.target.files.length !== 0 && setFile(URL.createObjectURL(e.target.files[0]))}
                            invalid={error.file !== undefined}
                        />
                        {file && <img src={file} alt='userImg' height='100' />}
                        <FormFeedback>{error.file}</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
            <Button className='mt-3' size='lg' color='primary' type='submit'>Save</Button>
        </Form>
    )
}

export default Create