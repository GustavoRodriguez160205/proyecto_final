// BrowserRoutes : Gestiona todas las rutas
// Routes : Contiene las rutas
// Route : Componente Pagina Asociado
import {BrowserRouter , Routes , Route} from 'react-router-dom'
// Importamos el componente pagina principal
import Home from './paginas/Home'
import Registro from './paginas/Registro'
import NavBar from './Components/Navbar'
import Login from './paginas/Login'


function App() {

  return (
     // Gestionamos las rutas
    < BrowserRouter>
          
        <NavBar></NavBar>

        <Routes>
                <Route path='/' element = {<Home></Home>} ></Route>
                <Route path='/Registro' element = {<Registro></Registro>} ></Route>
                <Route path='/Login' element = {<Login></Login>}></Route>
        </Routes>


    </BrowserRouter>
  )
}

export default App
