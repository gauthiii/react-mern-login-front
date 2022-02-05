import './Home.css';
import { FaUserCircle } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { MdVisibility } from 'react-icons/md';
import { MdVisibilityOff } from 'react-icons/md';
import { IoMdMail } from 'react-icons/io';


import React, {Component} from 'react';
import axios from 'axios';
import swal from 'sweetalert';

import jwt_decode from "jwt-decode";

const setAuthToken = token => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};




class Login extends Component {
	
	
	constructor(props)
    {
        super(props);
        this.state = { page : 'create' , pw:'hide' , pwc: 'hide', name:'' , email:'' , pass:'' , passc:'' ,errors: {} };
    }
 
 getClick()
    {
        if (this.state.page === 'create')
		{ this.setState({ page : 'login' });
	this.setState({  name:'' , email:'' , pass:'' , passc:'' });
	
	document.getElementById("myInput1").value = "";
	document.getElementById("myInput").value = "";
	document.getElementById("myName").value = "";
	document.getElementById("myEmail").value = "";

	}
        else
		{  this.setState({ page : 'create' });
	this.setState({  name:'' , email:'' , pass:'' , passc:'' });
	
	document.getElementById("myInput").value = "";

	document.getElementById("myEmail").value = "";

	}
	
		
	
    }
	

	
	visibility()
	{
		var x = document.getElementById("myInput");
  if (x.type === "password") {
    x.type = "text";
	this.setState({ pw : 'unhide' });
	
  } else {
    x.type = "password";
	this.setState({ pw : 'hide' });
  }
  
	}
		
		visibility1()
	{
		var x = document.getElementById("myInput1");
  if (x.type === "password") {
    x.type = "text";
	this.setState({ pwc : 'unhide' });
  } else {
    x.type = "password";
	this.setState({ pwc : 'hide' });
  }
  
  
	}
	
	buttonClick()
	{
		
		if (this.state.page === 'create')
		alert("Account Created");
	    else
			alert("Login Successful!");
	}
	

	
	onSubmit (e) {
    e.preventDefault();
	if (this.state.page === 'create')
	{
	
const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.pass,
      password2: this.state.passc
    };
console.log(newUser);

axios
    .post("/api/users/register", newUser)
    .then(res => {
		console.log(res.data);
		swal("Account Created",'', "success");
		

      
	  
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
	
	
	document.getElementById("myInput1").value = "";
	document.getElementById("myInput").value = "";
	document.getElementById("myName").value = "";
	document.getElementById("myEmail").value = "";


	
	}
	else
	{
			
const newUser = {
     
      email: this.state.email,
      password: this.state.pass,
      
    };
console.log(newUser);

axios
    .post("/api/users/login", newUser)
    .then(res => {
		console.log(res.data);
		if(res.data['success']===true)
			swal("Successfully Logged In",'', "success");
		
		
				// Save to localStorage
// Set token to localStorage
      const { token } = res.data;  
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
	  console.log(token);
      // Decode token to get user data
      const decoded = jwt_decode(token); 
	  console.log(decoded);
	  
	  window.location.href = "./";
	  
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
	
	
	
	document.getElementById("myInput").value = "";

	document.getElementById("myEmail").value = "";
	
	}
	
	this.setState({  name:'' , email:'' , pass:'' , passc:'' });
	
	
  }
	

  cName(evt) {
    const val = evt.target.value;
    // ...
    this.setState({
      name: val
    });
	

  }
  
   cEmail(evt) {
    const val = evt.target.value;
    // ...
    this.setState({
      email: val
    });
	

  }
  
   cPass(evt) {
    const val = evt.target.value;
    // ...
    this.setState({
      pass: val
    });
	

  }
  
  cPass1(evt) {
    const val = evt.target.value;
    // ...
    this.setState({
      passc: val
    });
	

  }
  




  render() { 
  
  return (
    <div className="App">
      <header className="App-header">
       
        
		<div className="card">
		
		
		
		<div className="log">
		<FaUserCircle className="icon" />
		</div> 
		
		<form onSubmit={this.onSubmit.bind(this)}>
		<div className="inputs">
		
		{(this.state.page === 'create') ?<>
		<input type="text" placeholder="Enter Name" id="myName" onChange={evt => this.cName(evt)} ></input>
		<span ><FaUser className="hicon1"  /></span></>
		:<></>}
		<input type="text" placeholder="Enter Email" id="myEmail" onChange={evt => this.cEmail(evt)}></input>
		<span ><IoMdMail className="hicon1"  /></span>
		<input type="password" placeholder="Enter Password" id="myInput" onChange={evt => this.cPass(evt)}></input>
		<span onClick = {this.visibility.bind(this)}>{(this.state.pw === 'hide') ?<MdVisibility className="hicon" />:<MdVisibilityOff className="hicon" />}</span>
		
		
		{(this.state.page === 'create') ?<>
		<input type="password" placeholder="Confirm Password" id="myInput1" onChange={evt => this.cPass1(evt)}></input>
	    <span onClick = {this.visibility1.bind(this)}>{(this.state.pwc === 'hide') ?<MdVisibility className="hicon"  />:<MdVisibilityOff className="hicon"  />}</span></>
		:<></>}
		
		
		</div>
		
		
		<div className="container">
		
		<div className="button-wrapper">
      <button className="ninja-button" type='submit'  >{(this.state.page === 'create') ? 'Create Account' : "Sign In"}</button>
    </div>
	
	<p >{(this.state.page === 'create') ? 'Already have an account?' : "Don't have an account?"}<span onClick = {this.getClick.bind(this)}>Click Here</span></p>
	</div>
	</form>
	

		</div>
       
      </header>
    </div>
  );
  
  
  }
  
 
  
}

export default Login;
