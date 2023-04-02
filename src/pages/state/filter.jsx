import { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { useStoreActions, useStoreState } from 'easy-peasy';


function Filter() {

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [country, setCountry] = useState('')

    const filter = useStoreActions(action => action.state.filterData)
    const reset = useStoreActions(action => action.state.resetFilter)
    const countData = useStoreState(state => state.country.data)

    const submitHandler = (e) => {
        e.preventDefault()

        if (!name && !id && !country) {
            alert('You did not write any text')
            return
        }

        filter({ id, name, country })

    }

    const resetHandler = () => {
        setId('')
        setName('')
        setCountry('')
        reset()
    }

    return (
        <Form onSubmit={submitHandler} className='py-4 d-flex justify-content-between'>
            <FormGroup>
                <Input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder='Enter id'
                />
            </FormGroup>
            <FormGroup>
                <Input
                    type="select"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                >
                    <option value=''>Select Country</option>
                    {countData && countData.length > 0 && countData.map((item) =>
                        <option key={item.id} value={item.id}>{item.name}</option>)}
                </Input>
            </FormGroup>
            <FormGroup>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter name'
                />
            </FormGroup>
            <Button color='primary' type='submit'>Filter</Button>
            <Button color='dark' onClick={() => resetHandler()}>Reset</Button>
        </Form>
    )
}

export default Filter