
import { Input } from 'reactstrap';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Button, Form, FormGroup, FormFeedback } from 'reactstrap';
import { useState } from 'react';


function Create({ editHandler }) {
    const [error, setError] = useState({})
    const [name, setName] = useState()
    const [categoryId, setCategoryId] = useState()
    const [file, setFile] = useState()


    const catData = useStoreState(state => state.category.data)
    const create = useStoreActions(action => action.subcategory.create)

    const submitHandler = (e) => {
        e.preventDefault()

        if (!validator()) {
            return
        }

        create({ name, categoryId, file, })

        setName('')
        setCategoryId('')
        setFile('')
        editHandler('')
    }

    const validator = () => {
        const error = {}
        if (!name) {
            error.name = 'Please the name is required!'
        }
        if (!categoryId) {
            error.categoryId = 'please the categoryId is required!'
        }
        if (!file) {
            error.file = 'please the file is required!'
        }

        setError(error)

        return Object.keys(error).length === 0
    }

    return (
        <Form onSubmit={submitHandler} className='p-3 bg-dark mt-4'>
            <FormGroup>
                <Input
                    // valid
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter name'
                    invalid={error.name !== undefined}

                />
                <FormFeedback>{error.name}</FormFeedback>
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
            </FormGroup>
            <FormGroup className='py-2'>
                <Input
                    type="select"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    invalid={error.categoryId !== undefined}
                >
                    <option value=''>Select Category</option>
                    {catData && catData.length !== 0 && catData.map(item =>
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )}
                </Input>
                <FormFeedback>{error.categoryId}</FormFeedback>
            </FormGroup>
            <FormGroup className='pb-2 text-light'>
                <Input
                    type='file'
                    onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))}
                    invalid={error.name !== undefined}
                />
                {file && <img src={file} alt='scatData' height='100' />}
                <FormFeedback>{error.file}</FormFeedback>

            </FormGroup>
            <Button type='submit' color='primary'>Save</Button>
        </Form>
    )
}

export default Create