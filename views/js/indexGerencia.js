const url = 'http://localhost:5600/gerencias/';
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
        const response = await fetch(`http://localhost:5600/gerencias/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.ok) {
            verGerencias(); // Actualiza la lista después de eliminar
            Swal.fire({
                icon: 'success',
                title: 'Eliminado!',
                text: 'La gerencia ha sido eliminada correctamente.'
            });
        } else {
            const error = await response.json();
            console.error('Error al eliminar:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'No se pudo eliminar la gerencia.'
            });
        }
    }
}

const editElement = async (id) => {
    console.log(`Editando gerencia con ID: ${id}`);
    const response = await fetch(`http://localhost:5600/gerencias/${id}`);
    
    if (response.ok) {
        const geren = await response.json();
        console.log('Datos de gerencia obtenidos:', geren); // Verifica que los datos sean correctos

        document.getElementById('id').value = geren.id;
        document.getElementById('gerencia_edit').value = geren.gerencia || '';
        document.getElementById('editModal').style.display = 'block'; // Muestra el modal
    } else {
        console.error('Error al obtener el gerencia:', await response.json());
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'No se pudo obtener los datos de la gerencia.',
        });
    }
}


// Agregar el evento submit al formulario de edición
document.getElementById('editForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    const id = document.getElementById('id').value;
    const gerencia = document.getElementById('gerencia_edit').value;

    const gerenciaData = {
        gerencia
    };

    try {
        const response = await fetch(`http://localhost:5600/gerencias/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gerenciaData),
        });

        if (response.ok) {
            closeEditModal(); // Cierra el modal
            verGerencias(); // Actualiza la lista de gerencias
            Swal.fire({
                icon: 'success',
                title: 'Actualizado!',
                text: 'La gerencia ha sido actualizada correctamente.',
            });
        } else {
            const error = await response.json();
            console.error('Error al actualizar el gerencia:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'No se pudo actualizar la gerencia.',
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


const verGerencias = () => {
    fetch(url)
        .then(res => {
            console.log('Respuesta de la API:', res); // Agrega este log
            return res.json();
        })
        .then(result => {
            console.log('Datos de gerencia:', result); // Agrega este log
            table.innerHTML = ''; // Limpiar el table antes de agregar nuevos registros
            result.forEach(element => {
                const { id, gerencia } = element;

                const fila = document.createElement('tr');
                fila.className = 'transition duration-300 ease-in-out hover:bg-gray-50 hover:shadow-md cursor-pointer';
                fila.innerHTML += /*html*/ `
                    <td class="px-6 py-4  text-sm font-semibold text-gray-900">${gerencia}</td>
                    <td class="px-6 py-4  text-sm font-semibold text-gray-900"><button class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onclick="editElement(${id})"><i class="fa-solid fa-pen-to-square" style="color: #ffffff; margin-right: 5px;"></i>Editar</button>
                    <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onclick="deleteElement(${id})"><i class="fa-solid fa-trash" style="color: #ffffff; margin-right: 5px;"></i>Eliminar</button></td>
                `;
                table.appendChild(fila);
            });
        })
        .catch(error => {
            console.error('Error al obtener los gerencias:', error);
        });
}

const openModal = async (id) => {
    const response = await fetch(`http://localhost:5600/gerencias/${id}`);
    const empleado = await response.json();

    if (response.ok) {
        // Asignar los valores a los elementos del modal
        document.getElementById('modal-gerencia').innerText = empleado.gerencia || 'No disponible';
        document.getElementById('modal').style.display = 'block'; // Muestra el modal
    } else {
        console.error('Error al obtener el empleado:', empleado.error);
    }
}

const closeModal = () => {
    document.getElementById('modal').style.display = 'none'; // Oculta el modal
}
document.addEventListener('DOMContentLoaded', () => {
    verGerencias();
});



const openAddModal = () => {
    // Limpiar los campos del formulario
    document.getElementById('gerencia').value = '';
    // Mostrar el modal
    document.getElementById('addModal').style.display = 'block';
}
const closeAddModal = () => {
    document.getElementById('addModal').style.display = 'none';
}


