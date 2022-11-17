import React from 'react'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const navigate=useNavigate();
  const [email, setEmail] = React.useState('')
  const [pass, setPass] = React.useState('')
  const [registro, setModoregistro] = React.useState(true)
  const [error, setError] = React.useState(null)
  const guardarDatos = (e) => {
    e.preventDefault()
    if (!email.trim()) {
      //console.log('Ingrese email');
      setError('Ingrese email')
      return
    }
    if (!pass.trim()) {
      //console.log('Ingrese pass'); 
      setError('Ingrese pass')
      return
    }
    if (pass.length < 6) {
      console.log('Pass debe ser mayor a 6 caracteres');
      return
    } setError(null)
    if (registro) {
      registrar()
    }else{
      login()
    }
  }

  const registrar = React.useCallback(async () => {
    try {
      const res = await
        auth.createUserWithEmailAndPassword(email, pass)
      console.log(res.user)
      await db.collection('usuariosdb').doc(res.user.email).set(
        {
          email: res.user.email,
          id: res.user.uid
        }
      )
      setEmail('')
      setPass('')
      setError(null)

    } catch (error) {
      console.log(error.code)
      if (error.code === 'auth/invalid-email') {
        setError('Email no válido')
      }
      if (error.code === 'auth/email-alreadyin-use') {
        setError('Email ya registrado')
      }
    }
  }, [email, pass])

  const login = React.useCallback(async () => {
    try {
      const res = await
        auth.signInWithEmailAndPassword(email, pass)
      console.log(res.user)
      setEmail('')
      setPass('')
      setError(null)
      navigate("/admin");
    } catch (error) {
      console.log(error)
      if (error.code === 'auth/invalid-email') {
        setError('Email no válido')
      }
      if (error.code === 'auth/user-not-found') {
        setError('Email no registrado')
      }
      if (error.code === 'auth/wrong-password') {
        setError('pass no coincide')
      }
    }
  }, [email, pass, navigate])



  return (
    <div className='row justify-content-center my-2'>
      <div className='col-12 col-sm-10 col-md6 col-x1-4'>
        <form onSubmit={guardarDatos}>
          <input type="email"
            placeholder='Ingrese Su Email'
            className='form-control mb-3'
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <input type="password"
            placeholder='Ingrese Su Contraseña'
            className='form-control mb-3'
            onChange={e => setPass(e.target.value)}
            value={pass}
          />
          <div className='d-grid gap-2'>
            <button className='btn btn-primary'>
              {
                registro ? 'Registrarse' : 'Iniciar Seccion'
              }
            </button>

            <button className='btn btn-dark' onClick={() => { setModoregistro(!registro) }} type='button'>
              {
                registro ? 'Ya Estas Registrado?' : 'No Tienes Cuenta?'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login