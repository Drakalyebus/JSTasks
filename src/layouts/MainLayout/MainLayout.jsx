import { Outlet } from 'react-router';
import React from 'react';

import Nav from '../../components/Nav/Nav.jsx';

function MainLayout() {
    return (
        <div>
            <Nav />
            <Outlet />
        </div>
    );
}

export default MainLayout;