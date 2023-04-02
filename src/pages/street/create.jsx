
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useState } from 'react/cjs/react.development';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';

function Create({ editHandler }) {

    const [error, setError] = useState({})
    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [cityId, setCityId] = useState('')
    const [state, setState] = useState('')

    const create = useStoreActions(action => action.street.create)
    const countData = useStoreState(state => state.country.data)
    const stateData = useStoreState(state => state.state.data)
    const cityData = useStoreState(state => state.city.data)


    const submitHandler = (e) => {
        e.preventDefault()

        if (!validator()) {
            return
        }

        create({ name, cityId })

        setName('')
        setCountry('')
        setState('')
        setCityId('')
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
        if (!state) {
            error.state = 'Please the state is required!'
        }
        if (!cityId) {
            error.cityId = 'Please the city is required!'
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
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    invalid={error.state !== undefined}
                >
                    <option value=''>Select State</option>
                    {stateData.length !== 0 && stateData.map(item => item.countryId === country &&
                        <option key={item.id} value={item.id}>{item.name}</option>)}
                </Input>
                <FormFeedback>{error.state}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label className='mb-2 text-light'><b>City: </b></Label>
                <Input
                    type='select'
                    value={cityId}
                    onChange={(e) => setCityId(e.target.value)}
                    invalid={error.cityId !== undefined}
                >
                    <option value=''>Select city</option>
                    {cityData.length !== 0 && cityData.map(item => item.stateId === state &&
                        <option key={item.id} value={item.id} > {item.name}</option>)}
                </Input>
                <FormFeedback>{error.cityId}</FormFeedback>
            </FormGroup>
            <FormGroup >
                <Label className='mb-2 text-light'><b>Street: </b></Label>
                <Input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter name'
                    invalid={error.name !== undefined}
                />
                <FormFeedback>{error.name}</FormFeedback>
            </FormGroup>
            <Button className='mt-3' color='primary' type='submit'>Save</Button>
        </Form >
    )
}

export default Create