import { useStoreActions, useStoreState } from 'easy-peasy';
import { Table, Button } from 'reactstrap';

function ListItems({ editHandler, isOpen, editItem }) {

    const remove = useStoreActions(action => action.review.remove)
    const reviewData = useStoreState(state => state.review.data)
    const pdtData = useStoreState(state => state.product.data)
    const userData = useStoreState(state => state.user.data)

    // console.log(pdtData)

    return (
        <div>
            <div className='d-flex justify-content-between py-3'>
                <h3>List of Review</h3>
                <Button onClick={() => editHandler()}>{(Object.keys(editItem).length !== 0 || isOpen) ? 'Close' : 'Add'}</Button>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>User</th>
                        <th>Product</th>
                        <th>Star</th>
                        <th>Comment</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reviewData.length !== 0 && reviewData.map((item, i) =>
                        <tr key={item.id}>
                            <td>{++i}</td>
                            <td>{item.id}</td>
                            <td>{userData.length !== 0 && userData.map(usr => usr.id === item.userId && <span key={usr.id}>{usr.name}</span>)}</td>
                            <td>{pdtData.length !== 0 && pdtData.map(pdt => pdt.id === item.productId && <span key={pdt.id}>{pdt.title}</span>)}</td>
                            <td>{item.star}*</td>
                            <td>{item.comment}</td>
                            <td >
                                <Button color='success' onClick={() => editHandler(item)}>Edit</Button>
                                <Button color='danger' onClick={() => remove(item.id)}>Delete</Button>
                            </td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
    )
}

export default ListItems