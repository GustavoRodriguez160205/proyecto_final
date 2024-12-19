import axios  from "axios";
import {useNavigate} from 'react-router-dom'
import useAuth from "../auth/auth"


const UserLog = () => {
   
    
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

export default UserLog