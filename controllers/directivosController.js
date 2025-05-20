const {db} = require('../models/creacionTablas');
const{merge} = require('../routes/rutes');

const verDirectivo = async (req, res) => {
    try{
        const resultado = await db.execute("SELECT * FROM directivos");
        res.status(200).json(resultado.rows);
    }catch(err){
        res.status(500).json({
            error: 'Error al mostrar los Directivos',
            mensaje: err.message
        })
    }
}
const verDirectivoPorId = async (req, res) => {
    const { id } = req.params;
    
    try {
        const resultado = await db.execute(`SELECT * FROM directivos WHERE id = ?`, [id]);
        console.log(`Resultado de la consulta:`, resultado);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Directivo no encontrado' });
        }
        res.status(200).json(resultado.rows[0]);
    } catch (err) {
        res.status(500).json({
            error: 'Error al mostrar el directivo por ID',
            mensaje: err.message
        });
    }
}

const agregarDirectivo = async (req, res) => {
    const {cedula_directivos, nombre_directivo, cargo, estado_civil, nacionalidad} = req.body;

    if(!cedula_directivos || !nombre_directivo || !cargo || !estado_civil || !nacionalidad){
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    try {
        await db.execute(
            "INSERT INTO directivos (cedula_directivos, nombre_directivo, cargo, estado_civil, nacionalidad) VALUES (?, ?, ?, ?, ?)", [cedula_directivos, nombre_directivo, cargo, estado_civil, nacionalidad]
         );
        res.status(201).json({ message: 'Directivo agregado exitosamente' });
    }catch(err) {
        console.error('Error al agregar el directivo :', err);
        res.status(500).json({ error: 'Error al agregar el directivo', mensaje: err.message });
    }
}
const actualizarDirectivo = async (req, res) => {
    const { id } = req.params;
    const { cedula_directivos, nombre_directivo, cargo, estado_civil, nacionalidad } = req.body;

    try{
        const resultado = await db.execute("UPDATE directivos SET cedula_directivos = ?, nombre_directivo = ?, cargo = ?, estado_civil = ?, nacionalidad = ? WHERE id = ?", [cedula_directivos, nombre_directivo, cargo, estado_civil, nacionalidad, id]);
        if(resultado.rowsAffected === 0){
            return res.status(404).json({ error: 'Directivo no encontrado para actualizar' });
        }
        res.status(200).json({ message: 'Directivo actualizado exitosamente' });
    }catch(err){
        res.status(500).json({ error: 'Error al actualizar el directivo', mensaje: err.message });
    }
}
const eliminarDirectivo = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await db.execute("DELETE FROM directivos WHERE id = ?", [id]);
        if (resultado.rowsAffected === 0) {
            return res.status(404).json({ error: 'Directivo no encontrado para eliminar' });
            }
        res.status(200).json({ message: 'Directivo eliminado exitosamente' });
    }catch(err) {
        res.status(500).json({ error: 'Error al eliminar el directivo', mensaje: err.message });
        }
}



module.exports = { 
    verDirectivo,
    agregarDirectivo,
    verDirectivoPorId,
    actualizarDirectivo,
    eliminarDirectivo

};
