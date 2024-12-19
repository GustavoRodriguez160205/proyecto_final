// Link : Nos permite redirigir a otro componente
// UseNavigate : Nos permite la navegación entre las paginas
import { Link , useNavigate } from 'react-router-dom'


const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        <Link className="nav-link" to="/Registro">Registro</Link>
                        <Link className="nav-link" to="/Login">Login</Link>
                        <Link className="nav-link" to="/Usuario">Usuario</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}


export default NavBar