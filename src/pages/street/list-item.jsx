import { Table, Button } from "reactstrap";
import { useStoreActions, useStoreState } from 'easy-peasy';

function ListItems({ editHandler, editItem, isOpen }) {

    const streetData = useStoreState(state => state.street.data)
    const cityData = useStoreState(state => state.city.data)
    const countData = useStoreState(state => state.country.data)
    const stateData = useStoreState(state => state.state.data)
    const remove = useStoreActions(action => action.street.remove)


    function getCity(cityId) {
        let result = '';
        cityData.forEach(item => {
            if (item.id === cityId) {
                result = item.name
            }
        })
        return result;
    }


    function getState(cityId) {
        let result = '';
        cityData.forEach(city => {
            if (city.id === cityId) {
                stateData.forEach(state => {
                    if (state.id === city.stateId) {
                        result = state.name
                    }
                })
            }
        })
        return result;
    }


    function getCountry(cityId) {
        let result = '';
        cityData.forEach(city => {
            if (city.id === cityId) {
                stateData.forEach(state => {
                    if (state.id === city.stateId) {
                        countData.forEach(count => {
                            if (count.id === state.countryId) {
                                result = count.name
                            }
                        })
                    }
                })
            }
        })
        return result
    }


    return (
        <div>
            <div className='d-flex justify-content-between py-3'>
                <h3>List of Street</h3>
                <Button onClick={() => editHandler()}>{(Object.keys(editItem).length !== 0 || isOpen) ? 'Close' : 'Add'}</Button>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Id</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {streetData.length !== 0 && streetData.map((item, i) =>
                        <tr key={item.id}>
                            <td>{++i}</td>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{getCity(item.cityId)}</td>
                            <td>{getState(item.cityId)}</td>
                            <td>{getCountry(item.cityId)}</td>
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