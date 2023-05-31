import React, { Fragment,useContext,useEffect,useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
// import { toast } from 'react-toastify'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext';


const Login = ({setAuth}) => {
    const {setRestaurants} = useContext(RestaurantsContext);
    const [inputs, setInputs]= useState({
        email:"",
        password: ""
    })

    let navigate = useNavigate()

    const {email,password}=inputs

    const onChange = (e)=> 
        setInputs({...inputs,[e.target.name]: e.target.value});
    
    

    const onSubmitForm = async (e) =>{
        e.preventDefault()

        try {

            // const body = {email, password}
            // const res = await fetch("http://localhost:4001/auth/login",{
            //     method:"POST",
            //     headers: {"Content-Type" : "application/json"},
            //     body : JSON.stringify(body)
            // });

            // const parseRes = await res.json();

            const res = await RestaurantFinder.post("/auth/login", 
                { 
                    email,
                    password
                }

                );


            //const parseRes = await res.json();
            //console.log(res.data.token);

            if (res.data.token){
                localStorage.setItem("token", res.data.token);
                setAuth(true);

                // toast.success("logged in successfully!")
                console.log("logged in!!", res.data.token)
                navigate("/");
            } else {
                setAuth(false);
                // toast.error(res)
            }
            
        } catch (error) {
            console.error(error.message)
            
        }
    }

    useEffect(() => {
        try {
            localStorage.removeItem("token");
            setAuth(false);
            setRestaurants([]);
            // toast.success("Logout successfully");
          } catch (err) {
            console.error(err.message);
          }
      }, [setAuth, setRestaurants]);


    return (
        <Fragment>

            <div className="container col-5">
            <h1 className="text-center my-5">Login</h1>
            <form onSubmit={onSubmitForm}>
                <div className="mb-4 input-group">
                <span className="input-group-text">
                    <i className="bi bi-person-fill"></i>
                </span>
                <input 
                    type="email" name="email"
                    placeholder="e.g. 123@example.com" className="form-control"
                    value={email}
                    onChange={e =>onChange(e)}
                />
                </div>

                <input 
                    type="password" name="password"
                    placeholder="password" className="form-control my-3"
                    value={password}
                    onChange={e =>onChange(e)}
                />

                <button className="btn btn-success btn-block">Submit</button>
            </form>
            <Link to="/register">register</Link>
            </div>
        </Fragment>
    )
}

export default Login