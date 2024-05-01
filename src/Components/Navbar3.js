import React, {useState} from "react";
import './Navbar.css'
import { MdSearch } from "react-icons/md";


const Navbar3 = (props) => {
    const [loc, setLoc] = useState(""); 
    return(
        <div className="container">
            <div className="title3">
                Inspection Completions
            </div>
            <div className="dropbox-container">
                <select className="dropbox" 
                onChange={e => props.handleSetDivision(e.target.value)}>
                    <option value = "thisMonth">This Month</option>
                    <option value = "thisYear" >This Year </option>
                </select>
            </div>
            <div>
                <input type = "text" name = "location" placeholder = "Locations" className="search-bar"
                onChange={e => setLoc(e.target.value)}/>
                <button onClick={()=> {props.handleSetLocation(loc)}}
                 style = {{background: "none", cursor: "pointer"}}> <MdSearch size={13}/> </button>
            </div>
        </div>
    )
}

export default Navbar3; 