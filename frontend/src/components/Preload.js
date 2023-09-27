import React, { useEffect } from "react";
import { Link } from "react-router-dom";


const Preload=(props)=>{
   useEffect(()=>{
    window.location.href="http://localhost:3000/blog"
   },[])
    return(
        <div className="preloadContainer">
            <Link to={'/form'}><button >JOIN US!</button></Link>
        </div>
    )
}
export default Preload