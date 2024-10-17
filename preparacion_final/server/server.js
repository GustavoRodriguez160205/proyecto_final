// Importamos las librerías necesarias
const express = require('express')         
require('../server/Conex/conect')           
const user = require('./models/model')    
const app = express()
const coockie = require('cookie-parser')
const morgan = require('morgan')           
const jwt = require('jsonwebtoken')


// Creamos un enrutador específico para las rutas de usuarios
const userRoutes = express.Router()
const authRoutes = express.Router()

// Middleware para manejar los JSON
app.use(express.json())
app.use(coockie())

// Middleware de Morgan para ver información de las peticiones
app.use(morgan('dev'))

// Definimos el uso de las rutas de usuarios
app.use('/users', userRoutes)
app.use('/auth' , authRoutes)


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

// Ruta para logueo
authRoutes.post('/login-users' , async (req , res) => {
   try {
    // Traemos correo y contraseña del formulario
    const {correo , password} = req.body
    const usuario = await user.findOne({correo})
    if(!usuario){
        return res.status(401).json({resp , message : 'Email o contraseña incorrectos'})
    }
    // Comparamos la contraseña q envie con el formulario con el usuario que yo traje a traves del correo
    if(password !== usuario.password){
        return res.status(401).json({resp , message : 'Contraseña Incorrecta'})
    }

    // Generamos el token
     const token = jwt.sign(
     {id: usuario._id  , 
           correo: usuario.correo ,
          password: usuario.password ,
         nombre: usuario.nombre,
         telefono: usuario.telefono ,
         empresa: usuario.empresa ,
         domicilio: usuario.domicilio} ,
        'hola123' , {expiresIn : '1h'}) 
    
        // Creamos una coquie con sierto nombre donde se guarda el token
        // Verificamos que es tipo de solicitud http 
                                           // Duración maxima de validez que va a tener un token
     res.cookie('llave', token , {httpOnly : true , maxAge : 36000000} )

    return res.status(200).json({message: 'Has iniciado sesión correctamente' , token})

   } catch (error) {
     console.log(error)
   }
})


// Iniciamos el servidor en el puerto 5500
app.listen(5500, () => {
    console.log('App corriendo en server', app)
})



