import './Home.css';
import { FaUserCircle } from 'react-icons/fa';


import React, {Component} from 'react';
import axios from 'axios';
import swal from 'sweetalert';


import jwt_decode from "jwt-decode";




class Dash extends Component {
	
	
	constructor(props)
    {
        super(props);
		
		this.state = { user:{}};
		
	
	    this.init();
					  
   
    }
 
 init()
 {
	 	if(!localStorage.getItem('jwtToken'))
		{  
	window.location.href = "./login";
	}
		 else
		 {
			 const decoded = jwt_decode(localStorage.getItem('jwtToken')); 
	      
		   
		   
		   axios
    .get("/api/users/find", decoded)
    .then(res => {
	
		
		for(let  i=0;i<res.data.length;i++)
			if(decoded.id==res.data[i]._id)
			{
				
				this.setState({user:{
					id:res.data[i]._id,
					name:res.data[i].name,
					email:res.data[i].email,
					pass:res.data[i].password
				}});
				}
			

		
	  
	})
    .catch(err=> 
	{
	console.log(err.response.data);
	
	

            var res = "";
              
            for(var i in err.response.data)
                res+=err.response.data[i]+"\n";
              
          
	
	swal("Oops", res, "error");
	}
	)
	
		 }
		 
		 
 }
	

	logOff()
	{
		
		localStorage.removeItem("jwtToken");
		delete axios.defaults.headers.common["Authorization"];
		 window.location.href = "./login";
	}

	
	
	x()
	{
		console.log(this.state.user);
	
		console.log(JSON.stringify(this.state.user));
	}

	


 



  render() { 
  
  return (
    <div className="App">
      <header className="App-header">
       
        
		<div className="card">
		
		
		
		<div className="log">
		<FaUserCircle className="icon" />
		</div> 
		

		
{this.state.user!={}? 
<div className="dat">
WELCOME<br />{this.state.user.name}!<br /><br />
<div className="dd">
ID : {this.state.user.id}<br />
Email : {this.state.user.email}<br />
You have successfully logged in!
</div>
</div>:<></>}
		
		
	
		
		
		<div className="container">
		
		<div className="button-wrapper">
      <button className="ninja-button" onClick={this.logOff.bind(this)}>Sign Out</button>
    </div>
	
	
	</div>
	
	

		</div>
       
      </header>
    </div>
  );
  
  
  }
  
 
  
}

export default Dash;
