import { useState } from "react" // Importamos useState para manejar el estado en el componente.
import axios from "axios" // Importamos axios para hacer solicitudes HTTP.
import { useNavigate } from "react-router-dom" // Importamos useNavigate para manejar la navegación entre rutas.

const Login = () => {
    // Definimos los estados para almacenar los valores del correo y la contraseña que el usuario ingresa.
    const [password, setPassword] = useState() // Estado para almacenar la contraseña.
    const [correo, setCorreo] = useState() // Estado para almacenar el correo electrónico.
    
    const navigate = useNavigate() // Hook para navegar entre las rutas después del login exitoso.

    // Configuración global de axios para incluir cookies (credenciales) en las solicitudes.
    axios.defaults.withCredentials = true  // Esto asegura que las cookies sean enviadas junto con las solicitudes, útil para manejar sesiones de usuario.

    // Función que se ejecuta cuando el formulario se envía.
    const sendForm = async (evento) => {
        evento.preventDefault() // Evitamos el comportamiento por defecto del formulario (recargar la página).
        
        try {
            // Realizamos una solicitud POST a la ruta de login en el servidor con los datos del formulario.
            await axios.post('http://localhost:5500/auth/login-users', { password, correo }, { withCredentials: true })
            alert('Su login ha sido exitoso')

        } catch (error) {
            alert('Error, no se pudo completar su login')
            console.log(error);
        }
    }

    return (
        <>
            <form onSubmit={sendForm}>  {/* El formulario se enviará cuando el usuario haga submit. */}
                <div className="mb-3">
                    {/* Campo de entrada para el correo. El valor se almacena en el estado `correo` y se actualiza con el cambio de texto. */}
                    <input 
                        type="text" 
                        className="" 
                        placeholder="Correo electrónico" 
                        onChange={(evento) => setCorreo(evento.target.value)} 
                        value={correo} 
                    />
                </div>
                <div className="mb-3">
                    {/* Campo de entrada para la contraseña. El valor se almacena en el estado `password` y se actualiza con el cambio de texto. */}
                    <input 
                        type="password" 
                        className="" 
                        placeholder="Contraseña" 
                        onChange={(evento) => setPassword(evento.target.value)} 
                        value={password} 
                    />
                </div>
                {/* Botón para enviar el formulario */}
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </>
    )
}

export default Login
