import { Link } from '@reach/router';
import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);


    const authData = useStoreState(state => state.auth.data)
    const cartData = useStoreState(state => state.cart.data)
    const logoutHandler = useStoreActions(action => action.auth.logout)
    const cartRemoveHandler = useStoreActions(action => action.cart.remove)

    return (
        <div>
            <Navbar color="warning" light expand="md" className="px-3 my-5">
                {/* <NavbarBrand href="/blank" className="ps-2">LOGO</NavbarBrand> */}
                <Link to='/' className='navbar-brand'>LOGO</Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto px-2" navbar>
                        {cartData.length !== 0 &&
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>Cart</DropdownToggle>
                                <DropdownMenu right style={{ width: '250px' }}>
                                    {cartData.map((item, i) =>
                                        <DropdownItem key={item.id} className="d-flex justify-content-between">
                                            <span>{++i}. {item.title}</span>
                                            <span>{item.quantity} x {item.quantity * item.price}</span>
                                            <span className="px-2 bg-danger" onClick={() => cartRemoveHandler(item.id)}>X</span>
                                        </DropdownItem>
                                    )}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        }
                        <NavItem>
                            <NavLink href="/all-product/">All-Product</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/check-out/">Check-out</NavLink>
                        </NavItem>

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Admin Panel
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <Link to='/admin-order' className='nav-link text-dark'>Order</Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <Link to='/category' className='nav-link text-dark'>Category</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to='/subcategory' className='nav-link text-dark'>Subcategory</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to='/color' className='nav-link text-dark'>Color</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to='/size' className='nav-link text-dark'>Size</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to='/tag' className='nav-link text-dark'>Tag</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to='/country' className='nav-link text-dark'>Country</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to='/state' className='nav-link text-dark'>State</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to='/city' className='nav-link text-dark'>City</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to='/street' className='nav-link text-dark'>Street</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to='/product' className='nav-link text-dark'>Product</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to='/user' className='nav-link text-dark'>User</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to='/review' className='nav-link text-dark'>Review</Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        {authData.length === 0 ?
                            <NavItem><Link to='/login' className='nav-link'>LogIn</Link></NavItem> :
                            <>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>{authData[0].name}</DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <Link to='/user-order' className='nav-link text-dark' >Order</Link>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <NavItem><Link to='#blank' className='nav-link' onClick={() => logoutHandler()}>Logout</Link></NavItem>
                            </>}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;