import React from "react";
import './App.css';
import Showlist from "./Showlist";

function App() {
const customStyle = {textAlign:"center",
color:"red",
textDecoration:"line-through"

}


  return (
    <div >
  <h1 style={customStyle}>Book My Show</h1>
      <Showlist />
    </div>
  );
}

export default App;
