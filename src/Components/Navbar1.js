import React, {useState} from "react";
import './Navbar.css'
import { MdSearch } from "react-icons/md";



const Navbar1 = (props) => {
    const [loc, setLoc] = useState(""); 

    return(
        <div className="container">
            <div className="title">
                Inspections
            </div>
            <div className="dropbox-container">
                <select name = "Category" id="Category" className="dropbox"
                 onChange = {(e) => {props.handleSetCategory(e.target.value); }}>
                    <option value = "byDay" selected
                    // disabled = {props.division != "thisYear"? false: true}
                    > By Day </option>
                    <option value = "byWeek" 
                    // disabled = {props.division === "thisMonth"? true: false}
                    > By Week </option>
                    <option value = "byMonth" 
                    // disabled = {props.division === "thisYear"? false: true}
                    > By Month </option>
                </select>
                
                <select name = "Division" id="Division" className="dropbox"
                 onChange = {(e) => {props.handleSetDivision(e.target.value);}}>
                    <option value = "thisWeek"> This Week </option>
                    <option value = "thisMonth"> This Month </option>
                    <option value = "thisYear"> This Year </option>
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

export default Navbar1; 