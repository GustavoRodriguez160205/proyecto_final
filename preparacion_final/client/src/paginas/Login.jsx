import { useState } from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Login = () => {
    const [ password  , setPassword] = useState()
    const [ correo , setCorreo] = useState()
    const navigate = useNavigate() // Nos permite navegar entre las rutas
    
    axios.defaults.withCredentials = true  // Esto es para la gestión de autenticación

    const sendForm = async(evento) => {
          evento.preventDefault()
          try {
            await axios.post('http://localhost:5500/auth/login-users' , {password , correo} , {withCredentials: true})
            alert('Su login a sido exitoso')
          } catch (error) {
            alert('Error , no se pudo completar su login')
            console.log(error); 
          }
    }
    return (
        <>
            <form onSubmit={sendForm}>
                <div className="mb-3">
                    <input type="text" className="" placeholder="correo electronico" onChange= { (evento) => setCorreo( evento.target.value)} value = {correo}/>
                </div>
                <div className="mb-3">
                    <input type="password" className="" placeholder="Contraseña" onChange= { (evento) => setPassword( evento.target.value)} value = {password} />
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </>
    )
}

export default Login