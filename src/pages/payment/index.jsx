import { navigate } from "@reach/router"
import { useStoreActions, useStoreState } from "easy-peasy"
import { Col, Row, Table, Button } from "reactstrap"
import Sidebar from "../../components/sidebar"


function Payment() {


    const cartData = useStoreState(state => state.cart.data)
    const authData = useStoreState(state => state.auth.data)

    const createOrder = useStoreActions(action => action.order.create)
    const cartEmpty = useStoreActions(action => action.cart.cartEmpty)

    function totalCal() {
        let total = 0
        if (cartData && cartData.length) {
            cartData.forEach(item => {
                total += item.quantity * item.price
            })
        }
        return total
    }

    function orderHandler() {

        if (authData.length === 0) {
            navigate('/login')
            return
        }

        let obj = {
            pdtItem: cartData,
            status: "ORDER",
            userId: authData[0].id
        }

        createOrder(obj)
        cartEmpty()
    }

    return (
        <div>
            <Row>
                <Col sm={3}>
                    <Sidebar />
                </Col>
                <Col sm={9}>
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
                                    <td>{item.quantity}</td>
                                </tr>)}
                            {cartData && cartData.length && <tr>
                                <td colspan="7"><b>GROUND-TOTAL :</b></td>
                                <td>BDT{totalCal()}</td>
                            </tr>}
                        </tbody>
                    </Table>
                    {cartData.length !== 0 &&
                        <Button className="btn btn-success float-end" onClick={() => orderHandler()}>Submit</Button>}
                </Col>
            </Row>
        </div>
    )
}

export default Payment