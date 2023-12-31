import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import uniqid from 'uniqid'


const PostDetail = ()=>{
    const {id} = useParams()
    const [detail,setDetail]= useState('')
    const [comments,setComments]=useState([])
    const [admin,setAdmin]=useState(false)
    const [image, setImage] = useState(null);
    const [allImage,setAllImage]=useState(null)
    const getDetail = async()=>{
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/api/posts/${id}`).then(ele=>ele.json())
        .then(data=>setDetail({
                body: data.body,
                createdAt: data.createdAt,
                published: data.published,
                title:data.title,
                updatedAt:data.updatedAt,
                _id:data._id
            })
        )
    }
    const getComments = async()=>{

        const res = await fetch(`${process.env.REACT_APP_BACKEND}/api/posts/${id}/comments`)
        .then(ele=>ele.json())
        .catch(err=>err)
        .then(data=>{
            if(data=== 'This post doesnt have any comments') return 'This post doesnt have any comments'
                const arr = []
                comments.map(ele=>arr.push(ele))
                data.map(ele=>arr.push(ele))

                return setComments(arr)

            }

        )

    }
    const showCommentForm=()=>{
        const div = document.querySelector(".addCommentContainer")
        div.classList.toggle("hidden")
    }
    const addComment= async()=>{
        const post = id

        const body = document.querySelector('.newComment').value
        const token = localStorage.getItem('token')

        const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/posts/${post}/add-comment`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token} `
            },
            body:JSON.stringify({
               body:body 
            })
        }).then(res=>res.json())
          .catch(()=>alert('You have to be logged in to add comments'))
        return window.location.reload(true)
      


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
        }).then(res=>res.json())
          .then(res=>{
            const admin = res.admin
            setAdmin(admin)
            return admin
        })



    }
    const deletePost=async()=>{
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/posts/${id}/delete`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token} `
            }

        }).then(res=>res.json())
        
        window.location.href="https://lgym-blog.vercel.app/blog"
    }   
  
    const getImage=async()=>{
        const post = id
        
        const result = await fetch(`${process.env.REACT_APP_BACKEND}/api/posts/${post}/upload`).then(result=>result.json())
        .then(data=>setAllImage(data.data))
    }
   
    
   
    useEffect(()=>{
        getDetail()
        getComments()
        isAdmin()
        
        
    },[])
    useEffect(()=>{
        getImage()
    },[image])
   if(admin)
        return(
            <div className="detailContainer">

                <div className="detailBox">
                <h2 id="title">{detail.title}</h2>
                <button onClick={deletePost} className="deleteButton">Delete</button>
               
                <p>Created at: {detail.createdAt};  Last Update: {detail.updatedAt}</p>
                {
                allImage==null?"":
                allImage.map(data=>
                    (
                        <img className="imgPhotoDetail" src={require(`./uploads/${data.image}`)}></img>
                    )
                )}
                <p>{detail.body}</p>
              
                </div>
                <div className="commentsBox">
                    <h2>Comments:</h2>
                    <ul id="commentsHolder">
                    {    
                        comments.map(ele=>

                            (
                                <li className="comment" key={uniqid()}>
                                    <h3>{ele.username}</h3>
                                    <p>{ele.body}</p>
                                </li>
                            )
                        )
                    }</ul>
                    <div className="addCommentContainer hidden">
                    <textarea name="newComment" className="newComment"/>
                    <button onClick={addComment}>ADD</button>
                    </div>

                    <button onClick={showCommentForm}  className="addComment">Add comment</button>
                </div>
            </div>
        )
    else
        return(
            <div className="detailContainer">

                <div className="detailBox">
                <h2>{detail.title}</h2>
                
                <p>Created at: {detail.createdAt};  Last Update: {detail.updatedAt}</p>
                {
                allImage==null?"":
                allImage.map(data=>
                    (
                        <img className="imgPhotoDetail" src={require(`./uploads/${data.image}`)}></img>
                    )
                )}
                <p>{detail.body}</p>
              
                </div>
                <div className="commentsBox">
                    <h2>Comments:</h2>
                    <ul id="commentsHolder">
                    {    
                        comments.map(ele=>
                            (
                                <li className="comment" key={uniqid()}>
                                    <h3>{ele.username}</h3>
                                    <p>{ele.body}</p>
                                </li>
                            )
                        )
                    }</ul>
                    <div className="addCommentContainer hidden">
                    <textarea name="newComment" className="newComment"/>
                    <button onClick={addComment}>ADD</button>
                    </div>

                    <button onClick={showCommentForm}  className="addComment">Add comment</button>
                </div>
            </div>
        )
    

}
export default PostDetail