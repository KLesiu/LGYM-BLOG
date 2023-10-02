import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
require("dotenv").config()

const AddPost=(props)=>{
    const {id} = useParams()
    const [admin ,setAdmin]= useState('')
    
    const [Oldtitle,setOldTitle]=useState('')
    const [Oldbody,setOldBody]=useState('')
   const isAdmin=async()=>{
    const id = localStorage.getItem("id")
    
    const response = await fetch(`${process.env.BACKEND}/api/auth/isAdmin`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            _id:id 
        })
    }).then(function(res){
        return res.json()
    }).then(function(res){
        const admin = res.admin
        setAdmin(admin)
        return admin
    })
    
   }
   const addPost=async(event)=>{
    event.preventDefault();
    
    let title = document.querySelector("#title").value
    let body = document.querySelector("#body").value
    let published = document.querySelector("#published").value
    
    const isPublish=()=>{
        if(published==='true'){
            return true
        }else{
            return false
        }
    }
    const token = localStorage.getItem('token')
    const response = await fetch(`${process.env.BACKEND}/api/posts/create`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token} `
        },
        body:JSON.stringify({
            title:title,
            body:body,
            published:isPublish()
        }) 
    }).catch((err)=>{
        console.log(err)
    }).then((data)=>{
        
        return data.json()
    }).then(()=>{
        return window.location.href="http://localhost:3000/blog"
    })

   
   }
   const getInfo=async()=>{
        const response = await fetch(`${process.env.BACKEND}/api/posts/${id}`).then(function(ele){
            return ele.json()
        }).then((data)=>{
            setOldTitle(data.title)
            setOldBody(data.body)
        })
        
   }
   const editPost=async()=>{
    
    let title = document.querySelector("#title").value
    let body = document.querySelector("#body").value
    const token = localStorage.getItem('token')
    const response = await fetch(`${process.env.BACKEND}/api/posts/${id}/update`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token} `
        },
        body:JSON.stringify({
            title:title,
            body:body,
            
        })
    }).catch((err)=>{
        console.log(err)
    }).then((data)=>{
        
        return data.json()
    }).then(()=>{
        return window.location.href="http://localhost:3000/blog"
    })
   }
   
   useEffect(()=>{
    isAdmin()
    if(props.type==='edit'){
    getInfo()
    }
    
   },[])
   if(props.type==='add'){
    if(admin===true){
        return(
            <form onSubmit={addPost} >
                <label htmlFor="title">Title:</label>
                <input id="title" name="title"></input>
                <label htmlFor="body">Body:</label>
                <textarea id="body" name="body" ></textarea>
                <label htmlFor="published">Public:</label>
                <input placeholder="true/false" id="published" type="text" name="published"></input>
              
                <button>Add Post</button>
            </form>
            
        )
       }else{
        return(
            <p>No permissions</p>
        )
       }
       
   }else if(props.type==="edit"){
    if(admin===true){
        return(
            <form onSubmit={editPost}>
                <label htmlFor="title">Title:</label>
                <input id="title" placeholder={Oldtitle} name="title"></input>
                <label htmlFor="body">Body:</label>
                <textarea defaultValue={Oldbody} id="body" name="body"></textarea>
                
                <button>Edit Post</button>
            </form>
        )
       }else{
        return(
            <p>No permissions</p>
        )
       }
   }
  
    
}
export default AddPost