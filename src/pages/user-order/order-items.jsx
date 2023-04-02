

import { Modal, ModalHeader, ModalBody, Table } from 'reactstrap';

const OrderItems = ({ pdtItem, toggle }) => {

    return (
        <div>
            <Modal isOpen={true} toggle={toggle} size='lg' className=''>
                <ModalHeader className='modal-header bg-warning' toggle={toggle} >Order Items :</ModalHeader>
                <ModalBody className='bg-dark'>
                    <Table className='text-light'>
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
                            {pdtItem.length !== 0 && pdtItem.map((item, i) =>
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
                        </tbody>
                    </Table>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default OrderItems