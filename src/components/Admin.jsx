import React from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Admin = () => {

  const navigate = useNavigate()
  const [user, setUser] = React.useState(null)
  React.useEffect(() => {
    //currenuser, para leer la informacion del usuario
    /* registrado */
    if (auth.currentUser) {
      console.log("Existe un usuario:" + auth.currentUser);
      setUser(auth.currentUser)
    } else {
      console.log("No existe un usuario");
      navigate("/login")
    }
  }, [navigate])

  return (
    <div>Admin</div>
  )
}

export default Admin