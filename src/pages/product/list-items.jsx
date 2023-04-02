import { useStoreActions, useStoreState } from 'easy-peasy';
import { Table, Button } from 'reactstrap';
import { Link } from '@reach/router';


function ListItems({ editHandler, isOpen }) {

    const remove = useStoreActions(action => action.product.remove)
    const pdtData = useStoreState(state => state.product.data)
    const catData = useStoreState(state => state.category.data)
    const scatData = useStoreState(state => state.subcategory.data)
    const clrData = useStoreState(state => state.color.data)
    const sizData = useStoreState(state => state.size.data)
    const tagData = useStoreState(state => state.tag.data)

    return (
        <div>
            <div className="d-flex justify-content-between py-3">
                <h2>List of Product</h2>
                <Button onClick={() => editHandler()}>{isOpen ? 'Close' : 'Add'}</Button>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>ID</th>
                        <th>Category</th>
                        <th>Subcategory</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Vat</th>
                        <th>Discount</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Tag</th>
                        <th>Contact</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {pdtData && pdtData.length !== 0 && pdtData.map((item, i) =>
                        <tr key={item.id}>
                            <td>{++i}</td>
                            <td>{<img src={item.file} alt='pdtImg' height='100' />}</td>
                            <td>{item.id}</td>
                            <td>{scatData.length !== 0 && scatData.map(scat => scat.id === item.subcategoryId && catData.length !== 0 && catData.map(cat => cat.id === scat.categoryId && <span key={cat.id}>{cat.name}</span>))}</td>
                            <td>{scatData.length !== 0 && scatData.map(scat => scat.id === item.subcategoryId && <span key={scat.id}>{scat.name}</span>)}</td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td>{item.vat}</td>
                            <td>{item.discount}</td>
                            <td>{clrData.length !== 0 && clrData.map(clr => clr.id === item.colors && <span key={clr.id}>{clr.name}</span>)}</td>
                            <td>{sizData.length !== 0 && sizData.map(siz => siz.id === item.sizes && <span key={siz.id}>{siz.name}</span>)}</td>
                            <td>{tagData.length !== 0 && tagData.map(tag => tag.id === item.tags && <span key={tag.id}>{tag.name}</span>)}</td>
                            <td>{item.contact}</td>
                            <td>
                                <div className="d-flex">
                                    <Button color='success' onClick={() => editHandler(item)}>Edit</Button>
                                    <Link className='btn btn-primary mx-2' to={`/product-details/${item.id}`}>Details</Link>
                                    <Button className='btn-danger ' onClick={() => remove(item.id)}>Delete</Button>
                                </div>
                            </td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
    )
}

export default ListItems