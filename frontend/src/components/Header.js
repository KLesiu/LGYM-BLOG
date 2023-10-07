import React, { useEffect, useState } from "react";

const Header=()=>{
    const [username,setUsername]= useState('')
    const [admin,setAdmin] =useState('')

    const logout=()=>{
        localStorage.removeItem("username")
        localStorage.removeItem('token')
        localStorage.removeItem('admin')
        setUsername('')
        document.querySelector('.logoutDiv').classList.add("hidden")
        
        window.location.href="https://lgym-blog.vercel.app/login"
    }
    const isAdmin=async()=>{
       
            const id = localStorage.getItem("id")
            
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/auth/isAdmin`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    _id:id 
                })
            }).then(res=> res.json())
              .catch(err=>err)
              .then(res=>{
                const admin = res.admin
                setAdmin(admin)
                return admin
            })
            
           
            
    }
    const hrefToAddPost=()=> window.location.href="https://lgym-blog.vercel.app/admin/add-post"
    
   
    useEffect(()=>{
        if(localStorage.getItem('username')){
            const name = localStorage.getItem('username')
            setUsername(name)
            const divRL = document.querySelector(".registerlogin")
            divRL.classList.add('hidden')
            const divLt = document.querySelector(".logoutDiv")
            divLt.classList.remove('hidden')
        }else{
            const divRL = document.querySelector(".registerlogin")
            divRL.classList.remove('hidden')
            const divLt = document.querySelector(".logoutDiv")
            divLt.classList.add('hidden')
        }
        isAdmin()
    },[])
    if(admin)
        return(
            <header>
                <h1><a href="/blog">LGYM BLOG</a></h1>
                <div className="registerlogin hidden"><a href="/form"><button> Register</button> </a>
                <a href="/login"><button>Login</button></a></div>
                <div className="logoutDiv hidden">
                    <h3>Welcome <span id="usernameHolder">{username}</span>!</h3>
                    <button onClick={logout}>Logout</button>
                    <button onClick={hrefToAddPost}>Add Post</button>
                </div>
    
            </header>
        ) 
        
    else
        return(
            <header>
                <h1><a href="/blog">LGYM BLOG</a></h1>
                <div className="registerlogin hidden"><a href="/form"><button> Register</button> </a>
                <a href="/login"><button>Login</button></a></div>
                <div className="logoutDiv hidden">
                    <h3>Welcome <span id="usernameHolder">{username}</span>!</h3>
                    <button onClick={logout}>Logout</button>
                    
                </div>
    
            </header>
        ) 
    
    
}
export default Header