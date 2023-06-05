import React, {  useState,useEffect,useContext } from 'react'
import AddRestaurant from '../Components/AddRestaurant'
import RestaurantList from '../Components/RestaurantList'
import { RestaurantsContext } from '../context/RestaurantsContext'
import RestaurantFinder from "../apis/RestaurantFinder"
import NavBar from '../Components/NavBar'


const Home = () => {

  const [setName]=useState("");
  const {restaurants,setRestaurants} = useContext(RestaurantsContext);
  
  useEffect(()=>{
      const fetchData = async ()=> {
      
          try {
              const responce = await RestaurantFinder.get("/api/v1/restaurants", {
              
                  headers: {token: localStorage.token}
             });
  
            //  console.log("new json: " ,responce.data.data.restaurants )
             if(responce.data.data.restaurant[0].restaurant_id !== null){
              setRestaurants(responce.data.data.restaurant);
             }
              
              setName(responce.data.data.restaurant[0].user_name);
              
              // console.log("first value",responce.data.data.restaurant);
          } catch (err) {
              // console.log(err);
          }
      }

      fetchData()
      //getName()
  },[setRestaurants, setName])

  
  return (
      <div>
        <NavBar/>    
          {/* <h1>Welcome {name}</h1> */}
          <div className='main'>
            <h1 className='font-weight-light display-4 text-center'>
                Restaurant Finder
            </h1>
            <AddRestaurant/>
            <RestaurantList restaurants={restaurants}/>
          </div>
      </div>
  )
}

export default Home