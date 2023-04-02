import { useStoreState, useStoreActions } from "easy-peasy";
import { useState } from "react";
import { Button, Table } from "reactstrap";
import totalCal from "../../components/order-totalCal";
import { dateTime } from './../../utils/helper';
import OrderItems from "./order-items";



function Processing() {

    const [isOpen, setIsOpen] = useState(false)
    const [pdtItem, setPdtItem] = useState('')

    const orderData = useStoreState(state => state.order.data)
    const updateOrder = useStoreActions(action => action.order.update)



    function modalHandler(pdtItem) {
        setIsOpen(true)
        setPdtItem(pdtItem)
    }

    function orderCompleteHandler(orderId) {
        let obj = {
            orderId: orderId,
            status: 'COMPLETE'
        }
        updateOrder(obj)
    }



    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Order ID</th>
                        <th>No Order Items</th>
                        <th>Order Amount</th>
                        <th>Order Status</th>
                        <th>Date&Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orderData.length !== 0 && orderData.map((item, i) => item.status === 'PROCESSING' &&
                        <tr key={item.id}>
                            {console.log('item', item)}
                            <td>{++i}</td>
                            <td>{item.orderId}</td>
                            <td>{item.pdtItem.length}</td>
                            <td>BDT{totalCal(item.pdtItem)}</td>
                            <td>{item.status}</td>
                            <td>{dateTime(item.createdAt)}</td>
                            <td>
                                <Button color='info' onClick={() => modalHandler(item.pdtItem)}>View</Button>
                                <Button className=' ms-2 btn-success' onClick={() => orderCompleteHandler(item.orderId)}>Complete</Button>
                            </td>
                        </tr>)}
                </tbody>
            </Table>
            {isOpen && <OrderItems pdtItem={pdtItem} toggle={() => setIsOpen(false)} />}
        </div>
    )
}

export default Processing