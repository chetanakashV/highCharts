import React, {useState} from "react";
import Header from "../Components/Header";
import Graph5 from "../Graphs/Graph5";
import Graph6 from "../Graphs/Graph6";
import Graph7 from "../Graphs/Graph7";
import Graph8 from "../Graphs/Graph8";

var url = "https://c00624e6-5f8a-44f8-bbe6-3a20127dcabe.mock.pstmn.io/getDetails"; 
var url2 = 'https://3d916472-4ea8-469b-9792-46617b4a90ac.mock.pstmn.io/getWeek'
var url3 = 'https://3d916472-4ea8-469b-9792-46617b4a90ac.mock.pstmn.io/getMonth'
var url4 = 'https://3d916472-4ea8-469b-9792-46617b4a90ac.mock.pstmn.io/getQuarter'

const Dashboard2 = () => {
    const [division, setDivision] = useState("today"); 
    const [completedJobs, setCompletedJobs] = useState(45)
    const [totalJobs, setTotalJobs] = useState(60)
    
    const handleSetDivision = (div) => {
        setDivision(div); 
    }


    return(
        <div className="Container2">
        <div className="header-container">
        <Header
            handleSetDivision = {handleSetDivision}
            completedJobs = {completedJobs}
            totalJobs = {totalJobs}
        />
        </div>

        <Graph5
            url = {url}
            url2 = {url2}
            url3 = {url3}
            url4 = {url4}
            division = {division}
        />

        <Graph6
            url = {url}
            url2 = {url2}
            url3 = {url3}
            url4 = {url4}
            division = {division}
        />

        <Graph7
            url = {url}
            url2 = {url2}
            url3 = {url3}
            url4 = {url4}
            division = {division}
        />

        <Graph8
            url = {url}
            url2 = {url2}
            url3 = {url3}
            url4 = {url4}
            division = {division}
        />

            
        </div>
    )
}


export default Dashboard2; 