
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useState } from 'react/cjs/react.development';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';

function Create({ editHandler }) {

    const [error, setError] = useState({})
    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [stateId, setStateId] = useState('')

    const create = useStoreActions(action => action.city.create)
    const countData = useStoreState(state => state.country.data)
    const stateData = useStoreState(state => state.state.data)


    const submitHandler = (e) => {
        e.preventDefault()

        if (!validator()) {
            return
        }

        create({ name, stateId })

        setName('')
        setCountry('')
        setStateId('')
        editHandler()
    }

    const validator = () => {
        const error = {}

        if (!name) {
            error.name = 'Please the name is required!'
        }
        if (!country) {
            error.country = 'Please the country is required!'
        }
        if (!stateId) {
            error.stateId = 'Please the state is required!'
        }

        setError(error)

        return Object.keys(error).length === 0
    }

    return (
        <Form onSubmit={submitHandler} className='p-3  mt-3 bg-dark'>
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
            <FormGroup>
                <Label className='mb-2 text-light'><b>State: </b></Label>
                <Input
                    type='select'
                    value={stateId}
                    onChange={(e) => setStateId(e.target.value)}
                    invalid={error.stateId !== undefined}
                >
                    <option value=''>Select State</option>
                    {stateData.length !== 0 && stateData.map(item => item.countryId === country &&
                        < option key={item.id} value={item.id} > {item.name}</option>)}
                </Input>
                <FormFeedback>{error.stateId}</FormFeedback>
            </FormGroup>
            <FormGroup >
                <Label className='mb-2 text-light'><b>City: </b></Label>
                <Input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    invalid={error.name !== undefined}
                />
                <FormFeedback>{error.name}</FormFeedback>
            </FormGroup>
            <Button className='mt-3' color='primary' type='submit'>Save</Button>
        </Form >
    )
}

export default Create