import { useStoreActions, useStoreState } from "easy-peasy";
import { Button, Table } from "reactstrap";


function ListItems({ editHandler, isOpen, editItem }) {

    const clrData = useStoreState(state => state.country.data)
    const remove = useStoreActions(action => action.country.remove)

    return (
        <div>
            <div className='d-flex justify-content-between py-3'>
                <h3>List of Country</h3>
                <Button onClick={() => editHandler()}>{(Object.keys(editItem).length !== 0 || isOpen) ? 'Close' : 'Add'}</Button>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {clrData && clrData.length !== 0 && clrData.map((item, i) =>
                        <tr key={item.id}>
                            <td>{++i}</td>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <Button color='success' onClick={() => editHandler(item)}>Edit</Button>
                                <Button color='danger' className='ms-3' onClick={() => remove(item.id)}>Delete</Button>
                            </td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
    )
}

export default ListItems