// Importamos las librerías necesarias
const express = require('express')         
require('../server/Conex/conect')           
const user = require('./models/model')    
const morgan = require('morgan')           

// Instanciamos express para crear la aplicación
const app = express()

// Creamos un enrutador específico para las rutas de usuarios
const userRoutes = express.Router()


// Middleware para manejar los JSON
app.use(express.json())

// Middleware de Morgan para ver información de las peticiones
app.use(morgan('dev'))

// Definimos el uso de las rutas de usuarios, asociándolas a la URL base '/users'
app.use('/users', userRoutes)



// Definimos la ruta para obtener usuarios con un método GET
userRoutes.get('/get-users', async (req, res) => {
    // Traemos todos los datos
    const resp = await user.find({})
    return res.status(200).json({resp, message: 'Usuarios obtenidos correctamente'})  // Enviamos una respuesta con estado 200 y un mensaje 'usuarios obtenidos'
})


// Definimos la ruta para enviar los datos y asi crear los recursos
userRoutes.post('/create-users', async (req , res) => {
    try {
        const usuariosData = req.body
        const {correo}  = req.body
        const usuario = await user.findOne({correo})
        if(usuario){
            return res.status(401).json('Correo existente')
        }
         // Para que el usurio se registren como privados        
        usuariosData.is_public = false

        // Creamos el recurso sobre la base de datos
        const nuevoUser = new user(usuariosData)
        // Guardamos el recurso en la bd
        const resp = await nuevoUser.save()
        // Si se cumple , retorna el usuario
        return res.status(201).json({resp, message: 'Registrado exitosamente'} )
    } catch (error) {
        console.log(error)
    }
})

// Definimos la ruta para editar los usuarios
userRoutes.patch('/edit-users/:id' , async (req , res) => {
    try {
        // Parametros del id de la ruta
        const {id} = req.params
        const usuariosData = req.body
        // Encontramos el usuario por id y lo modificamos 
        const resp = await user.findByIdAndUpdate(id , usuariosData , {new : true})

        if(!resp){
            return res.status(404).json({resp , message: 'Recursos no encontrados'})
        }

        return res.status(200).json({resp, message: 'Usuario modificado'} )


    } catch (error) {
        console.log(error)
    }
})


userRoutes.delete('/delete-users/:id' , async (req, res) => {
    try {
        const {id} = req.params
        // Encontramos id y lo eliminamos
        const resp = await user.findByIdAndDelete(id)
        if(!resp){
            return res.status(404).json({resp , message : 'Usuario no encontrado'})
           
        }
        return res.status(200).json({resp , message : 'Eliminamos datos'})



    } catch (error) {
        console.log(error);
        
    }
})


// Iniciamos el servidor en el puerto 5500
app.listen(5500, () => {
    // Mostramos un mensaje en la consola cuando el servidor está corriendo
    console.log('App corriendo en server', app)
})



