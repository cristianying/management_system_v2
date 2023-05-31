import React, { useContext, useEffect } from 'react'
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from "../apis/RestaurantFinder"
import AddClient from '../Components/AddClient'
import ClientList from '../Components/ClientList'
import NavBar from '../Components/NavBar';


const ClientPage = ({setAuth}) => {

    const {setClients} = useContext(RestaurantsContext);

    useEffect(()=>{
        const fetchData = async ()=> {
        
            try {
                const responce = await RestaurantFinder.get("/api/v1/clients", {
                
                    headers: {token: localStorage.token}
               });
    
              //  console.log("new json: " ,responce.data.data.restaurants )
               if(responce.data.data.client[0].client_id !== null){
                setClients(responce.data.data.client);
               }
                
                // console.log("first value",responce.data.data.restaurant);
            } catch (err) {
                // console.log(err);
            }
        }
  
        fetchData()
    },[setClients])


  return (
    <div>
        <NavBar/>
        <div className='main'>
            <h1 className='font-weight-light display-4 text-center'>
                Clients
            </h1>
            <AddClient/>
            <ClientList/>
        </div>
    </div>
  )
}

export default ClientPage