const {db} = require('../models/creacionTablas');
const{merge} = require('../routes/rutes');

const verContratos = async (req, res) =>{
    try{
        const resultado = await db.execute(`
            SELECT 
                c.id, 
                e.cedula AS cedula,
                e.profesion AS profesion, 
                e.nombre_apellido AS nombre_apellido, 
                e.nacionalidad AS nacionalidad, 
                e.pto_cuenta AS pto_cuenta, 
                e.fecha_pto AS fecha_pto, 
                e.estado_civil AS estado_civil, 
                e.ocupacion AS ocupacion, 
                e.direccion AS direccion, 
                e.telefono AS telefono, 
                e.correo AS correo, 
                e.vigencia AS vigencia, 
                e.funciones AS funciones,
                g.gerencia AS gerencia,
                d.cedula_directivos AS cedula_directivos,
                d.nombre_directivo AS nombre_directivo,
                d.cargo AS cargo
            FROM
                cdt c
            INNER JOIN
                empleados e ON c.empleados_id = e.id
            INNER JOIN
                gerencias g ON c.gerencia_id = g.id
            INNER JOIN
                directivos d ON c.directivos_id = d.id 
        ` /* `SELECT * FROM cdt` */);
            res.status(200).json(resultado.rows);
        }catch(err){
            res.status(500).json({
                error: 'Error al mostrar los datos del contrato',
                mensaje: err.message
            })
        }
}
const verContratosPorId = async (req, res) => {
    const { id } = req.params;
    try{
        const resultado = await db.execute("SELECT * FROM cdt WHERE id = ?",  [id]);
        if(resultado.rows.length === 0){
            return res.status(404).json({ error: 'Contrato no encontrado' });
        }

    }catch(err){
        res.status(500).json({
            error: 'Error al mostrar el contrato por ID',
            mensaje: err.message
            })
    }
}
const agregarContrato = async(req, res) =>{
    const {empleados_id, gerencia_id, directivos_id} = req.body;
    if(!empleados_id || !gerencia_id || !directivos_id){
        return res.status(400).json({error: "Faltan datos obligatorios"});
    }

    try{
        await db.execute(
            "INSERT INTO cdt (empleados_id, gerencia_id, directivos_id) VALUES (?, ?, ?)", [empleados_id, gerencia_id, directivos_id]
        );
        res.status(201).json({mensaje: "el contrato se agrego con exito"});
    }catch(err){
        res.status(500).json({error: "Error al agregar el comtrato", mensaje: err.message});
    }
}

const actualizarContrato = async (req, res) =>{
    const {id} = req.params;
    const{empleados_id, gerencia_id, directivos_id} = req.body;
    try{
        const resultado = await db.execute(
            "UPDATE cdt SET empleados_id = ?, gerencia_id = ?, directivos_id = ? WHERE id = ?",
            [empleados_id, gerencia_id, directivos_id, id] 
        );

        if (resultado.rowsAffected === 0) {
            return res.status(404).json({ error: 'Empleado no encontrado para actualizar' });
        }

        res.status(200).json({ message: 'Contrato actualizado exitosamente' });
    } catch (err) {
        console.error('Error al actualizar el contrato:', err);
        res.status(500).json({ error: 'Error al actualizar el contrato', mensaje: err.message });
    }
}
const eliminarContrato = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await db.execute('DELETE FROM cdt WHERE id = ?', [id]);
        if (resultado.rowsAffected === 0) {
            return res.status(404).json({ error: 'Contrato no encontrado para eliminar' });    
        }
        res.status(200).json({ message: 'Contrato eliminado exitosamente' });
    } catch (err) {
        console.error('Error al eliminar el Contrato:', err);
        res.status(500).json({ error: 'Error al eliminar el Contrato', mensaje: err.message });
    }
}
module.exports ={
    verContratos,
    verContratosPorId,
    agregarContrato,
    actualizarContrato,
    eliminarContrato
}