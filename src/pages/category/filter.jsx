import { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { useStoreActions } from 'easy-peasy';


function Filter() {

    const [id, setId] = useState('')
    const [name, setName] = useState('')

    const filter = useStoreActions(action => action.category.filterData)
    const reset = useStoreActions(action => action.category.resetFilter)

    const submitHandler = (e) => {
        e.preventDefault()

        if (!name && !id) {
            alert('You did not write any text')
            return
        }

        filter({ id, name })

    }

    const resetHandler = () => {
        setId('')
        setName('')
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