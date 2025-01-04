// Importamos los hooks de React, el componente Tarjetas, axios y el hook personalizado useAuth.
import { useEffect, useState } from "react" // useEffect para efectos secundarios y useState para manejar estados.
import Tarjetas from "../Components/Tarjetas" // Componente para mostrar las tarjetas.
import axios from "axios" // Librería para hacer solicitudes HTTP.


const Home = () => {
  
  // Definimos el estado para almacenar los contactos que traemos del servidor.
  const [contactos, setContactos] = useState([]) // Estado inicial vacío para los contactos.


  // useEffect: Este hook se ejecuta cuando el componente se renderiza. En este caso, solo se ejecuta una vez al estar vacío el array de dependencias.
  useEffect(() => {
    // Función asincrónica para traer los contactos del servidor.
    const userData = async () => {
      try {
        // Hacemos una petición GET al servidor para obtener los contactos.
        const resp = await axios.get("http://localhost:5500/users/get-contact", { withCredentials: true })
        
        // Al recibir la respuesta, actualizamos el estado `contactos` con la lista de contactos.
        setContactos(resp.data.respuesta)

      } catch (error) {
        // Manejo de errores:
        // Si el error es un 404 (recurso no encontrado), mostramos un mensaje específico.
        if (error.response && error.response.status === 404) {
          console.log("Recurso no Encontrado");
        } else {
          console.log("Error al traer contactos");
        }
      }
    }
    
    userData() // Llamamos a la función `userData` para obtener los contactos desde el servidor.
  

  }, []) // El array vacío significa que el efecto solo se ejecutará una vez, justo después de la primera renderización del componente.

  return (
    <section>
      {/* Renderizado condicional de los contactos. */}
      {
        contactos.length === 0 ? (
          <p>No hay contactos para mostrar</p>
        ) : (
          contactos.map(contacto => (
            <Tarjetas 
              key={contacto._id} 
              nombre={contacto.nombre} 
              empresa={contacto.empresa} 
              propietario={contacto.propietario} 
              correo={contacto.correo} 
              telefono={contacto.telefono} 
              domicilio={contacto.domicilio} 
            />
          ))
        )
      }
    </section>
  )
}

export default Home
