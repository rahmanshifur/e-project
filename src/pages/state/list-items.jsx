import { useStoreActions, useStoreState } from "easy-peasy";
import { Button, Table } from "reactstrap";


function ListItems({ editHandler, isOpen, editItem }) {

    const stateData = useStoreState(state => state.state.data)
    const countData = useStoreState(state => state.country.data)
    const remove = useStoreActions(action => action.state.remove)

    return (
        <div>
            <div className='d-flex justify-content-between py-3'>
                <h3>List of State</h3>
                <Button onClick={() => editHandler()}>{(Object.keys(editItem).length !== 0 || isOpen) ? 'Close' : 'Add'}</Button>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Country</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {stateData && stateData.length !== 0 && stateData.map((item, i) =>
                        <tr key={item.id}>
                            <td>{++i}</td>
                            <td>{item.id}</td>
                            <td>{countData && countData.length !== 0 && countData.map(cat => cat.id === item.countryId && <span key={item.id}>{cat.name}</span>)}</td>
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