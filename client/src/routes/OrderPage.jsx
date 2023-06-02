import React, { useEffect, useState } from 'react'
import RestaurantFinder from "../apis/RestaurantFinder"
import AddClient from '../Components/AddClient'
import ClientOrdersList from '../Components/ClientOrdersList'
import NavBar from '../Components/NavBar';


const OrderPage = () => {

    const [ClientOrders, setClientOrders] = useState("");

    useEffect(()=>{
        const fetchData = async ()=> {
        
            try {
                const responce = await RestaurantFinder.get("/api/v1/client_orders", {
                
                    headers: {token: localStorage.token}
               });
    
               console.log("new json: " ,responce.data.data )
               if(responce.data.data.order[0].order_id !== null){
                setClientOrders(responce.data.data.order);
               }
                
                // console.log("first value",responce.data.data.restaurant);
            } catch (err) {
                // console.log(err);
            }
        }
  
        fetchData()
    },[setClientOrders])


  return (
    <div>
        <NavBar/>
        <div className='main'>
            <h1 className='font-weight-light display-4 text-center'>
                Client Orders
            </h1>
            <AddClient/>
            <ClientOrdersList ClientOrders={ClientOrders}/>
        </div>
    </div>
  )
}

export default OrderPage