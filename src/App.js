import React, { useState, useEffect, useCallback} from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import './App.css';
import axios from "axios";

function App() {
const [colorCode, setColorCode] = useState([]);
const [total, setTotal] = useState(5000);
const [limit, setLimit] = useState(5000);
const [loading, setLoading] = useState(false);
  
const callAPI =useCallback(async (finalTotal) => {
  setLoading(true);
  await axios
  .get(
    `http://localhost:8000/api/rgb/color-code?limit=${finalTotal || limit}`
  )
  .then((res) => {
    setLimit(limit+5000);
 setColorCode(res.data.data);
 setTotal(res.data.total);
 setLoading(false);
  })
  .catch((error) => {
    console.log(error);
    setLoading(false);
  });
},[limit]);

useEffect(()=>{
  if((total+5000)>=limit){
      callAPI();
  }
},[limit, total, callAPI]);
  const ColorDiv = () => {
    return colorCode
    .map((data, index) => {
       return (  
         <div className="color-container" style={{ background: `${data}` }} key={index} ></div>
        );
 });
  }

  return (
    <MDBContainer className="text-center"> 
        <MDBRow className="wrap-container mt-5"> 
          {ColorDiv()}
          {loading ? 'Loading....' : null}
      </MDBRow>
      </MDBContainer>
  
  );
}

export default App;
