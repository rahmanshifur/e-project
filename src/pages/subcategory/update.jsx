
import { Input } from 'reactstrap';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Button, Form, FormGroup, } from 'reactstrap';
import { useEffect, useState } from 'react';


function Update({ editItem, editHandler }) {
    const [error, setError] = useState({})
    const [name, setName] = useState()
    const [categoryId, setCategoryId] = useState()
    const [file, setFile] = useState()


    const catData = useStoreState(state => state.category.data)
    const update = useStoreActions(action => action.subcategory.update)


    useEffect(() => {
        setName(editItem.name)
        setCategoryId(editItem.categoryId)
        setFile(editItem.file)
    }, [editItem])

    const submitHandler = (e) => {
        e.preventDefault()

        if (!validator()) {
            return
        }

        update({
            id: editItem.id,
            name,
            categoryId,
            file,
        })

        setName('')
        setCategoryId('')
        setFile('')
        editHandler()
    }

    const validator = () => {
        const error = {}
        if (!name) {
            error.name = 'please the name is required!'
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
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    invalid={error.categoryId !== undefined}
                >
                    <option value=''>Select Category</option>
                    {catData && catData.length !== 0 && catData.map(item =>
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )}
                </Input>
            </FormGroup>
            <FormGroup className='pb-3 text-light'>
                <Input
                    type='file'
                    onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))}
                    invalid={error.name !== undefined}
                />
                {file && <img src={file} alt='scatData' height='100' />}
            </FormGroup>
            <Button type='submit' color='success'>Update</Button>
        </Form>
    )
}

export default Update