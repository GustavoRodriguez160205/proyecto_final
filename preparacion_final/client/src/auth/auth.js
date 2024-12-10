import axios from 'axios'
import {useState , useEffect} from 'react'


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

    }, []) // El array vacio significa que el efecto solo se aplicara en el momento de la renderización.


    return {
        isauth , nombre , empresa , domicilio , correo , password , telefono
    }

    // Aca verificamos la existencia del token, una vez verificada se traen los datos del usuario logueado.
}


export default useAuth
