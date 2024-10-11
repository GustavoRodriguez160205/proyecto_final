const mongose = require('mongoose')

// Declaramos la función de conexion a la bd
const conext = async () => {
    try {
        await mongose.connect('mongodb+srv://gustavoFinal:IJz3uMOzo4SKjWWe@bdclase02.ei3pbqg.mongodb.net/?retryWrites=true&w=majority&appName=bdClase02')
        console.log('Nos pudimos conectar a la bd');
    } catch (error) {
        console.log(error.message)
    }
}

// Ejecuto la función
conext()

