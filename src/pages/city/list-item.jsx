import { Table, Button } from "reactstrap";
import { useStoreActions, useStoreState } from 'easy-peasy';

function ListItems({ editHandler, editItem, isOpen }) {

    const cityData = useStoreState(state => state.city.data)
    const countData = useStoreState(state => state.country.data)
    const stateData = useStoreState(state => state.state.data)
    const remove = useStoreActions(action => action.city.remove)

    return (
        <div>
            <div className='d-flex justify-content-between py-3'>
                <h3>List of City</h3>
                <Button onClick={() => editHandler()}>{(Object.keys(editItem).length !== 0 || isOpen) ? 'Close' : 'Add'}</Button>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Id</th>
                        <th>Country</th>
                        <th>State</th>
                        <th>City</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cityData.length !== 0 && cityData.map((item, i) =>
                        <tr key={item.id}>
                            <td>{++i}</td>
                            <td>{item.id}</td>
                            <td>{stateData.length !== 0 && stateData.map(state => state.id === item.stateId && countData.length !== 0 && countData.map(count => count.id === state.countryId && <span key={count.id}>{count.name}</span>))}</td>
                            <td>{stateData.length !== 0 && stateData.map(state => state.id === item.stateId && <span key={state.id}>{state.name}</span>)}</td>
                            <td>{item.name}</td>
                            <td>
                                <Button color='success' onClick={() => editHandler(item)}>Edit</Button>
                                <Button className='ms-3' color='danger' onClick={() => remove(item.id)}>Delete</Button>
                            </td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
    )
}

export default ListItems