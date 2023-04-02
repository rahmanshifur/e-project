import { useStoreActions, useStoreState } from "easy-peasy";
import { useState } from "react";
import { Form, Button, Input } from "reactstrap";


function Filter() {

    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [subcategory, setSubcategory] = useState('')
    const [color, setColor] = useState('')
    const [tag, setTag] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [contact, setContact] = useState('')


    const catData = useStoreState(state => state.category.data)
    const scatData = useStoreState(state => state.subcategory.data)
    const clrData = useStoreState(state => state.color.data)
    const tagData = useStoreState(state => state.tag.data)

    const filter = useStoreActions(action => action.product.filterData)
    const reset = useStoreActions(action => action.product.resetFilter)


    const submitHandler = (e) => {
        e.preventDefault()
        if (!title && !id && !category && !subcategory && !minPrice && !maxPrice && !color && !tag && !contact) {
            alert('You did not write any text')
            return
        }

        filter({
            id,
            category,
            subcategory,
            title,
            minPrice,
            maxPrice,
            color,
            tag,
            contact,
            subcategories: scatData,

        })
    }

    const resetHandler = () => {
        setId('')
        setCategory('')
        setSubcategory('')
        setTitle('')
        setMinPrice('')
        setMaxPrice('')
        setColor('')
        setTag('')
        reset()
    }


    return (
        <Form onSubmit={submitHandler} className='d-flex justify-content-between py-4'>
            <Input
                type='text'
                value={id}
                placeholder='Enter id'
                onChange={(e) => setId(e.target.value)}
            />
            <Input
                type='select'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value=''>Select Category</option>
                {catData && catData.length > 0 && catData.map((item) =>
                    <option key={item.id} value={item.id}>{item.name}</option>
                )}
            </Input>

            <Input
                type='select'
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
            >
                <option value=''>Select Subcategory</option>
                {scatData && scatData.length > 0 && scatData.map((item) =>
                    <option key={item.id} value={item.id}> {item.name}</option>
                )}
            </Input>

            <Input
                type='text'
                value={title}
                placeholder='Enter title'
                onChange={(e) => setTitle(e.target.value)}
            />
            <Input
                type='number'
                value={minPrice}
                placeholder='min-Price'
                onChange={(e) => setMinPrice(e.target.value)}
            />
            <Input
                type='number'
                value={maxPrice}
                placeholder='max-Price'
                onChange={(e) => setMaxPrice(e.target.value)}
            />
            <Input
                type='number'
                value={contact}
                placeholder='contact'
                onChange={(e) => setContact(e.target.value)}
            />

            <Input
                type='select'
                value={color}
                onChange={(e) => setColor(e.target.value)}
            >
                <option value=''>Select Color</option>
                {clrData && clrData.length > 0 && clrData.map((item) =>
                    <option key={item.id} value={item.id}>{item.name}</option>
                )}
            </Input>

            <Input
                type='select'
                value={tag}
                onChange={(e) => setTag(e.target.value)}
            >
                <option value=''>Select Tag</option>
                {tagData && tagData.length > 0 && tagData.map((item) =>
                    <option key={item.id} value={item.id}>{item.name}</option>
                )}
            </Input>

            <Button color='primary' className='mx-3' type='submit'>Filter</Button>
            <Button onClick={() => resetHandler()} type='button'>Reset</Button>
        </Form>
    )
}

export default Filter