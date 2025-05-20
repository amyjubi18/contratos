const {createClient} = require('@libsql/client');

//configuracion de la base de datos

const db = createClient({
    url:'libsql://consultoria-amyjubi18.aws-us-east-1.turso.io',
    authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDUyNDM4MjIsImlkIjoiMzdhNzg3MzQtMzE3OS00M2I1LWIzNDAtNjJkMTA0NzM2ZDRkIiwicmlkIjoiZjdmNDMxMjgtNjllOC00YTkyLWFlMzItNDg2MmUyNWYxZmM2In0.mArGEM_hn3gFtPafeUo7iRan8igwEBy4CfYJATYbHymeIzk0UqWooMT0E23A6Jr5yfxqFelR9rS3o4KKiDk9Bw'
});

//creacion de la tabla
async function crearTablas(){
    try{
        await db.execute(`
                CREATE TABLE IF NOT EXISTS empleados(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cedula INTEGER(9) NOT NULL,
                profesion VARCHAR(500) NOT NULL,
                nombre_apellido VARCHAR(255) NOT NULL,
                nacionalidad VARCHAR(255) CHECK (nacionalidad IN ('Venezolano', 'Venezolana', 'Extranjero', 'Extranjera')),
                pto_cuenta VARCHAR(255) NOT NULL,
                fecha_pto DATE NOT NULL,
                estado_civil VARCHAR(255) CHECK (estado_civil IN ('Soltero', 'Soltera', 'Casado', 'Casada', 'Viudo', 'Viuda', 'Divorciado', 'Divorciada')),
                gerencia_id INTEGER NOT NULL,
                ocupacion VARCHAR(255) NOT NULL,
                direccion VARCHAR(500) NOT NULL,
                telefono VARCHAR(20) NOT NULL,
                correo VARCHAR(255) NOT NULL,
                vigencia DATE NOT NULL,
                funciones VARCHAR(500) NOT NULL,
                fecha_creacion DATE NOT NULL DEFAULT CURRENT_DATE,
                FOREIGN KEY (gerencia_id) REFERENCES gerencias(id)
                );
            `);
            await db.execute(`
                CREATE TABLE IF NOT EXISTS gerencias (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                gerencia VARCHAR(255) NOT NULL,
                fecha_creacion DATE NOT NULL DEFAULT CURRENT_DATE
                );
            `);
            await db.execute(`
                CREATE TABLE IF NOT EXISTS directivos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cedula_directivos INTEGER(9) UNIQUE,
                nombre_directivo VARCHAR(255) NOT NULL,
                cargo VARCHAR(255) CHECK (cargo IN ('su Presidente (E) el ciudadano', 'la Directora Ejecutiva (E)')), 
                estado_civil VARCHAR(255) CHECK (estado_civil IN ('Soltero', 'Soltera', 'Casado', 'Casada', 'Viudo', 'Viuda', 'Divorciado', 'Divorciada')),
                nacionalidad VARCHAR(255) CHECK (nacionalidad IN ('Venezolano', 'Venezolana', 'Extranjero', 'Extranjera')),
                fecha_creacion DATE NOT NULL DEFAULT CURRENT_DATE
                );
            `);
            await db.execute(`
                CREATE TABLE IF NOT EXISTS cdt (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                empleados_id INTEGER NOT NULL,
                gerencia_id INTEGER NOT NULL,
                directivos_id INTEGER NOT NULL,
                fecha_creacion DATE NOT NULL DEFAULT CURRENT_DATE,
                FOREIGN KEY (empleados_id) REFERENCES empleados(id),
                FOREIGN KEY (gerencia_id) REFERENCES gerencias(id),
                FOREIGN KEY (directivos_id) REFERENCES directivos(id)
                );
            `);
                console.log('Todas las tablas han sido creadas');          

    }catch(err){
        console.error('Error al crear las tablas:', err.message);
    }
}
module.exports ={
    crearTablas,
    db
}