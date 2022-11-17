import React from "react";
import { auth } from "./firebase";

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Inicio from './components/Inicio'
import Admin from './components/Admin'
import Login from './components/Login'


function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(false)
  React.useEffect(() => {
    //verifica el estado del usuario logueado
    auth.onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        setFirebaseUser(user)
      } else {
        setFirebaseUser(null)
      }
    })
  }, [])
  return firebaseUser!==false ? (
    <Router>
      <div className="container">
        <Navbar firebaseUser={firebaseUser}/>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  )
  :
  (<p>Loading...</p>)
}

export default App;
