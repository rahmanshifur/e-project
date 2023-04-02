import { useStoreActions, useStoreState } from 'easy-peasy';
import { Button, Table } from 'reactstrap';

function ListItems({ editHandler, isOpen, editItem }) {
    const remove = useStoreActions(action => action.user.remove)
    const activeInactive = useStoreActions(action => action.user.activeInactive)
    const userData = useStoreState(state => state.user.data)

    const countData = useStoreState(state => state.country.data)
    const stateData = useStoreState(state => state.state.data)
    const cityData = useStoreState(state => state.city.data)
    const streetData = useStoreState(state => state.street.data)


    function getStreet(streetId) {
        let result = '';
        streetData.forEach(street => {
            if (street.id === streetId) {
                result = street.name
            }
        })
        return result;
    }

    function getCity(streetId) {
        let result = '';
        streetData.forEach(street => {
            if (street.id === streetId) {
                cityData.forEach(city => {
                    if (city.id === street.cityId) {
                        result = city.name
                    }
                })
            }
        })
        return result;
    }

    function getState(streetId) {
        let result = ''
        streetData.forEach(street => {
            if (street.id === streetId) {
                cityData.forEach(city => {
                    if (city.id === street.cityId) {
                        stateData.forEach(state => {
                            if (state.id === city.stateId) {
                                result = state.name
                            }
                        })
                    }
                })
            }
        })
        return result
    }

    function getCountry(streetId) {
        let result = ''
        streetData.forEach(street => {
            if (street.id === streetId) {
                cityData.forEach(city => {
                    if (city.id === street.cityId) {
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
                        <th>Image</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Country</th>
                        <th>State</th>
                        <th>City</th>
                        <th>Street</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                </thead>
                <tbody>
                    {userData.length !== 0 && userData.map((item, i) =>
                        <tr key={item.id}>
                            <td>{++i}</td>
                            <td>{<img src={item.file} alt='userImg' height='100' />}</td>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.contact}</td>
                            <td>{getCountry(item.streetId)}</td>
                            <td>{getState(item.streetId)}</td>
                            <td>{getCity(item.streetId)}</td>
                            <td>{getStreet(item.streetId)}</td>
                            <td>{Number(item.status) === 1 ? 'Active' : 'Inactive'}</td>
                            <td >
                                <div className='d-flex justify-content-between'>
                                    <Button onClick={() => activeInactive(item.id)}>{Number(item.status) === 1 ? 'Inactive' : 'Active'}</Button>
                                    <Button className='btn-success mx-2' onClick={() => editHandler(item)}>Edit</Button>
                                    <Button className='btn btn-danger' onClick={() => remove(item.id)}>Delete</Button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default ListItems