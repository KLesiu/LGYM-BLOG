import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Form=(props)=>{
    const [errors,setErrors]= useState('')
    const register= async(event)=>{
       event.preventDefault();
        let name = document.querySelector("#registerName").value
        let pass = document.querySelector("#registerPass").value
        let cpass = document.querySelector("#registerCPass").value
        if(pass !== cpass){
            return setErrors("Passwords arent the same!")
        }
       const response = await fetch("http://localhost:3001/api/auth/register",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name: name,
            password : pass,
            cpassword: cpass
        })
       })
       if(response.ok){
        setErrors([])
        return window.location.href= "/login"
       }else{
        if(name || pass || cpass===""){
            return setErrors("All fields are required")
        }else{
            return setErrors('We have a user with this username!')
        }
        
       }
    }
    const login=async(event)=>{
        event.preventDefault();
        let name = document.querySelector("#loginName").value
        let pass = document.querySelector("#loginPass").value
        const response = await fetch("http://localhost:3001/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name: name,
                password : pass,
                
            })
           }).then(function(response){
            return response.json()
           }).then(function(data){
            const token = data.token
            
            localStorage.setItem('username',name)
            localStorage.setItem("token",token)
            localStorage.setItem('id',data.req._id)
            return 'authorized'
           }).catch(function(err){
            return console.log(err)
           })
           if(response==='authorized'){
           
           return window.location.href="/blog"
           }

        
    }
    
  
    if(props.type==='register'){
        return(
            <form onSubmit={register}>
                <label htmlFor="name">Username:</label>
                <input id="registerName" name="name" type="text"></input>
                <label htmlFor="password">Password:</label>
                <input id="registerPass" type="password" name="password"></input>
                <label htmlFor="cpassword">Repeat password:</label>
                <input id="registerCPass" type="password" name="cpassword"></input>
                <button>REGISTER</button>
                <p id="registerErrors">{errors}</p>
            </form>
        )
    }
    else if(props.type==="admin"){
        return(
            <form onSubmit={login} onSubmitCapture={props.getUsername}>
            <label htmlFor="name">Username:</label>
            <input id="adminName" name="name" type="text"></input>
            <label htmlFor="password">Password:</label>
            <input id="adminPass" type="password" name="password"></input>
            <button>LOGIN</button>
        </form>
        )
    }
    else{
        return(
            <form onSubmit={login} onSubmitCapture={props.getUsername}>
            <label htmlFor="name">Username:</label>
            <input id="loginName" name="name" type="text"></input>
            <label htmlFor="password">Password:</label>
            <input id="loginPass" type="password" name="password"></input>
            <button>LOGIN</button>
        </form>
        )
    }
   
}
export default Form