import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setIsLogin } from '../redux/slices/userSlice';


const ProtectedRoutes = ({ children }) => {

            const [isAuthenticated, setIsAuthenticated] = useState(null);
          

            const user = useSelector(state => state.user.isLogin);
       
            if (user === null) {
                        return <div>Loading.....</div>
            }
            if (!user) {
                        return <Navigate to={"/login"} replace />
            }
            return children;
}

export default ProtectedRoutes      