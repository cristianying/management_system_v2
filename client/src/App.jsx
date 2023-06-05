import React, {  useState,useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { RestaurantsContextProvider } from './context/RestaurantsContext';
import Home from './routes/Home';
import Login from './routes/Login';
import RestaurantdetailPage from './routes/RestaurantdetailPage';
import UpdateRestaurant from './routes/UpdateRestaurant';
import Register from "./routes/Register";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import RestaurantFinder from './apis/RestaurantFinder'
import ClientPage from './routes/ClientPage';
import UpdateClient from './routes/UpdateClient'
// toast.configure();
import 'bootstrap-icons/font/bootstrap-icons.css'
import './style.css';
import OrderPage from './routes/OrderPage';
import ProductPage from './routes/ProductPage';

const App = () => {

    const [mounted, setMounted] = useState(false)
    const [isAuthenticated, setIsAuthenticated]=useState(false);

    const isAuth = async() =>{

        try {
            //console.log("localStorage.token: ", !!localStorage.token);
            
            if(localStorage.token){
                
                const res = await RestaurantFinder.get("/auth/is-verify", {
                    headers: {token: localStorage.token}
                   })

            //console.log("new json: " ,res )

            const parseRes = await res.data;

            parseRes === true ? setIsAuthenticated(true):setIsAuthenticated(false);
            
        }
        setMounted(true)
        } catch (error) {
            console.error(error.message);
            localStorage.removeItem("token");
        }
    }

useEffect(() => {

    isAuth();
},[])

    const setAuth = (boolean) =>{
        setIsAuthenticated(boolean);
    }

    
   

if(mounted){
    return( 
   
    <RestaurantsContextProvider>
    
        <Router>
            <Routes>
                    <Route exact path = "/login" element={<Login setAuth={setAuth}/>}/>
                    <Route path="/register" element={<Register setAuth={setAuth}/>}/>
                    <Route path="/" element={!isAuthenticated ? <Navigate to="/login" /> : <Home setAuth={setAuth}/>}/>
                    <Route path="/restaurants/:id" element={!isAuthenticated ? <Navigate to="/login" /> : <RestaurantdetailPage setAuth={setAuth}/>}/>
                    <Route path="/restaurants/:id/update" element={!isAuthenticated ? <Navigate to="/login" /> : <UpdateRestaurant setAuth={setAuth}/>}/>
                    <Route path="/clients" element={!isAuthenticated ? <Navigate to="/login" /> : <ClientPage setAuth={setAuth}/>}/>
                    <Route path="/clients/:id/update" element={!isAuthenticated ? <Navigate to="/login" /> : <UpdateClient setAuth={setAuth}/>}/>
                    <Route path="/client_orders" element={!isAuthenticated ? <Navigate to="/login" /> : <OrderPage setAuth={setAuth}/>}/>
                    <Route path="/products" element={!isAuthenticated ? <Navigate to="/login" /> : <ProductPage setAuth={setAuth}/>}/>
            </Routes>
        </Router>
    
 
    
    </RestaurantsContextProvider>
     
    
            )
        } else {

            return(
                <></>
                )}



};

export default App;