import axios from 'axios'
import { useState , useEffect } from "react"
import auth from '../auth/auth'
import Tarjetas from '../Components/Tarjetas'




const Contact = () => {
    const [ nombre , setNombre ] = useState()
    const [ empresa , setEmpresa ] = useState()
    const [ domicilio , setDomicilio ] = useState()
    const [ telefono , setTelefono ] = useState()
    const [ correo , setCorreo ] = useState()
    const [ contactos , setContactos ] = useState([])
    const [ error , setError ] = useState("")
    const { isAdmin} = auth()


    
    const sendForm = async(evento) => {
          evento.preventDefault()
          try {
            const resp =  await axios.post('http://localhost:5500/users/create-contact' , {nombre , empresa , domicilio , telefono , correo})
            alert('Contacto creado correctamente.')

            if (resp.data.respuesta) {
                setContactos((prevContactos) => [...prevContactos , resp.data.respuesta])
            }
            setNombre("")
            setEmpresa("")
            setDomicilio("")
            setTelefono("")
            setCorreo("")
     

          } catch (error) {
            alert('No se pudo crear el contacto.')
            console.log(error);
            
          }
    }


    useEffect(() => {
        const getContact = async() => {
            try {
                if (isAdmin) {
                    const resp = await axios.get('http://localhost:5500/users/get-contact-admin' , {withCredentials: true})
                    setContactos(resp.data)
                    console.log(resp);
                    
                }
                else{
                    const resp = await axios.get('http://localhost:5500/users/get-contact-propietario' , {withCredentials: true})
                    setContactos(resp.data)
                }
          

            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError("Recurso no Encontrado.")
                } else {
                    setError("Error al traer el contacto.")
                }
                
            }
           
        }
        getContact()
    }, [isAdmin])





     
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

                <button type="submit" className="btn btn-primary">Crear Conctacto</button>
            </form>

            <div>
                {error ? (
                    <p>{error}</p>
                )
            : ( contactos.map(contacto => (
                <Tarjetas 
                  key={contacto._id} 
                  nombre={contacto.nombre} 
                  empresa={contacto.empresa} 
                  propietario={contacto.propietario} 
                  correo={contacto.correo} 
                  telefono={contacto.telefono} 
                  domicilio={contacto.domicilio} 

                  id = {contacto._id}
                />
              ))) }
            </div>



        </>  

  )
}


export default Contact


