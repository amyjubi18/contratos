const {db} = require('../models/creacionTablas');
const{merge} = require('../routes/rutes');

const verGerencia = async (req, res) => {
    try{
        const resultado = await db.execute("SELECT * FROM gerencias");
        res.status(200).json(resultado.rows);
    }catch(err){
        res.status(500).json({
            error: 'Error al mostrar los gerencias',
            mensaje: err.message
        })
    }
}
const verGerenciaPorId = async (req, res) => {
    const { id } = req.params;
    console.log(`Buscando gerencia con ID: ${id}`);
    
    try {
        const resultado = await db.execute(`SELECT * FROM gerencias WHERE id = ?`, [id]);
        console.log(`Resultado de la consulta:`, resultado);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Gerencia no encontrada' });
        }
        res.status(200).json(resultado.rows[0]);
    } catch (err) {
        res.status(500).json({
            error: 'Error al mostrar la gerencia por ID',
            mensaje: err.message
        });
    }
}

const agregarGerencia = async (req, res) => {
    const {gerencia} = req.body;

    if(!gerencia){
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    try {
        await db.execute(
            "INSERT INTO gerencias (gerencia) VALUES (?)", [gerencia]
         );
        res.status(201).json({ message: 'Gerencia agregado exitosamente' });
    }catch(err) {
        console.error('Error al agregar la gerencia :', err);
        res.status(500).json({ error: 'Error al agregar la gerencia', mensaje: err.message });
    }
}
const actualizarGerencia = async (req, res) => {
    const { id } = req.params;
    const { gerencia } = req.body;

    try{
        const resultado = await db.execute("UPDATE gerencias SET gerencia = ? WHERE id = ?", [gerencia, id]);
        if(resultado.rowsAffected === 0){
            return res.status(404).json({ error: 'Gerencia no encontrada para actualizar' });
        }
        res.status(200).json({ message: 'Gerencia actualizada exitosamente' });
    }catch(err){
        res.status(500).json({ error: 'Error al actualizar la gerencia', mensaje: err.message });
    }
}
const eliminarGerencia = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await db.execute("DELETE FROM gerencias WHERE id = ?", [id]);
        if (resultado.rowsAffected === 0) {
            return res.status(404).json({ error: 'Gerencia no encontrada para eliminar' });
            }
        res.status(200).json({ message: 'Gerencia eliminada exitosamente' });
    }catch(err) {
        res.status(500).json({ error: 'Error al eliminar la gerencia', mensaje: err.message });
        }
}



module.exports = { 
    verGerencia,
    agregarGerencia,
    verGerenciaPorId,
    actualizarGerencia,
    eliminarGerencia

};