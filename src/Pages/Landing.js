import React from "react";
import { useNavigate } from "react-router-dom";


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", 
    backgroundColor: "#f5f5f5", 
  },
  button: {
    margin: "10px", 
    padding: "10px 20px", 
    backgroundColor: "#4CAF50", 
    color: "#fff", 
    border: "none", 
    borderRadius: "5px", 
    cursor: "pointer", 
    fontSize: "16px", 
    transition: "background-color 0.3s", 
  },
};


const hoverStyle = {
  backgroundColor: "#45a049", 
};

const Landing = () => {

    const navigate = useNavigate(); 

  return (
    <div style={styles.container}>
      <button onClick={() => {navigate('/qualityInspection')}}
        style={{ ...styles.button, ...hoverStyle }} 
        onMouseEnter={() => (styles.button.backgroundColor = "#45a049")}
        onMouseLeave={() => (styles.button.backgroundColor = "#4CAF50")}
      >
        Quality And Inspection
      </button>
      <br/>
      <button onClick = {() => {navigate('/jobPerformance')}}
        style={{ ...styles.button, ...hoverStyle }} 
        onMouseEnter={() => (styles.button.backgroundColor = "#45a049")}
        onMouseLeave={() => (styles.button.backgroundColor = "#4CAF50")}
      >
        Job Performance
      </button>
    </div>
  );
};

export default Landing;
