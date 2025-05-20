const {db} = require('../models/creacionTablas');
const{merge} = require('../routes/rutes');

const verEmpleados = async (req, res) => {
    console.log('Parámetros recibidos:', req.params); // Esto debería estar vacío
    try {
        const resultado = await db.execute(`
        SELECT 
            e.id,
            e.cedula, 
            e.profesion, 
            e.nombre_apellido, 
            e.nacionalidad, 
            e.pto_cuenta, 
            e.fecha_pto, 
            e.estado_civil, 
            e.ocupacion, 
            e.direccion, 
            e.telefono, 
            e.correo, 
            e.vigencia, 
            e.funciones,
            g.gerencia AS gerencia
        FROM 
            empleados e 
        INNER JOIN 
            gerencias g ON e.gerencia_id = g.id
        `);
        res.status(200).json(resultado.rows); // Devuelve todos los empleados
    } catch (err) {
        res.status(500).json({
            error: 'Error al mostrar los empleados',
            mensaje: err.message
        });
    }
}
const verEmpleadoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await db.execute(`
            SELECT 
                e.id,
                e.cedula, 
                e.profesion, 
                e.nombre_apellido, 
                e.nacionalidad, 
                e.pto_cuenta, 
                e.fecha_pto, 
                e.estado_civil, 
                e.ocupacion, 
                e.direccion, 
                e.telefono, 
                e.correo, 
                e.vigencia, 
                e.funciones,
                g.gerencia AS gerencia
            FROM 
                empleados e 
            INNER JOIN 
                gerencias g ON e.gerencia_id = g.id
            WHERE 
                e.id = ?`, [id]);
        
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.status(200).json(resultado.rows[0]); // Devuelve el empleado encontrado
    } catch (err) {
        res.status(500).json({
            error: 'Error al mostrar el empleado por ID',
            mensaje: err.message
        });
    }
}

const agregarEmpleado = async (req, res) => {
    const {profesion, nombre_apellido, nacionalidad, pto_cuenta, fecha_pto, estado_civil, ocupacion, direccion, telefono, correo, vigencia, funciones} = req.body;
    const cedula = parseInt(req.body.cedula, 10);
const gerencia_id = parseInt(req.body.gerencia_id, 10);

    if(!cedula || !profesion || !nombre_apellido || !nacionalidad || !pto_cuenta || !fecha_pto || !estado_civil || !ocupacion || !direccion || !telefono || !correo || !vigencia || !funciones || !gerencia_id){
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    try {
        await db.execute(
            "INSERT INTO empleados (cedula, profesion, nombre_apellido, nacionalidad, pto_cuenta, fecha_pto, estado_civil, ocupacion, direccion, telefono, correo, vigencia, funciones, gerencia_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [cedula, profesion, nombre_apellido, nacionalidad, pto_cuenta, fecha_pto, estado_civil, ocupacion, direccion, telefono, correo, vigencia, funciones, gerencia_id]
         );
        res.status(201).json({ message: 'Empleado agregado exitosamente' });
    }catch(err) {
        console.error('Error al agregar el empleado:', err);
        res.status(500).json({ error: 'Error al agregar el empleado', mensaje: err.message });
    }
}
const actualizarEmpleado = async (req, res) => {
    const { id } = req.params;
    const { cedula, profesion, nombre_apellido, nacionalidad, pto_cuenta, fecha_pto, estado_civil, ocupacion, direccion, telefono, correo, vigencia, funciones, gerencia_id } = req.body;

    try {
        const resultado = await db.execute(
            "UPDATE empleados SET cedula = ?, profesion = ?, nombre_apellido = ?, nacionalidad = ?, pto_cuenta = ?, fecha_pto = ?, estado_civil = ?, ocupacion = ?, direccion = ?, telefono = ?, correo = ?, vigencia = ?, funciones = ?, gerencia_id = ? WHERE id = ?",
            [cedula, profesion, nombre_apellido, nacionalidad, pto_cuenta, fecha_pto, estado_civil, ocupacion, direccion, telefono, correo, vigencia, funciones, gerencia_id, id]
        );

        if (resultado.rowsAffected === 0) {
            return res.status(404).json({ error: 'Empleado no encontrado para actualizar' });
        }

        res.status(200).json({ message: 'Empleado actualizado exitosamente' });
    } catch (err) {
        console.error('Error al actualizar el empleado:', err);
        res.status(500).json({ error: 'Error al actualizar el empleado', mensaje: err.message });
    }
}
const eliminarEmpleado = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await db.execute("DELETE FROM empleados WHERE id = ?", [id]);
        if (resultado.rowsAffected === 0) {
            return res.status(404).json({ error: 'Empleado no encontrado para eliminar' });    
        }
        res.status(200).json({ message: 'Empleado eliminado exitosamente' });
        } catch (err) {
            console.error('Error al eliminar el empleado:', err);
            res.status(500).json({ error: 'Error al eliminar el empleado', mensaje: err.message });
        }
}

module.exports = { 
    verEmpleados,
    agregarEmpleado,
    actualizarEmpleado,
    eliminarEmpleado,
    verEmpleadoPorId

};