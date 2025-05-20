const url = 'http://localhost:5600/directivos/';
const table = document.getElementById('table');

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
        const response = await fetch(`http://localhost:5600/directivos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.ok) {
            verDirectivos(); // Actualiza la lista después de eliminar
            Swal.fire({
                icon: 'success',
                title: 'Eliminado!',
                text: 'El directivo ha sido eliminado correctamente.'
            });
        } else {
            const error = await response.json();
            console.error('Error al eliminar:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'No se pudo eliminar el directivo.',
            });
        }
    }
}


const editElement = async (id) => {
    console.log(`Editando directivo con ID: ${id}`);
    const response = await fetch(`http://localhost:5600/directivos/${id}`);
    
    if (response.ok) {
        const dire = await response.json();
        console.log('Datos de directivos obtenidos:', dire); // Verifica que los datos sean correctos
        document.getElementById('id').value = dire.id;
        document.getElementById('cedula_edit').value = dire.cedula_directivos || '';
        document.getElementById('nombre_edit').value = dire.nombre_directivo || '';
        document.getElementById('cargo_edit').value = dire.cargo || '';
        document.getElementById('estado_civil_edit').value = dire.estado_civil || '';
        document.getElementById('nacionalidad_edit').value = dire.nacionalidad || '';
        document.getElementById('editModal').style.display = 'block'; // Muestra el modal
    } else {
        console.error('Error al obtener el directivo:', await response.json());
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'No se pudo obtener los datos del directivo.',
        });

    }
}


// Agregar el evento submit al formulario de edición
document.getElementById('editForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    const id = document.getElementById('id').value;
    const cedula_directivos = document.getElementById('cedula_edit').value;
    const nombre_directivo = document.getElementById('nombre_edit').value;
    const cargo = document.getElementById('cargo_edit').value;
    const estado_civil = document.getElementById('estado_civil_edit').value;
    const nacionalidad = document.getElementById('nacionalidad_edit').value;

    const directivoData = {
        cedula_directivos,
        nombre_directivo,
        cargo,
        estado_civil,
        nacionalidad
    };

    try {
        const response = await fetch(`http://localhost:5600/directivos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(directivoData),
        });
    if (response.ok) {
        closeEditModal(); // Cierra el modal
        verDirectivos(); // Actualiza la lista de gerencias
        Swal.fire({
            icon: 'success',
            title: 'Actualizado!',
            text: 'El directivo ha sido actualizado correctamente.',
        });
    } else {
        const error = await response.json();
        console.error('Error al actualizar el directivo:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'No se pudo actualizar el directivo.',
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


const verDirectivos = () => {
    fetch(url)
        .then(res => {
            console.log('Respuesta de la API:', res); // Agrega este log
            return res.json();
        })
        .then(result => {
            console.log('Datos de directivo:', result); // Agrega este log
            table.innerHTML = ''; // Limpiar el table antes de agregar nuevos registros
            result.forEach(element => {
                const { id, cedula_directivos, nombre_directivo, cargo, estado_civil, nacionalidad } = element;

                const fila = document.createElement('tr');
                fila.className = 'transition duration-300 ease-in-out hover:bg-gray-50 hover:shadow-md cursor-pointer';
                fila.innerHTML += /*html*/ `
                    <td class="px-6 py-4  text-sm font-semibold text-gray-900">${cedula_directivos}</td>
                    <td class="px-6 py-4  text-sm font-semibold text-gray-900">${nombre_directivo}</td>
                    <td class="px-6 py-4  text-sm font-semibold text-gray-900">${cargo}</td>
                    <td class="px-6 py-4  text-sm font-semibold text-gray-900">${estado_civil}</td>
                    <td class="px-6 py-4  text-sm font-semibold text-gray-900">${nacionalidad}</td>
                    <td class="px-6 py-4  text-sm font-semibold text-gray-900"><button class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onclick="editElement(${id})"><i class="fa-solid fa-pen-to-square" style="color: #ffffff; margin-right: 5px;"></i>Editar</button>
                    <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onclick="deleteElement(${id})"><i class="fa-solid fa-trash" style="color: #ffffff; margin-right: 5px;"></i>Eliminar</button></td>
                `;
                table.appendChild(fila);
            });
        })
        .catch(error => {
            console.error('Error al obtener los directivos:', error);
        });
}

const openModal = async (id) => {
    const response = await fetch(`http://localhost:5600/directivos/${id}`);
    const directivo = await response.json();

    if (response.ok) {
        // Asignar los valores a los elementos del modal
        document.getElementById('modal-gerencia').innerText = directivo.gerencia || 'No disponible';
        document.getElementById('modal').style.display = 'block'; // Muestra el modal
    } else {
        console.error('Error al obtener el directivo:', directivo.error);
    }
}

const closeModal = () => {
    document.getElementById('modal').style.display = 'none'; // Oculta el modal
}
document.addEventListener('DOMContentLoaded', () => {
    verDirectivos();
});



const openAddModal = () => {
    // Limpiar los campos del formulario
    document.getElementById('cedula_directivos').value = '';
    document.getElementById('nombre_directivo').value = '';
    document.getElementById('cargo').value = '';
    document.getElementById('estado_civil').value = '';
    document.getElementById('nacionalidad').value = '';

    // Mostrar el modal
    document.getElementById('addModal').style.display = 'block';
}
const closeAddModal = () => {
    document.getElementById('addModal').style.display = 'none';
}


