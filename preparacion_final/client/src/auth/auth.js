import axios from 'axios'
import {useState , useEffect} from 'react'
import {useNavigate} from 'react-router-dom'


const useAuth = () => {
    // Verificamos si el usuario está o no logueado
    const [ isauth , setIsauth ] = useState(false)
    const [ nombre , setNombre] = useState("")
    const [ empresa , setEmpresa] = useState("")
    const [ domicilio , setDomicilio ] = useState("")
    const [ telefono , setTelefono ] = useState("")
    const [ password  , setPassword] = useState("")
    const [ correo , setCorreo] = useState("")


    const [ userId , setUserid ] = useState("")
    const [ isAdmin , setIsadmin ] = useState(false)
    const navigate = useNavigate()
    


    
    useEffect(() => {

        const authStatus = async() => {
            try {
                // Guardamos la respuesta del servidor, es decir , los datos del usuario logueado.
                
                const resp = await axios.get('http://localhost:5050/auth/verify' , { withCredentials : true })

                if (resp.status === 200) {
                    // Guardamos los valores que traemos de los usuarios logueados.
                    setIsauth(true)
                    setNombre(resp.data.nombre)
                    setEmpresa(resp.data.empresa)
                    setDomicilio(resp.data.domicilio)
                    setTelefono(resp.data.telefono)
                    setPassword(resp.data.password)
                    setCorreo(resp.data.correo)
                    setUserid(resp.data.id)
                    setIsadmin(resp.data.admin)
                    console.log(resp.data)
                } else {
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

                console.log(error);
                
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
        authStatus()

    }, [navigate]) // Esto nos va a permitir entre las rutas.


    return {
        isauth , nombre , empresa , domicilio , correo , password , telefono
    }

    // Aca verificamos la existencia del token, una vez verificada se traen los datos del usuario logueado.
}


export default useAuth
