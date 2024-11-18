import { useState } from "react"
import axios from "axios"

const Registro = () => {

    // Definimos la logica del componente
    // El setEmail es para el input específico del correo electronico
    const [ nombre , setNombre] = useState()
    const [ empresa , setEmpresa] = useState()
    const [ domicilio , setDomicilio ] = useState()
    const [ telefono , setTelefono ] = useState()
    const [ password  , setPassword] = useState()
    const [ correo , setCorreo] = useState()
    
    const sendForm = async(evento) => {
          evento.preventDefault()
          try {
            await axios.post('http://localhost:5500/users/create-users' , {nombre , empresa , domicilio , telefono , password , correo})
            alert('Su registro a sido exitoso')
          } catch (error) {
            alert('Su registro no se pudo completar')
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
                    <input type="text" className="" placeholder="Empresa" onChange= { (evento) => setEmpresa( evento.target.value)} value = {empresa} />
                </div>
                <div className="mb-3">
                    <input type="text" className="" placeholder="Nombre" onChange= { (evento) => setNombre( evento.target.value)} value = {nombre}/>
                </div>
                <div className="mb-3">
                    <input type="text" className="" placeholder="Dirección" onChange= { (evento) => setDomicilio( evento.target.value)} value = {domicilio}/>
                </div>
                <div className="mb-3">
                    <input type="text" className="" placeholder="Telefono" onChange= { (evento) => setTelefono( evento.target.value)} value = {telefono}/>
                </div>
                <div className="mb-3">
                    <input type="password" className="" placeholder="Contraseña" onChange= { (evento) => setPassword( evento.target.value)} value = {password} />
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </>
    )
}


export default Registro