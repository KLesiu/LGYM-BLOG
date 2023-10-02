import React, { useEffect } from "react";
import { Link } from "react-router-dom";


const Preload=(props)=>{
   useEffect(()=>{
    window.location.href="https://lgym-blog.vercel.app/blog"
   },[])
    return(
        <div className="preloadContainer">
            <Link to={'/form'}><button >JOIN US!</button></Link>
        </div>
    )
}
export default Preload