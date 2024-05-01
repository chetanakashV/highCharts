import React from "react";
import './Header.css'

const Header = (props) => {
    var value = (props.completedJobs/props.totalJobs) * 100; 
    return( 
        <div className="container2">
                <div className="dropbox2-container">
                    <select className="dropbox" onClick = {e => props.handleSetDivision(e.target.value)}>
                        <option value = "today"      > Today        </option>
                        <option value = "thisWeek"   > This Week    </option>
                        <option value = "thisMonth"  > This Month   </option>
                        <option value = "thisQuarter"> This Quarter </option>
                    </select>
                </div> <br/> <br/>
                <div className="boxes-container">
                    <div className="box" >
                        Number of Completed Jobs <br/>
                       <span style = {{fontSize: "35px"}}>  <b>{props.completedJobs} ({value}%) </b> </span> 
                    </div>
                    <div className="box">
                        Total Number of Jobs <br/>
                       <span style = {{fontSize: "35px"}}>  <b>{props.totalJobs} </b> </span> 
                    </div>
                </div>
        </div>
    )
}


export default Header; 