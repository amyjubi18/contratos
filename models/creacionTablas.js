import { createClient } from "@libsql/client";

// Configuración de la base de datos utilizando variables de entorno
export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_API_KEY,
});

// Creación de las tablas
export async function crearTablas() {
  try {
    await turso.execute(`
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
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS gerencias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        gerencia VARCHAR(255) NOT NULL,
        fecha_creacion DATE NOT NULL DEFAULT CURRENT_DATE
      );
    `);
    await turso.execute(`
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
    await turso.execute(`
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
  } catch (err) {
    console.error('Error al crear las tablas:', err.message);
  }
}
