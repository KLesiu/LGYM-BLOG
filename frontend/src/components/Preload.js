import React from "react";
import { Link } from "react-router-dom";


const Preload=(props)=>{
   
    return(
        <div className="preloadContainer">
            <Link to={'/form'}><button >JOIN US!</button></Link>
        </div>
    )
}
export default Preload