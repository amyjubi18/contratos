document.getElementById('addEmployeeForm').addEventListener('submit', async (e) => {
    e.preventDefault();     
    const cedula_directivos = document.getElementById('cedula_directivos').value;
    const nombre_directivo = document.getElementById('nombre_directivo').value;
    const cargo = document.getElementById('cargo').value;
    const estado_civil = document.getElementById('estado_civil').value;
    const nacionalidad = document.getElementById('nacionalidad').value;



    const form = {
        cedula_directivos,
        nombre_directivo,
        cargo,
        estado_civil,
        nacionalidad
    };

    try {
        const response = await fetch('http://localhost:5600/directivos', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorBody = await response.text();
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `Error al guardar el registro: ${errorBody}`,
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'Éxito!',
            text: 'Directivo agregado exitosamente',
        });
        closeAddModal(); // Cerrar el modal
        verDirectivos(); // Actualizar la lista de empleados
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: `Error al guardar el registro: ${error.message}`,
        });
    }
});
verDirectivos();