import { useStoreActions, useStoreState } from "easy-peasy";
import { Button, Table } from "reactstrap";


function ListItems({ editHandler, isOpen, editItem }) {

    const catData = useStoreState(state => state.category.data)
    const remove = useStoreActions(action => action.category.remove)

    return (
        <div>
            <div className='d-flex justify-content-between py-3'>
                <h3>List of Category</h3>
                <Button onClick={() => editHandler()}>{(Object.keys(editItem).length !== 0 || isOpen) ? 'Close' : 'Add'}</Button>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {catData && catData.length !== 0 && catData.map((item, i) =>
                        <tr key={item.id}>
                            <td>{++i}</td>
                            <td>{<img src={item.file} alt='catImg' height='100' />}</td>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
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