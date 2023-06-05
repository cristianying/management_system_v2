import React, { useContext, useEffect } from 'react'
import RestaurantFinder from "../apis/RestaurantFinder"
import NavBar from '../Components/NavBar';
import ProductsList from '../Components/ProductsList';
import { RestaurantsContext } from '../context/RestaurantsContext';


const ProductPage = ({setAuth}) => {

    const {products, setProducts} = useContext(RestaurantsContext);

    useEffect(()=>{
        const fetchData = async ()=> {
        
            try {
                const responce = await RestaurantFinder.get("/api/v1/products", {
                
                    headers: {token: localStorage.token}
               });
    
               
            //    console.log("new json: " ,responce.data.data.orders.length !== 0 )

               if(responce.data.data.products.length !== 0){

                setProducts(responce.data.data.products);
               };
            //    console.log("first value orders ", clientOrders);
                
            } catch (err) {
                localStorage.removeItem("token");
                setAuth(false);
                setProducts([]);
                console.log(err);
            }
        }
  
        fetchData()
    },[setProducts, setAuth])


  return (
    <div>

        <NavBar/>    
        <div className='main'>
            <h1 className='font-weight-light display-4 text-center'>
                Products
            </h1>
            <ProductsList products={products}/>
        </div>
    </div>
  )
}

export default ProductPage