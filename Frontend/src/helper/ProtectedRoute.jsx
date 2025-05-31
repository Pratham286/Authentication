import { useEffect } from "react";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios"
const ProtectedRoute = () =>{
    const token = localStorage.getItem('token');
    const [isValid, setIsValid] = useState(null);

    useEffect(()=>{
        const verifyToken = async () => {
            try {
                const response = await axios.get("http://localhost:3000/dashboard/verify", {
                    headers:{
                        Authorization : `Bearer ${token}`
                    }
                });
                // console.log(response.data.valid)
                setIsValid(response.data.valid);
            } catch (error) {
                console.log(error)
                setIsValid(false);
            }
        }
        if(token)
        {
            verifyToken();
        }
        else{
            setIsValid(false);
        }
    }, [token])
    if(isValid === null)
    {
        return <div>Loading...</div>
    }
    return isValid ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;