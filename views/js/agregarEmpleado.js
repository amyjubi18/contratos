document.getElementById('addEmployeeForm').addEventListener('submit', async (e) => {
    e.preventDefault();     const cedula = document.getElementById('cedula');
    const nombre_apellido = document.getElementById('nombre_apellido');
    const correo = document.getElementById('correo');
    const gerencia_id = document.getElementById('gerencia_id');
    const pto_cuenta = document.getElementById('pto_cuenta');
    const fecha_pto = document.getElementById('fecha_pto');
    const estado_civil = document.getElementById('estado_civil');
    const ocupacion = document.getElementById('ocupacion');
    const direccion = document.getElementById('direccion');
    const telefono = document.getElementById('telefono');
    const funciones = document.getElementById('funciones');
    const vigencia = document.getElementById('vigencia');
    const profesion = document.getElementById('profesion');
    const nacionalidad = document.getElementById('nacionalidad');

    const form ={
        cedula: cedula.value,
        nombre_apellido: nombre_apellido.value,
        correo: correo.value,
        gerencia_id: gerencia_id.value,
        pto_cuenta: pto_cuenta.value,
        fecha_pto: fecha_pto.value,
        estado_civil: estado_civil.value,
        ocupacion: ocupacion.value,
        direccion: direccion.value,
        telefono: telefono.value,
        funciones: funciones.value,
        vigencia: vigencia.value,
        profesion: profesion.value,
        nacionalidad: nacionalidad.value,
        

    };
    try {
        const response = await fetch('http://localhost:5600/empleados', {
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
            text: 'Empleado agregado exitosamente',
        });
        closeAddModal(); // Cerrar el modal
        verEmpleados(); // Actualizar la lista de empleados
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: `Error al guardar el registro: ${error.message}`,
        });
    }
    const cargarGerencias = async () => {
        try {
            const res = await fetch('http://localhost:5600/gerencias');
            if (!res.ok) {
                throw new Error('Error al cargar las gerencias');
            }
            const gerencias = await res.json();
    
            const selectGerencias = document.getElementById('gerencia_id');
            const lista = gerencias.map(item => {
                return `<option value="${item.id}">${item.gerencia}</option>`;
            });
    
            selectGerencias.innerHTML = lista.join('');
        } catch (error) {
            console.error(error);
            alert(`Error al cargar las gerencias: ${error.message}`);
        }
    };
    


});
cargarGerencias();
verEmpleados();
