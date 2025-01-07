
const Tarjetas = ({nombre , empresa , propietario , domicilio , correo , telefono}) => {
      // Seteamos los datos para las tarjetas obtenidas del home
    return (
        <> 
            <div className="card">
                    <div className="card-body">
                        <p className="card-text">{nombre}</p>
                        <p className="card-text">{empresa}</p>
                        <p className="card-text">{propietario}</p>
                        <p className="card-text">{domicilio}</p>
                        <p className="card-text">{correo}</p>
                        <p className="card-text">{telefono}</p>
                    </div>
            </div>

        </>
    )
}


export default Tarjetas