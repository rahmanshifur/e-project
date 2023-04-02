import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import AllOrder from './all-order';
import CancelOrder from './cancel';
import Complete from './complete';
import Order from './order';
import Processing from './processing';

const Tab = () => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div>
            <Nav tabs role="button">
                <NavItem>
                    <NavLink
                        className={activeTab === '1' ? 'active' : ''}
                        onClick={() => { toggle('1'); }}
                    >
                        All-Order
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={activeTab === '2' ? 'active' : ''}
                        onClick={() => { toggle('2'); }}
                    >
                        Order
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={activeTab === '3' ? 'active' : ''}
                        onClick={() => { toggle('3'); }}
                    >
                        Cancel
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={activeTab === '4' ? 'active' : ''}
                        onClick={() => { toggle('4'); }}
                    >
                        Processing
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={activeTab === '5' ? 'active' : ''}
                        onClick={() => { toggle('5'); }}
                    >
                        Complete
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <AllOrder />
                </TabPane>
                <TabPane tabId="2">
                    <Order />
                </TabPane>
                <TabPane tabId="3">
                    <CancelOrder />
                </TabPane>
                <TabPane tabId="4">
                    <Processing />
                </TabPane>
                <TabPane tabId="5">
                    <Complete />
                </TabPane>
            </TabContent>
        </div>
    );
}

export default Tab;