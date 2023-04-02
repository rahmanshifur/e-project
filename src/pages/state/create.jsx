
import { Input } from 'reactstrap';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Button, Form, FormGroup, FormFeedback, } from 'reactstrap';
import { useState } from 'react';


function Create({ editHandler }) {
    const [error, setError] = useState({})
    const [name, setName] = useState()
    const [countryId, setCountryId] = useState()


    const countData = useStoreState(state => state.country.data)
    const create = useStoreActions(action => action.state.create)

    const submitHandler = (e) => {
        e.preventDefault()

        if (!validator()) {
            return
        }

        create({ name, countryId, })

        setName('')
        setCountryId('')
        editHandler('')
    }

    const validator = () => {
        const error = {}
        if (!name) {
            error.name = 'Please the name is required!'
        }
        if (!countryId) {
            error.countryId = 'please the countryId is required!'
        }
        setError(error)

        return Object.keys(error).length === 0
    }

    return (
        <Form onSubmit={submitHandler} className='p-3 bg-dark mt-4'>
            <FormGroup>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter name'
                    invalid={error.name !== undefined}

                />
                <FormFeedback>{error.name}</FormFeedback>
            </FormGroup>
            <FormGroup className='py-2'>
                <Input
                    type="select"
                    value={countryId}
                    onChange={(e) => setCountryId(e.target.value)}
                    invalid={error.countryId !== undefined}
                >
                    <option value=''>Select Country</option>
                    {countData && countData.length !== 0 && countData.map(item =>
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )}
                </Input>
                <FormFeedback>{error.countryId}</FormFeedback>
            </FormGroup>
            <Button type='submit' color='primary'>Save</Button>
        </Form>
    )
}

export default Create