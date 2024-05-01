import React from "react";
import Graph1 from "../Graphs/Graph1";
import Graph2 from "../Graphs/Graph2";
import Graph3 from "../Graphs/Graph3";
import Graph4 from "../Graphs/Graph4";
import './Dashboard.css'


const Dashboard1 = () => { 
    return(
        <div className="Container">
            <div className = 'Row'>
            <Graph1/>
            <Graph3/>
            </div>
            <div className= "Row">
            <Graph2/>
            <Graph4/>
            </div>
        </div>
    )
}

export default Dashboard1; 