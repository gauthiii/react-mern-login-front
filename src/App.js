import './App.css';


import React, {Component} from 'react';
import { BrowserRouter as Router, Route,Routes,useNavigate  } from "react-router-dom";
import Login from "./Login";
import Dash from "./Dash";



import jwt_decode from "jwt-decode";
import axios from 'axios';

if(localStorage.getItem('jwtToken'))

			{
           console.log("yes");
               axios.defaults.headers.common["Authorization"] = localStorage.getItem('jwtToken');
             const decoded = jwt_decode(localStorage.getItem('jwtToken')); 
	       console.log(decoded);
	  

 
 const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
 localStorage.removeItem("jwtToken");
		delete axios.defaults.headers.common["Authorization"];
		 window.location.href = "./login";


  }

          
      
  
                      }



class App extends Component {
	

			
	constructor(props)
    {
        super(props);
		
		
		
		
		
	}
 


	
	
	

  render() { 
  

  
  return (
  
  <Router>  
    <Routes>
	      <Route exact path="/" element={<Dash />} />
          <Route exact path="/login" element={<Login />} />
		  
  </Routes>
      </Router>
 
  );
  
  
  }
  
 
  
}

export default App;
