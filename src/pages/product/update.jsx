import { useState } from "react/cjs/react.development";
import { Button, Col, Form, FormFeedback, FormGroup, Input, Row } from "reactstrap";
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from "react";




function Update({ editHandler, editItem }) {

    const [error, setError] = useState(false)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [vat, setVat] = useState('')
    const [discount, setDiscount] = useState('')
    const [category, setCategory] = useState('')
    const [subcategoryId, setSubcategoryId] = useState('')
    const [colors, setColors] = useState('')
    const [sizes, setSizes] = useState('')
    const [tags, setTags] = useState('')
    const [file, setFile] = useState('')
    const [files, setFiles] = useState('')
    const [contact, setContact] = useState('')
    const [description, setDescription] = useState('')

    const update = useStoreActions(action => action.product.update)
    const catData = useStoreState(state => state.category.data)
    const scatData = useStoreState(state => state.subcategory.data)
    const clrData = useStoreState(state => state.color.data)
    const sizData = useStoreState(state => state.size.data)
    const tagData = useStoreState(state => state.tag.data)


    useEffect(() => {
        setTitle(editItem.title)
        setPrice(editItem.price)
        setVat(editItem.vat)
        setDiscount(editItem.discount)

        setSubcategoryId(editItem.subcategoryId)
        setColors(editItem.colors)
        setSizes(editItem.sizes)
        setTags(editItem.tags)
        setFile(editItem.file)
        setFiles(editItem.files)
        setContact(editItem.contact)
        setDescription(editItem.description)

        scatData.forEach(item => {
            if (item.id === editItem.subcategoryId) {
                setCategory(item.categoryId)
            }
        })
    }, [editItem, scatData])


    const filesChangeHandler = (e) => {
        const arr = []

        for (let i = 0; i < e.target.files.length; i++) {
            arr.push(URL.createObjectURL(e.target.files[i]));
        }
        setFiles(arr)
    }


    const submitHandler = (e) => {
        e.preventDefault()

        if (!validator()) {
            return
        }
        update({
            id: editItem.id,
            title,
            price,
            vat,
            discount,
            category,
            subcategoryId,
            colors,
            sizes,
            tags,
            file,
            files,
            contact,
            description,
            successHandler
        })
    }

    const successHandler = () => {
        setTitle('')
        setPrice('')
        setVat('')
        setDiscount('')
        setCategory('')
        setSubcategoryId('')
        setColors('')
        setSizes('')
        setTags('')
        setFile('')
        setFiles('')
        setContact('')
        setDescription('')
        editHandler()
        alert('Product update successfully!')
    }

    const validator = () => {
        const error = {}
        if (!title) {
            error.title = 'Please the title is required!'
        }
        if (!price) {
            error.price = 'Please the price is required!'
        }
        if (!vat) {
            error.vat = 'Please the vat is required!'
        }
        if (!discount) {
            error.discount = 'Please the discount is required!'
        }
        if (!category) {
            error.category = 'Please the category is required!'
        }
        if (!subcategoryId) {
            error.subcategoryId = 'Please the subcategory is required!'
        }
        if (!colors) {
            error.colors = 'Please the colors is required!'
        }
        if (!sizes) {
            error.sizes = 'Please the sizes is required!'
        }
        if (!tags) {
            error.tags = 'Please the tags is required!'
        }
        if (!file) {
            error.file = 'Please the file is required!'
        }
        if (!files) {
            error.files = 'Please the files is required!'
        }
        if (!contact) {
            error.contact = 'Please the contact is required!'
        }
        if (!description) {
            error.description = 'Please the description is required!'
        }

        setError(error)

        return Object.keys(error).length === 0
    }

    return (
        <Form onSubmit={submitHandler} className='p-3  mt-3 bg-warning'>
            <Row>
                <Col sm={6}>
                    <FormGroup className='py-1 '>
                        <Input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Enter title'
                            invalid={error.title !== undefined}
                        />
                        <FormFeedback>{error.title}</FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm={6}>
                    <FormGroup className='py-1'>
                        <Input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder='Enter price'
                            invalid={error.price !== undefined}
                        />
                        <FormFeedback>{error.price}</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <FormGroup className='py-1 '>
                        <Input
                            type="number"
                            value={vat}
                            onChange={(e) => setVat(e.target.value)}
                            placeholder='Enter vat'
                            invalid={error.vat !== undefined}
                        />
                        <FormFeedback>{error.vat}</FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm={6}>
                    <FormGroup className='py-1'>
                        <Input
                            type="number"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            placeholder='Enter discount'
                            invalid={error.discount !== undefined}
                        />
                        <FormFeedback>{error.discount}</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <FormGroup className='py-1'>
                        <Input
                            type="select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            invalid={error.category !== undefined}
                        >
                            <option value=''>Select Category</option>
                            {catData && catData.length !== 0 && catData.map(item =>
                                <option key={item.id} value={item.id}>{item.name}</option>)}
                        </Input>
                        <FormFeedback>{error.category}</FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm={6}>
                    <FormGroup className='py-1'>
                        <Input
                            type="select"
                            value={subcategoryId}
                            onChange={(e) => setSubcategoryId(e.target.value)}
                            invalid={error.subcategoryId !== undefined}
                        >
                            <option value=''>Select Subcategory</option>
                            {scatData && scatData.length !== 0 && scatData.map(item => item.categoryId === category &&
                                <option key={item.id} value={item.id}>{item.name}</option>)}
                        </Input>
                        <FormFeedback>{error.subcategoryId}</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <FormGroup className='py-1'>
                        <Input
                            type="select"
                            value={colors}
                            onChange={(e) => setColors(e.target.value)}
                            invalid={error.colors !== undefined}
                        >
                            <option value=''>Select Color</option>
                            {clrData && clrData.length !== 0 && clrData.map(item =>
                                <option key={item.id} value={item.id}>{item.name}</option>)}
                        </Input>
                        <FormFeedback>{error.colors}</FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm={6}>
                    <FormGroup className='py-1'>
                        <Input
                            type="select"
                            value={sizes}
                            onChange={(e) => setSizes(e.target.value)}
                            invalid={error.sizes !== undefined}
                        >
                            <option value=''>Select Size</option>
                            {sizData && sizData.length !== 0 && sizData.map(item =>
                                <option key={item.id} value={item.id}>{item.name}</option>)}
                        </Input>
                        <FormFeedback>{error.sizes}</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <FormGroup className='py-1'>
                        <Input
                            type="select"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            invalid={error.tags !== undefined}
                        >
                            <option value=''>Select Tag</option>
                            {tagData && tagData.length !== 0 && tagData.map(item =>
                                <option key={item.id} value={item.id}>{item.name}</option>)}
                        </Input>
                        <FormFeedback>{error.tags}</FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm={6}>
                    <FormGroup className='py-1'>
                        <Input
                            type="number"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder='Enter contact'
                            invalid={error.contact !== undefined}
                        />
                        <FormFeedback>{error.contact}</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <FormGroup className=' py-1'>
                        <Input
                            type="file"
                            onChange={(e) => e.target.files.length !== 0 && setFile(URL.createObjectURL(e.target.files[0]))}
                            invalid={error.file !== undefined}
                        />
                        {file && <img src={file} alt='pdtImg' height='100' />}
                        <FormFeedback>{error.file}</FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm={6}>
                    <FormGroup className='py-1 '>
                        <Input
                            type="file"
                            onChange={filesChangeHandler}
                            multiple
                            invalid={error.files !== undefined}
                        />
                        {files && files.length !== 0 && files.map(item => <img src={item} key={item} alt="Pdt-sub-Img" height='50' width='50' />)}
                        <FormFeedback>{error.files}</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
            <FormGroup className='py-1'>
                <Input
                    type='textarea'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    invalid={error.description !== undefined}
                />
                <FormFeedback>{error.description}</FormFeedback>
            </FormGroup>
            <Button color='success' type='submit' className='mt-3' >Update</Button>
        </Form>
    )
}

export default Update