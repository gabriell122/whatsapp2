
import './App.css'
import { useState, useEffect } from 'react'
import  Tudo from "./components/index"
import mqtt from "mqtt";
import Home from './pages/home';
import { MQTTProvider } from './mqtt/mqtt';
function App() {
  return(
    <MQTTProvider>
      <Home/>
    </MQTTProvider>
  )
}
export default App


