import axios from "axios";
import { Await, useNavigate } from 'react-router-dom'
import useAuth from "../auth/auth"


const UserLog = () => {
    const { userId, nombre, empresa, correo, password, domicilio, telefono, setCorreo, setNombre, setEmpresa, setPassword, setDomicilio, setTelefono } = useAuth()
    const navigate = useNavigate()

    const sendForm = async (evento) => {
        evento.preventDefault()

        try {
            await axios.patch(`http://localhost:5500/user/edit-users/${userId}`, { nombre, empresa, correo, password, domicilio, telefono })
            alert('Usuario Actualizado')
            navigate('/')
        } catch (error) {
            console.log(error);

        }
    }

    const handlechange = (evento, campo) => {
        const valor = evento.target.value

        switch (campo) {
            case "correo":
                setCorreo(valor)
                break;
            case "empresa":
                setEmpresa(valor)
                break;
            case "domicilio":
                setDomicilio(valor)
                break;
            case "password":
                setPassword(valor)
                break;
            case "telefono":
                setTelefono(valor)
                break;
            case "nombre":
                setNombre(valor)
                break;

            default:
                break;
        }
    }

    return (


        <>
            <form onSubmit={sendForm}>
                <div className="mb-3">
                    <input type="text" className="" placeholder="correo electronico" onChange={(evento) => handlechange(evento , 'correo')} value={correo} />
                </div>
                <div className="mb-3">
                    <input type="text" className="" placeholder="Empresa" onChange={(evento) => handlechange(evento , 'empresa')} value={empresa} />
                </div>
                <div className="mb-3">
                    <input type="text" className="" placeholder="Nombre" onChange={(evento) => handlechange(evento , 'nombre')} value={nombre} />
                </div>
                <div className="mb-3">
                    <input type="text" className="" placeholder="Dirección" onChange={(evento) => handlechange(evento , 'domicilio')} value={domicilio} />
                </div>
                <div className="mb-3">
                    <input type="text" className="" placeholder="Telefono" onChange={(evento) => handlechange(evento , 'telefono')} value={telefono} />
                </div>
                <div className="mb-3">
                    <input type="password" className="" placeholder="Contraseña" onChange={(evento) => handlechange(evento , 'password')} value={password} />
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>

        </>
    )
}

export default UserLog