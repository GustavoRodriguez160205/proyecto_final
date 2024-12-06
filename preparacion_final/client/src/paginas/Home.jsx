// Creamos un componente pagina principal

import { useEffect, useState } from "react"
import Tarjetas from "../Components/Tarjetas"
import axios from "axios"


const Home = () => {

  // UseEffect : Gestiona la ejecución del codigo / componente. 
  // Recibe 2 parametros , el primero es una función. Y el segundo es un array

  const [contactos, setContactos] = useState([]) // Es una lista vacia porque se supone que vamos a traer una lista de contactos.

  useEffect(() => {
    const userData = async () => {
      try {
        // Hacemos una petición al server , para traer los contactos
        const resp = await axios.get("http://localhost:5500/users/get-contact", { withCredentials: true })

    setContactos(resp.data)

} catch (error) {
  if (error.response && error.response.status === 404) { // Verifica si el error es un 404
    console.log("Recurso no Encontrado");
  } else {
    console.log("Error al traer contactos");
  }

}}
userData() // LLamamos a la función user data 
console.log(typeof (contactos)); // Provamos para ver si nos devuelve los contactos
    } , [] ) // El array vacio significa que el efecto solo se aplicara en el momento de la renderización



return (
  // Nos permite recorrer la lista de contacto y a cada elemento le aplica una función
  <section>
    {
      // Verificamos si la lesta que traemos está vacia. Si está vacia nos va a mostrar el parrafo y si esta llena , nos va a crear las tarjetas.
         contactos.length === 0 ? (<p>No hay contactos para mostrar</p>) : (contactos.map(contacto => (
        <Tarjetas key={contacto._id} nombre={contacto.nombre} empresa={contacto.empresa} propietario={contacto.propietario} correo={contacto.correo} telefono={contacto.telefono} domicilio={contacto.domicilio} />)


      ))}

  </section>


)
}


export default Home