const {db} = require('../models/creacionTablas');
const {merge} = require('../routes/rutes');

const inicio = async(req, res) =>{
    return res.status(400).json({
        mensaje: "Para ingresar al sistema debe colocar la ruta (/)"
    });
}

module.exports = {
    inicio
}