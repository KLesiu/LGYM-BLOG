import React from "react";
import { useState,useEffect } from "react";
import uniqid from 'uniqid'
require("dotenv").config()
const Blog =(props)=>{
    const [posts,setPosts]= useState([])
    const [adminPosts,setAdminPosts]= useState([])
    const [admin,setAdmin]=useState('')
    const [welcome,setWelcome]= useState(false)
    const getPosts = async()=>{
        const response = await fetch(`${process.env.BACKEND}/api/posts`).then(function(data){
            
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
    
    useEffect(()=>{
        isAdmin()
        
    },[])

    if(welcome===false){
    return(
        <div id="welcome">
            <h2>Witaj w moim świecie!</h2>
            <button onClick={getPosts}>Zobacz posty</button>
            <span><p>"Trenując bicepsy, wyobrażam sobie wysokie góry. Dzięki swojej wyobraźni przekonałem się, że potrafię wszystko, kiedy tylko mocno, bardzo mocno tego chcę i wierzę, że to osiągnę".
                <br/>
                </p>
            <p>"Dla zdrowia najlepszymi aktywnościami są „pompowanie mięśni” i dźwiganie ciężarów"
                <br/>
               
            </p>
            <p>"Sądzę że w przyszłości zaskoczę wszystkich ludzi, tym co będę robił"
                <br/>
                (Arnold Schwarzenegger)
            </p></span>
            
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
                    {adminPosts ==null ?"" : adminPosts.map((element)=>{
                        return (
                            <a href={`/blog/${element._id}`} className="postCard"><div className="infoCard"  key={uniqid()}>
                            <h3>{element.title}</h3>
                            
                            <p>Created: {element.createdAt}</p>
                            <p>Last update: {element.updatedAt}</p>
                            <p className="cardBody">{element.body.substr(0,400)+"...(czytaj dalej)"}</p>
                            <span className="elementId">{element._id}</span>
                            
                        </div><div className="photoHolder">
                            {element.imageSrc === undefined?"":<img className="photoHolderImage" src={require(`./uploads/${element.imageSrc}`)}></img>}
                           

                            </div></a>  
                        )
                    })}
                </div>
            )
        }
       
    }
    
}
export default Blog