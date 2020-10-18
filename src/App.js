import React, { useState, useEffect} from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import './App.css';
import axios from "axios";
const colorArr = [];
function App() {
const [colorCode, setColorCode] = useState([]);
const [total, setTotal] = useState(1000);
const [limit, setLimit] = useState(1000);
const [loading, setLoading] = useState(false);
  useEffect(()=>{
    if((total+1000)>=limit){
        callAPI();
    }
  },[limit, total])

const callAPI = async (finalTotal) => {
  setLoading(true);
  await axios
  .get(
    `https://colorbackend.herokuapp.com/api/rgb/color-code?limit=${finalTotal || limit}`,
    {
      headers: {
        Authorization: "$#$#@##@ds%$%^&76@@93432$#%^#$#Dfdfd$%@#@)IOIkjkj&*$%^%*()6",
      },
    }
  )
  .then((res) => {
    setLimit(limit+1000);
 setColorCode(res.data.data);
 setTotal(res.data.total);
 setLoading(false);
  })
  .catch((error) => {
    console.log(error);
    setLoading(false);
  });
}
  const ColorDiv = () => {
    return colorCode
    .map((data, index) => {
       return (  
         <MDBCol style={{ background: `${data}`, width:'20px', height:'20px', margin:'5px' }} key={index} ></MDBCol>
        );
 });
  }

  return (
    <MDBContainer className="text-center"> 
        <MDBRow>
          {ColorDiv()}
          {loading ? 'Loading....' : null}
      </MDBRow>
      </MDBContainer>
  
  );
}

export default App;
