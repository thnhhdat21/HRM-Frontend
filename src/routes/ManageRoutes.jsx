import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ManageRoutes = ({ allowedRoles }) => {
    const roleString = Cookies.get('permissions');
    let roles = new Set();

    if (roleString) {
        const parsedRoles = roleString.split(',');
        roles = new Set(parsedRoles);
    }

    const hasPermission = allowedRoles.some(role => roles.has(role));

    if (!hasPermission) {
        return <Navigate to={"/no-authorization"} />
    } else {
        return <Outlet />
    }
};

export default ManageRoutes;
