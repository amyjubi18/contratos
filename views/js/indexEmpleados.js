const url = 'http://localhost:5600/empleados/';
const grid = document.getElementById('grid');


const deleteElement = async (id) => {
    // Muestra la alerta de confirmación
    const result = await Swal.fire({
        icon: 'warning',
        title: '¿Está seguro que quiere eliminar?',
        text: '',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar"
    });

    // Si el usuario confirma, procede a eliminar
    if (result.isConfirmed) {
        const response = await fetch(`http://localhost:5600/empleados/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.ok) {
            verEmpleados(); // Actualiza la lista después de eliminar
            Swal.fire({
                icon: 'success',
                title: 'Eliminado!',
                text: 'El empleado ha sido eliminado correctamente.'
            });
        } else {
            const error = await response.json();
            console.error('Error al eliminar:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'No se pudo eliminar el empleado.',
            });
        }
    }
}

const editElement = async (id) => {
    const response = await fetch(`http://localhost:5600/empleados/${id}`);
    const empleado = await response.json();
    console.log('Empleado:', empleado);

    if (response.ok) {
        // Llenar los campos del formulario con los datos del empleado
        document.getElementById('id').value = empleado.id;
        document.getElementById('cedula_edit').value = empleado.cedula || '';
        document.getElementById('nombre_apellido_edit').value = empleado.nombre_apellido || '';
        document.getElementById('correo_edit').value = empleado.correo || '';
        document.getElementById('telefono_edit').value = empleado.telefono || '';
        document.getElementById('direccion_edit').value = empleado.direccion || '';
        document.getElementById('ocupacion_edit').value = empleado.ocupacion || '';
        document.getElementById('estado_civil_edit').value = empleado.estado_civil || '';
        document.getElementById('nacionalidad_edit').value = empleado.nacionalidad || '';
        document.getElementById('pto_cuenta_edit').value = empleado.pto_cuenta || '';
        document.getElementById('fecha_pto_edit').value = empleado.fecha_pto || '';
        //document.getElementById('gerencia_id_edit').value = empleado.gerencia_id || '';
        document.getElementById('profesion_edit').value = empleado.profesion || '';
        document.getElementById('vigencia_edit').value = empleado.vigencia || '';
        document.getElementById('funciones_edit').value = empleado.funciones || '';
// Asignar el valor de gerencia_id al select de gerencias
        const selectGerenciasEdit = document.getElementById('gerencia_id_edit');
        selectGerenciasEdit.value = empleado.gerencia_id || '';
        // Mostrar el modal
        console.log('Mostrando modal para:', empleado.gerencia);

        document.getElementById('editModal').style.display = 'block';
    } else {
        console.error('Error al obtener el empleado:', empleado.error);
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'No se pudo obtener los datos del empleado.',
        });
    }
}

// Agregar el evento submit al formulario de edición
document.getElementById('editForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    const id = document.getElementById('id').value;
    const cedula = document.getElementById('cedula_edit').value;
    const nombre_apellido = document.getElementById('nombre_apellido_edit').value;
    const correo = document.getElementById('correo_edit').value;
    const telefono = document.getElementById('telefono_edit').value;
    const direccion = document.getElementById('direccion_edit').value;
    const nacionalidad = document.getElementById('nacionalidad_edit').value;
    const estado_civil = document.getElementById('estado_civil_edit').value;
    const gerencia_id = document.getElementById('gerencia_id_edit').value;
    const pto_cuenta = document.getElementById('pto_cuenta_edit').value;
    const fecha_pto = document.getElementById('fecha_pto_edit').value;
    const profesion = document.getElementById('profesion_edit').value;
    const ocupacion = document.getElementById('ocupacion_edit').value;
    const funciones = document.getElementById('funciones_edit').value;
    const vigencia = document.getElementById('vigencia_edit').value;

    const empleadoData = {
        cedula,
        nombre_apellido,
        correo,
        telefono,
        direccion,
        nacionalidad,
        estado_civil,
        gerencia_id,
        pto_cuenta,
        fecha_pto,
        profesion,
        ocupacion,
        funciones,
        vigencia
    };

    try {
        const response = await fetch(`http://localhost:5600/empleados/${id}`, {
            method: 'PUT', // Asegúrate de usar el método correcto
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empleadoData),
        });

        if (response.ok) {
            closeEditModal(); // Cierra el modal
            verEmpleados(); // Actualiza la lista de empleados
            Swal.fire({
                icon: 'success',
                title: 'Actualizado!',
                text: 'El empleado  ha sido actualizado correctamente.',
            });
        } else {
            const error = await response.json();
            console.error('Error al actualizar el empleado:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'No se pudo actualizar el empleado.',
            });
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Ocurrió un error en la solicitud.',
        });
    }
});

const closeEditModal = () => {
    document.getElementById('editModal').style.display = 'none'; // Oculta el modal
}

const verEmpleados = () => {
    fetch(url)
        .then(res => {
            console.log('Respuesta de la API:', res); // Agrega este log
            return res.json();
        })
        .then(result => {
            console.log('Datos de empleados:', result); // Agrega este log
            grid.innerHTML = ''; // Limpiar el grid antes de agregar nuevos registros
            result.forEach(element => {
                const { id, cedula, nombre_apellido, gerencia, pto_cuenta } = element;

                const card = document.createElement('div');
                card.className = 'bg-white shadow-md rounded-lg p-4 px-6 flex flex-col items-center';
                card.innerHTML += /*html*/ `
                    <img src="/views/img/user.png" alt="Avatar de ${nombre_apellido}" class="rounded-full mb-4">

                    <p class="text-lg "><strong class="text-blue-800">Cédula:</strong> ${cedula}</p>
                    <p class="text-sm text-left"><strong class="text-blue-800">Nombre y Apellido:</strong> ${nombre_apellido}</p>
                    <p class="text-sm"><strong class="text-blue-800">Gerencia:</strong> ${gerencia}</p>
                    <p class="text-sm"><strong class="text-blue-800">Punto de Cuenta :</strong> ${pto_cuenta}</p>
                    <div class="mt-4 flex space-x-2">
                        <button onclick="openModal(${id})" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"><i class="fa-solid fa-eye" style="color: #ffffff; margin-right: 5px;"></i>Visualizar</button>
                        <button class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onclick="editElement(${id})"><i class="fa-solid fa-pen-to-square" style="color: #ffffff; margin-right: 5px;"></i>Editar</button>
                        <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onclick="deleteElement(${id})"><i class="fa-solid fa-trash" style="color: #ffffff; margin-right: 5px;"></i>Eliminar</button>
                    </div>
                `;
                grid.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error al obtener los empleados:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Ocurrió un error en la solicitud.',
            });
        });
}




const cargarGerencias = async () => {
    const res = await fetch('http://localhost:5600/gerencias');
    const gerencias = await res.json();

    // Llenar el select para agregar
    const selectGerenciasAdd = document.getElementById('gerencia_id');
    const listaAdd = gerencias.map(gerencia => {
        return `<option value="${gerencia.id}">${gerencia.gerencia}</option>`;
    });
    selectGerenciasAdd.innerHTML = listaAdd.join('');

    // Llenar el select para editar
    const selectGerenciasEdit = document.getElementById('gerencia_id_edit');
    const listaEdit = gerencias.map(gerencia => {
        return `<option value="${gerencia.id}">${gerencia.gerencia}</option>`;
    });
    selectGerenciasEdit.innerHTML = listaEdit.join('');
}

document.addEventListener('DOMContentLoaded', () => {
    verEmpleados();
    cargarGerencias(); // Cargar gerencias para ambos modales
});

const openModal = async (id) => {
    const response = await fetch(`http://localhost:5600/empleados/${id}`);
    const empleado = await response.json();

    if (response.ok) {
        // Asignar los valores a los elementos del modal
        document.getElementById('modal-name').innerText = empleado.nombre_apellido || 'No disponible';
        document.getElementById('modal-cedula').innerText = empleado.cedula || 'No disponible';
        document.getElementById('modal-profesion').innerText = empleado.profesion || 'No disponible';
        document.getElementById('modal-nacionalidad').innerText = empleado.nacionalidad || 'No disponible';
        document.getElementById('modal-estado-civil').innerText = empleado.estado_civil || 'No disponible';
        document.getElementById('modal-telefono').innerText = empleado.telefono || 'No disponible';
        document.getElementById('modal-correo').innerText = empleado.correo || 'No disponible';
        document.getElementById('modal-direccion').innerText = empleado.direccion || 'No disponible';
        
        // Asegúrate de que el campo de gerencia esté correctamente asignado
        document.getElementById('modal-gerencia').innerText = empleado.gerencia ;

        document.getElementById('modal-pto').innerText = empleado.pto_cuenta || 'No disponible';
        document.getElementById('modal-fecha-pto').innerText = empleado.fecha_pto || 'No disponible';
        document.getElementById('modal-ocupacion').innerText = empleado.ocupacion || 'No disponible';
        document.getElementById('modal-funciones').innerText = empleado.funciones || 'No disponible';
        document.getElementById('modal-vigencia').innerText = empleado.vigencia || 'No disponible';

        console.log('Mostrando modal para:', empleado.nombre_apellido);
        document.getElementById('modal').style.display = 'block'; // Muestra el modal
    } else {
        console.error('Error al obtener el empleado:', empleado.error);
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Ocurrió un error en la solicitud.',
        });
    }
}

const closeModal = () => {
    document.getElementById('modal').style.display = 'none'; // Oculta el modal
}

const openAddModal = () => {
    // Limpiar los campos del formulario
    document.getElementById('cedula').value = '';
    document.getElementById('nombre_apellido').value = '';
    document.getElementById('correo').value = '';
    document.getElementById('gerencia_id').value = '';
    document.getElementById('pto_cuenta').value = '';
    document.getElementById('fecha_pto').value = '';
    document.getElementById('estado_civil').value = '';
    document.getElementById('ocupacion').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('funciones').value = '';
    document.getElementById('vigencia').value = '';
    document.getElementById('profesion').value = '';
    document.getElementById('nacionalidad').value = ''; 

    // Mostrar el modal
    document.getElementById('addModal').style.display = 'block';
}
const closeAddModal = () => {
    document.getElementById('addModal').style.display = 'none';
}


