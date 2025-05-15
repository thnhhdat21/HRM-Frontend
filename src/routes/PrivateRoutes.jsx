import React, { useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoutes = ({ children }) => {
    let navigate = useNavigate()
    const employeeId = Cookies.get("employeeId")
    useEffect(() => {
        if (!employeeId) {
            navigate("/")
        }
    }, [])

    return employeeId && children
};



export default PrivateRoutes;

