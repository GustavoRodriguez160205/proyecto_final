const {Schema , model} = require('mongoose')


const user_schema = Schema({
    nombre : {type : String , required : true , unique : true},
    empresa : {type : String , required: true },
    telefono : {type : Number , required : true},
    correo : {type : String , required : false , default : 'admin'}, // Es para q el admin sea propietario del usuario.
    is_public : {type : Boolean  , default : true},
    is_visible : {type : Boolean  , default : true},
    password : {type : String , required : false , default : ''}, // Para crear por defecto sin contraseña.
    admin : {type : Boolean , default : false},
    domicilio : {type : String  , required: false}

})

module.exports = model('usuario' , user_schema)
    