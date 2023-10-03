import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import uniqid from 'uniqid'


const PostDetail = (props)=>{
    const {id} = useParams()
    const [detail,setDetail]= useState('')
    const [comments,setComments]=useState([])
    const [showAllComments,setShowAllComments]=useState('')
    const [admin,setAdmin]=useState('')
    const [image, setImage] = useState(null);
    const [allImage,setAllImage]=useState(null)
    const getDetail = async()=>{
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/api/posts/${id}`).then(function(ele){
            return ele.json()
        }).then((data)=>{
            return setDetail({
                body: data.body,
                createdAt: data.createdAt,
                published: data.published,
                title:data.title,
                updatedAt:data.updatedAt,
                _id:data._id
            })
        })
    }
    const getComments = async()=>{

        const res = await fetch(`${process.env.REACT_APP_BACKEND}/api/posts/${id}/comments`).then(function(ele){

           return ele.json()
        }).catch((err)=>{
            return err
        }).then((data)=>{


                if(data=== 'This post doesnt have any comments'){
                    return
                }
                const arr = []
                comments.map((ele)=>{
                    arr.push(ele)
                })
                data.map((ele)=>{
                    arr.push(ele)
                })

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
        }).then(function(res){

            return res.json()
        }).catch(function(res){
            alert('You have to be logged in to add comments')
            return res
        })
      if(response.ok){
        window.location.reload(true)
      }


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
        }).then(function(res){
            return res.json()
        }).then(function(res){
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

        }).then((res)=>{
            return res.json()
        }).then((data)=>
        console.log(data))
        window.location.href="https://lgym-blog.vercel.app/blog"
    }   
    const addPhoto=async(event)=>{
        event.preventDefault()
        const post = id
        
        const token = localStorage.getItem('token')
        const formData= new FormData()
        formData.append("file",image)
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/posts/${post}/upload`,{
        method:"POST",
        headers:{
            "Authorization": `Bearer ${token} `
        },
        body:formData


    }).catch((err)=>{
        console.log(err)
    }).then((data)=>{

        return data.json()
    })
    }
    const getImage=async()=>{
        const post = id
        const result = await fetch(`${process.env.REACT_APP_BACKEND}/api/posts/${post}/upload`).then((result)=>{
            return result.json()
            
           
        }).then((data)=>{
            
            return setAllImage(data.data)
        })
    }
    const onInputChange = (e) => {
        
        setImage(e.target.files[0]);
      };
   
    useEffect(()=>{
        getDetail()
        getComments()
        isAdmin()
        getImage()
        
    },[])
    if(admin===false){
        return(
            <div className="detailContainer">
                <div className="detailBox">
                <h2>{detail.title}</h2>

                <p>Created at: {detail.createdAt};  Last Update: {detail.updatedAt}</p>
                <p>{detail.body}</p>
                </div>
                <div className="commentsBox">
                    <h2>Comments:</h2>
                    <ul id="commentsHolder">
                    {    
                        comments.map((ele)=>{

                            return(
                                <li className="comment" key={uniqid()}>
                                    <h3>{ele.username}</h3>
                                    <p>{ele.body}</p>
                                </li>
                            )
                        })
                    }</ul>
                    <div className="addCommentContainer hidden">
                    <textarea name="newComment" className="newComment"/>
                    <button onClick={addComment}>ADD</button>
                    </div>

                    <button onClick={showCommentForm}  className="addComment">Add comment</button>
                </div>
            </div>
        )
    }else{
        return(
            <div className="detailContainer">

                <div className="detailBox">
                <h2>{detail.title}</h2>
                <button onClick={deletePost} className="deleteButton">Delete</button>
                <form onSubmit={addPhoto} id="photoForm" encType="multipart/form-data">
                    <h3>Add photo</h3>
                    <input id="file" type="file" onChange={onInputChange}  name="file"></input>
                    
                    <input id="submitPhoto" type="submit"></input>
                </form>
                <p>Created at: {detail.createdAt};  Last Update: {detail.updatedAt}</p>
                {
                allImage==null?"":
                allImage.map(data=>{
                    return(
                        <img className="imgPhotoDetail" src={require(`./uploads/${data.image}`)}></img>
                    )
                })}
                <p>{detail.body}</p>
              
                </div>
                <div className="commentsBox">
                    <h2>Comments:</h2>
                    <ul id="commentsHolder">
                    {    
                        comments.map((ele)=>{

                            return(
                                <li className="comment" key={uniqid()}>
                                    <h3>{ele.username}</h3>
                                    <p>{ele.body}</p>
                                </li>
                            )
                        })
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

}
export default PostDetail