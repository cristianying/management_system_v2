import React, {  useState,useEffect,useContext } from 'react'
import AddRestaurant from '../Components/AddRestaurant'
import RestaurantList from '../Components/RestaurantList'
import { RestaurantsContext } from '../context/RestaurantsContext'
import RestaurantFinder from "../apis/RestaurantFinder"
import NavBar from '../Components/NavBar'


const Home = ({setAuth}) => {

  const [setName]=useState("");
  const {restaurants,setRestaurants} = useContext(RestaurantsContext);

  // const getName = async () =>{
  //     try {
  //         const res = await fetch("http://localhost:4001/dashboard",{
  //             method: "GET",
  //             headers: {token: localStorage.token}

  //         });

  //         const parseRes = await res.json();
  //         console.log(parseRes);

  //         setName(parseRes.user_name);
  //     } catch (err) {
  //         console.error(err.message);
  //     }
  // }
  



  const logout = (e) => {
      e.preventDefault()

      try {
          localStorage.removeItem("token");
          setAuth(false);
          setRestaurants([]);
          // toast.success("Logout successfully");
        } catch (err) {
          console.error(err.message);
        }
  }
  
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
          {/* <h1>Welcome {name}</h1> */}
          <NavBar/>
          <div className='main'>
            <h1 className='font-weight-light display-4 text-center'>
                Restaurant Finder
            </h1>
            <AddRestaurant/>
            <RestaurantList restaurants={restaurants}/>
            <button className="btn btn-primary" onClick={e=>logout(e)}>Logout</button>
          </div>
      </div>
  )
//   return (
//     <div>
//         <Header/>
//         <AddRestaurant/>
//         <RestaurantList/>
//     </div>
//   )
}

export default Home