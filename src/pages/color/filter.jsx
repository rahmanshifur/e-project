import { useStoreActions } from 'easy-peasy'
import { useState } from 'react/cjs/react.development'
import { Button, Form, FormGroup, Input } from 'reactstrap'



function Filter() {

    const [id, setId] = useState('')
    const [name, setName] = useState('')

    const filter = useStoreActions(action => action.color.filterData)
    const reset = useStoreActions(action => action.color.resetFilter)

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
        <Form onSubmit={submitHandler} className='d-flex justify-content-between py-3'>
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