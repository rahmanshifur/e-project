
import { Input } from 'reactstrap';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Button, Form, FormGroup, } from 'reactstrap';
import { useEffect, useState } from 'react';


function Update({ editItem, editHandler }) {
    const [error, setError] = useState({})
    const [name, setName] = useState()
    const [countryId, setCountryId] = useState()


    const countData = useStoreState(state => state.country.data)
    const update = useStoreActions(action => action.state.update)


    useEffect(() => {
        setName(editItem.name)
        setCountryId(editItem.countryId)
    }, [editItem])

    const submitHandler = (e) => {
        e.preventDefault()

        if (!validator()) {
            return
        }

        update({
            id: editItem.id,
            name,
            countryId,
        })

        setName('')
        setCountryId('')
        editHandler()
    }

    const validator = () => {
        const error = {}
        if (!name) {
            error.name = 'please the name is required!'
        }
        if (!countryId) {
            error.countryId = 'please the countryId is required!'
        }

        setError(error)

        return Object.keys(error).length === 0
    }

    return (
        <Form onSubmit={submitHandler} className='p-3 bg-warning mt-4'>
            <FormGroup>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter name'
                    invalid={error.name !== undefined}
                />
            </FormGroup>
            <FormGroup className='py-3'>
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
            </FormGroup>
            <Button type='submit' color='success'>Update</Button>
        </Form>
    )
}

export default Update