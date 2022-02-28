import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Login from './Components/Login/Login'
import Home from './Components/Home/Home';
import Notfound from './Components/NotFound/Notfound';

function App() {
  
    let [userToken,setUserToken] = useState(false);

    
    let setToken=(tokeen)=> {
      localStorage.setItem('token', tokeen);
      setUserToken(tokeen);
    }

    let getToken = () => {
      const tokenString = localStorage.getItem('token');
      return tokenString;
    }

    let removeToken = () =>{
      localStorage.removeItem('token');
      setUserToken(false);
    }

   
    return(  
      <>
 
    { console.log(userToken)}
    {
    (userToken == true) ?   (<Home removeToken={removeToken}/>):
    (<Login setToken={setToken} getToken={getToken} removeToken={removeToken} />) 
  
    }
  
  </>)
 
}

export default App;
