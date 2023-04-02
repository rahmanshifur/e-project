import { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { useStoreActions, useStoreState } from 'easy-peasy';


function Filter() {

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')

    const filter = useStoreActions(action => action.subcategory.filterData)
    const reset = useStoreActions(action => action.subcategory.resetFilter)
    const catData = useStoreState(state => state.category.data)

    const submitHandler = (e) => {
        e.preventDefault()

        if (!name && !id && !category) {
            alert('You did not write any text')
            return
        }

        filter({ id, name, category })

    }

    const resetHandler = () => {
        setId('')
        setName('')
        setCategory('')
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
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value=''>Select Category</option>
                    {catData && catData.length > 0 && catData.map((item) =>
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