import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

const Navbar = (props) => {
  const navigate = useNavigate()
  const cerrarSesion = () => {
    auth.signOut()
      .then(() => {
        navigate('/login')
      })
  }

  return (
    <div className='navbar navbar-dark bg-dark'>
      <div className='d-flex'>
        <Link className='navbar-brand' to="/">LoginCuc</Link>
        <div>
          <div className='d-flex'>
            <NavLink className="btn btn-dark mr-2" to="/">Inicio</NavLink>
            {
              props.firebaseUser !== null ? (
                <Link className='btn btn-dark mr-2' to={"/admin"}>Admin</Link>
              ):
              null
            }
            {
              props.firebaseUser !==null ? (
                <button className='btn btn-dark mr-2' onClick={()=>cerrarSesion()}>Cerrar Sesion</button>
              ):(
                <Link className='btn btn-dark mr-2' to={"/login"}>Login</Link>
              )
            }
          </div>
        </div>
{/*         <Link className='btn btn-dark mr-2' to={"/"}>Inicio</Link>
        <Link className='btn btn-dark mr-2' to={"/admin"}>Admin</Link> */}
      </div>
    </div>
  )
}

export default Navbar