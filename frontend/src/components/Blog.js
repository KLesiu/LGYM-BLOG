import React from "react";
import { useState,useEffect } from "react";
import uniqid from 'uniqid'

const Blog =(props)=>{
    const [posts,setPosts]= useState([])
    const [adminPosts,setAdminPosts]= useState([])
    const [admin,setAdmin]=useState('')
    const [welcome,setWelcome]= useState(false)
    const [list,setList]= useState('')
    const getPosts = async()=>{
        const response = await fetch("http://localhost:3001/api/posts").then(function(data){
            
            return data.json()
        }).then(function(data){
            const count = data.length
            const array = []
            const adminArray = []
            
            for(let i = 0;i<count;i++){
                if(data[i].published ===true){
                array.push(data[i])
                }
                adminArray.push(data[i])

            }
            setPosts(array)
            setAdminPosts(adminArray)
            setWelcome(true)
            return 
        })
    }
    const isAdmin=async()=>{
       
        const id = localStorage.getItem("id")
        
        const response = await fetch('http://localhost:3001/api/auth/isAdmin',{
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
    useEffect(()=>{
        isAdmin()
    },[])

    if(welcome===false){
    return(
        <div id="welcome">
            <h2>Welcome in our world!</h2>
            <button onClick={getPosts}>SEE POSTS</button>
        </div>
        )
    }
    if(welcome===true){
        if(admin===false){
            return(
                <div id="postCardsContainer">
                    {posts.map((element)=>{
                        return (
                            <a href={`/blog/${element._id}`} className="postCard"><div  key={uniqid()}>
                            <h3>{element.title}</h3>
                            <p>{element.body}</p>
                            <p>Created: {element.createdAt}</p>
                            <p>Last update: {element.updatedAt}</p>
                        </div></a>  
                        )
                    })}
                </div>
            )
        }else if(admin===true){
            return(
                <div id="postCardsContainer">
                    {adminPosts.map((element)=>{
                        return (
                            <a href={`/blog/${element._id}`} className="postCard"><div  key={uniqid()}>
                            <h3>{element.title}</h3>
                            <p>{element.body}</p>
                            <p>Created: {element.createdAt}</p>
                            <p>Last update: {element.updatedAt}</p>
                        </div></a>  
                        )
                    })}
                </div>
            )
        }
       
    }
    
}
export default Blog