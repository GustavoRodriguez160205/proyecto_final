import axios from 'axios' // Librería para hacer solicitudes HTTP.
import { useState, useEffect } from 'react' // Hooks de React para manejar estados y efectos secundarios.
import { useNavigate } from 'react-router-dom' // Hook para la navegación entre rutas.

const useAuth = () => {
    // Estados para guardar la información del usuario y el estado de autenticación.
    const [isauth, setIsauth] = useState(false) 
    const [nombre, setNombre] = useState("") 
    const [empresa, setEmpresa] = useState("") 
    const [domicilio, setDomicilio] = useState("") 
    const [telefono, setTelefono] = useState("") 
    const [password, setPassword] = useState("") 
    const [correo, setCorreo] = useState("") 
    const [userId, setUserid] = useState("") 
    const [isAdmin, setIsadmin] = useState(false) 
    const navigate = useNavigate() 

    useEffect(() => {
        // Función para verificar si el usuario está autenticado.
        const authStatus = async () => {
            try {
                // Realizamos una solicitud al servidor para verificar la autenticación.
                const resp = await axios.get('http://localhost:5500/auth/verify', { withCredentials: true })

                if (resp.status === 200) { 
                    // Si el servidor responde con éxito (status 200), actualizamos los estados con los datos del usuario.
                    setIsauth(true)
                    setNombre(resp.data.nombre) // Nombre del usuario desde la respuesta del servidor.
                    setEmpresa(resp.data.empresa) // Empresa del usuario.
                    setDomicilio(resp.data.domicilio) // Domicilio del usuario.
                    setTelefono(resp.data.telefono) // Teléfono del usuario.
                    setPassword(resp.data.password) // Contraseña (poco recomendable guardar en el frontend).
                    setCorreo(resp.data.correo) // Correo electrónico.
                    setUserid(resp.data.id) // Identificador del usuario.
                    setIsadmin(resp.data.admin) // Rol de administrador.
                    console.log(resp.data) // Imprimimos los datos del usuario en consola para depuración.
                } else {
                    // Si la respuesta no es exitosa, limpiamos los estados y marcamos al usuario como no autenticado.
                    setIsauth(false)
                    setNombre("")
                    setEmpresa("")
                    setDomicilio("")
                    setTelefono("")
                    setPassword("")
                    setCorreo("")
                    setUserid("")
                    setIsadmin("")
                }
            } catch (error) {
                // Si ocurre un error (por ejemplo, el servidor no responde), limpiamos los estados y marcamos al usuario como no autenticado.
                console.error(error) 
                setIsauth(false)
                setNombre("")
                setEmpresa("")
                setDomicilio("")
                setTelefono("")
                setPassword("")
                setCorreo("")
                setUserid("")
                setIsadmin("")
            }
        }

        authStatus() // Llamamos a la función para verificar el estado de autenticación al montar el componente.

    }, [navigate]) 


    const logout = async () => {
          try {
             const resp = await axios.get('http://localhost:5500/auth/logout', {withCredentials: true} )
             if (resp.status === 200) {
                setIsauth(false)
                setNombre("")
                setEmpresa("")
                setDomicilio("")
                setTelefono("")
                setPassword("")
                setCorreo("")
                setUserid("")
                setIsadmin(false)
               
                return true
             
            } else {
                
                return false
             }
          } catch (error) {
            console.log(error);
            setIsauth(false)
            setNombre("")
            setEmpresa("")
            setDomicilio("")
            setTelefono("")
            setPassword("")
            setCorreo("")
            setUserid("")
            setIsadmin(false)
            
            return false

          }
    }


    // Devolvemos los datos importantes para que los componentes que usen este hook puedan acceder a ellos.
    return {
        isauth,
        nombre, 
        empresa, 
        domicilio, 
        correo, 
        password,
        telefono,
        setCorreo,
        setNombre,
        setCorreo,
        setDomicilio,
        setPassword,
        setEmpresa,
        setTelefono,
        userId,
        isAdmin,
        logout

    }

}


export default useAuth // Exportamos el hook para usarlo en otros componentes.
