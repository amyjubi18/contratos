document.getElementById('addEmployeeForm').addEventListener('submit', async (e) => {
    e.preventDefault();     
    const gerencia = document.getElementById('gerencia');


    const form ={
        gerencia: gerencia.value,


    };
    try {
        const response = await fetch('http://localhost:5600/gerencias', {
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
            text: 'Gerencia agregada exitosamente',
        });
        closeAddModal(); // Cerrar el modal
        verGerencias(); // Actualizar la lista de empleados
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: `Error al guardar el registro: ${error.message}`,
        });
    }

    


});
verGerencias();
