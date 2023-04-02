
import { Input, Table, Button, Row, Col } from 'reactstrap';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Sidebar from '../../components/sidebar';
import { Link } from '@reach/router';

function CheckOut() {

    const cartData = useStoreState(state => state.cart.data)
    const remove = useStoreActions(action => action.cart.remove)
    const updateCart = useStoreActions(action => action.cart.update)

    const quantityHandler = (quantity, pdt) => {
        if (quantity < 1 || quantity > 50) {
            alert('Please provide a valid quantity!')
            return
        }
        updateCart({ id: pdt, quantity })
    }

    function totalCal() {
        let total = 0
        if (cartData && cartData.length) {
            cartData.forEach(item => {
                total += item.quantity * item.price
            })
        }
        return total
    }

    return (
        <div>

            <Row>
                <Col sm={3}>
                    <Sidebar />
                </Col>
                <Col sm={9}>
                    {cartData.length !== 0 &&
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Vat</th>
                                    <th>Discount</th>
                                    <th>Total-Price</th>
                                    <th>Quantity</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartData.length !== 0 && cartData.map((item, i) =>
                                    <tr key={item.id}>
                                        <td>{++i}</td>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>BDT{item.price}</td>
                                        <td>{item.vat}%</td>
                                        <td>{item.discount}%</td>
                                        <td>BDT{item.quantity * item.price}</td>
                                        <td>
                                            <Input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => quantityHandler(e.target.value, item.id)}
                                                style={{ width: 75 }}
                                            />
                                        </td>
                                        <td>
                                            <Button color='danger' onClick={() => remove(item.id)} >Delete</Button>
                                        </td>
                                    </tr>)}
                                {cartData && cartData.length && <tr>
                                    <td colspan='8'><b>GROUND-TOTAL :</b></td>
                                    <td>BDT{totalCal()}</td>
                                </tr>}
                            </tbody>
                        </Table>
                    }
                    {cartData.length !== 0 &&
                        <Link to='/payment' className="float-end btn btn-primary" >Pay Now</Link>}
                </Col>
            </Row>
        </div>
    )
}

export default CheckOut