import { Table, Button } from "reactstrap";
import totalCal from './../../components/order-totalCal';
import { dateTime } from './../../utils/helper';
import { useStoreActions, useStoreState } from 'easy-peasy';
import OrderItems from "./order-items";
import { useState } from "react";



function Order() {

    const [isOpen, setIsOpen] = useState(false)
    const [pdtItems, setPdtItems] = useState('')

    const orderData = useStoreState(state => state.order.data)
    const updateOrder = useStoreActions(action => action.order.update)


    function modalHandler(pdtItem) {
        setIsOpen(true)
        setPdtItems(pdtItem)
    }

    function orderProcessingHandler(orderId) {
        let obj = {
            orderId: orderId,
            status: 'PROCESSING'
        }
        updateOrder(obj)
    }
    function orderCompleteHandler(orderId) {
        let obj = {
            orderId: orderId,
            status: 'COMPLETE'
        }
        updateOrder(obj)
    }
    function orderCancelHandler(orderId) {
        let obj = {
            orderId: orderId,
            status: 'CANCEL'
        }
        updateOrder(obj)
    }

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Order Id</th>
                        <th>Item Of Order</th>
                        <th>Order Amount</th>
                        <th>Order Status</th>
                        <th>Date&Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orderData.length !== 0 && orderData.map((item, i) =>
                        < tr key={item.id} >
                            <td>{++i}. </td>
                            <td>{item.orderId}</td>
                            <td>{item.pdtItem.length}</td>
                            <td>{totalCal(item.pdtItem)}</td>
                            <td>{item.status}</td>
                            <td>{dateTime(item.createdAt)}</td>
                            <td >
                                <div className='d-flex justify-content-between'>
                                    {(item.status === 'ORDER' || item.status === 'PROCESSING') &&
                                        <Button color='danger' onClick={() => orderCancelHandler(item.orderId)}>Cancel</Button>}
                                    {item.status === 'ORDER' &&
                                        <Button className='ms-1 btn-warning' onClick={() => orderProcessingHandler(item.orderId)}>Processing</Button>}
                                    {item.status === 'PROCESSING' &&
                                        < Button className='ms-1 btn-success' onClick={() => orderCompleteHandler(item.orderId)}>Complete</Button>}
                                    <Button className='ms-1 btn-info' onClick={() => modalHandler(item.pdtItem)}>View</Button>
                                </div>
                            </td>
                        </tr>)}
                </tbody>
            </Table>
            {isOpen && <OrderItems pdtItem={pdtItems} toggle={() => setIsOpen(false)} />}
        </div >
    )
}

export default Order