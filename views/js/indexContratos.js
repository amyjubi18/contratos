// Función para agregar contrato con validación y envío
const agregarContrato = () => {
    const form = document.getElementById('form');
    const empleados_id = document.getElementById('empleados_id');
    const gerencia_id = document.getElementById('gerencia_id');
    const directivos_id = document.getElementById('directivos_id');

    if (!empleados_id || !gerencia_id || !directivos_id) {
        alert("Por favor, completa todos los campos obligatorios.");
        return false;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formulario = {
            empleados_id: empleados_id.value,
            gerencia_id: gerencia_id.value,
            directivos_id: directivos_id.value,
        };

        try {
            const res = await fetch('http://localhost:5600/contratos/', {
                method: "POST",
                body: JSON.stringify(formulario),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const body = await res.json();
            console.log('Respuesta al agregar contrato:', body);
            // Aquí puedes agregar notificaciones o lógica tras respuesta exitosa
        } catch (error) {
            console.error('Error al agregar contrato:', error);
        }
    });

    return true;
}

// Cargar empleados en el select
const cargarEmpleados = async () => {
    try {
        const res = await fetch('http://localhost:5600/empleados');
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        const empleados = await res.json();
        const select = document.getElementById('empleados_id');
        select.innerHTML = '<option value="">Seleccione un empleado</option>'; // opción por defecto
        empleados.forEach(empleado => {
            const option = document.createElement('option');
            option.value = empleado.id; // Asegúrate de que 'id' sea el campo correcto
            option.textContent = `${empleado.cedula} - ${empleado.nombre_apellido}`; // Asegúrate de que estos campos existan
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar empleados:', error);
    }
}

// Cargar directivos en el select
const cargarDirectivos = async () => {
    try {
        const res = await fetch('http://localhost:5600/directivos');
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        const directivos = await res.json();
        const select = document.getElementById('directivos_id');
        select.innerHTML = '<option value="">Seleccione un directivo</option>'; // opción por defecto
        directivos.forEach(directivo => {
            const option = document.createElement('option');
            option.value = directivo.id; // Asegúrate de que 'id' sea el campo correcto
            option.textContent = `${directivo.cedula_directivos} - ${directivo.nombre_directivo}`; // Asegúrate de que estos campos existan
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar directivos:', error);
    }
}
const inicializar = () => {
    cargarEmpleados();
    cargarDirectivos();

    // Agregar event listeners para cargar detalles al cambiar selección
    const empleadosSelect = document.getElementById('empleados_id');
    const directivosSelect = document.getElementById('directivos_id');

    if (empleadosSelect) {
        empleadosSelect.addEventListener('change', mostrarDetallesEmpleados);
    }

    if (directivosSelect) {
        directivosSelect.addEventListener('change', mostrarDetallesDirectivos);
    }

    // Inicializar el envío del formulario
    agregarContrato();
}

// Ejecutar inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializar);


// Función para generar el PDF
const generarPDF = async () => {
    const pdfContent = document.getElementById('pdf-content');
    const empleadoId = document.getElementById('empleados_id').value;
    const directivoId = document.getElementById('directivos_id').value;
    const contratado = document.getElementById('contratado').value;
    const gaceta = document.getElementById('gaceta').value;
    
    const proyecto = document.getElementById('proyecto').value;
    const funciones = document.getElementById('funciones').value;


    // Obtener datos del empleado
    const empleadoRes = await fetch(`http://localhost:5600/empleados/${empleadoId}`);
    if (!empleadoRes.ok) throw new Error(`Error al obtener empleado: ${empleadoRes.status}`);
    const empleado = await empleadoRes.json();

    // Obtener datos del directivo
    const directivoRes = await fetch(`http://localhost:5600/directivos/${directivoId}`);
    if (!directivoRes.ok) throw new Error(`Error al obtener directivo: ${directivoRes.status}`);
    const directivo = await directivoRes.json();

    // Llenar el contenido del PDF
    pdfContent.innerHTML = `
                <div  style="text-align: center;  padding-bottom: 10px; padding-top: -10px;">
                <img src="/views/img/cintillo_gobierno.png" alt="Logo" style="width: 1000px; height: auto; " />
                    <h1 style="font-weight: bold;">Contrato a Tiempo Determinado</h1>
                    <h2 style="font-weight: bold;">CTD. No. ${empleado.pto_cuenta}</h2>
                </div>
                </br>
                <div style="padding-left: 70px; padding-right: 70px;">
                <p style="text-align: justify;">Entre la <b>CORPORACIÓN PARA EL DESARROLLO CIENTÍFICO Y TECNOLÓGICO, CODECYT S.A, </b>empresa del Estado cuya creación fue autorizada mediante el Decreto No. 5.382 de fecha 12 de junio de 2007, publicado en la Gaceta Oficial de la República Bolivariana de Venezuela No. 38.703, de fecha 12 de junio de 2007, adscrita al Ministerio del Poder Popular para la Ciencia y Tecnología, según establece el artículo 6 del mismo Decreto, protocolizados sus Estatutos ante la Oficina de Registro Mercantil VII de esta Circunscripción Judicial, de fecha 28 de marzo de 2008, quedando anotados bajo el No. 44, Tomo 856-A-VII, cuyas últimas reformas se efectuaron ante el mencionado Registro en fecha 2 de noviembre de 2012, bajo el No. 9, Tomo 121-A MERCANTIL VII; publicado en la Gaceta Oficial de la República Bolivariana de Venezuela No. 40.080, de fecha 28 de diciembre de 2012 y en fecha 10 de abril de 2015, bajo el número 8, Tomo 65-A Registro Mercantil Séptimo, e inscrita en el Registro de Información Fiscal (R.I.F.) <span style="font-weight: bold;">No.G-20008400-6, </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  representado en este acto por su ${directivo.cargo} <b>${directivo.nombre_directivo}, </b> ${directivo.nacionalidad}, mayor de edad,${directivo.estado_civil}, de este domicilio y titular de la cédula de Identidad Nº <b>${directivo.cedula_directivos}, </b> <span text-align: justify; page-break-before: always;">${gaceta}</span> quien en lo adelante se denominará <span>CODECYT, S.A</span> por una parte, y por la otra, <span style="font-weight: bold;">${empleado.nombre_apellido},</span> ${empleado.nacionalidad}, mayor de edad, de este domicilio de estado civil ${empleado.estado_civil}, titular de la cédula de Identidad Nº <span style="font-weight: bold;">${empleado.cedula}</span> de profesion ${empleado.profesion}, quien en lo adelante se denominará <span style="font-weight: bold;" >${contratado}</span>  y en conjunto se denominarán <b>LAS PARTES,</b>  se ha convenido en suscribir el presente <b>Contrato de Trabajo a Tiempo Determinado,</b> de conformidad con el Punto de Cuenta ${empleado.pto_cuenta} de fecha <span style="font-weight: bold;" >${empleado.vigencia}, </span> &nbsp;con fundamento en lo previsto en el artículo 64 de la Ley Orgánica del Trabajo, Las Trabajadoras y Los Trabajadores (LOTTT)&nbsp;literal ”a”, <b>${proyecto}</b>, el cual se regirá por las cláusulas siguientes:</p>

               </div>
               <br>
               <div style="border: 1px solid black; text-align: center; font-size: 8px; ">
               <p style="">CONSULTORIA JURIDICA</p>
               <br>
               <p>Keyla Delgado  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maria Adela Rodriguez Abreu</p>
               <p>Inpreabogado No. 76.243  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Inpreabogado No. 38.354</p>
               <p>Abogado  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Consultora Jurídica(E)</p>
               </div>
                <div style="page-break-before: always;"><img src="/views/img/cintillo_gobierno.png" alt="Logo" style="width: 1000px; height: auto; padding-top: -10px;" /></div>
                
                <br>
                <div style="text-align: justify; padding-left: 70px; padding-right: 70px; ">
                <h1 style="font-weight: bold; text-align: center; text-decoratio: underline;">CONSIDERANDO</h1>
                <p >Que de acuerdo a lo previsto en el Artículo 24 del Decreto Nro. 1.424 con Rango, Valor y Fuerza de Ley Orgánica de la Administración Pública, se consagra el Principio de Cooperación, por lo que, los órganos y entes de la Administración Pública, colaborarán entre sí y con las otras ramas de los poderes públicos en la realización de los fines del Estado.</p>
                <br>
                <h1 style="font-weight: bold; text-align: center; ">DEL OBJETO DEL CONTRATO</h1>
                <p> <b style="">CLÁUSULA PRIMERA. </b> desempeñará actividades bajo la modalidad de contrato a tiempo determinado, adscrita  a Presidencia de la Corporación, comprometiéndose a prestar sus servicios personales, cumpliendo sin limitación, todos aquellos servicios y actividades inherentes, derivadas o relacionadas con el objeto del Contrato, observando en el desempeño de sus funciones las previsiones de la Ley, la costumbre, el uso local, la normativa y políticas de <b>CODECYT, S.A.</b></p>

                <p>${funciones}</p>
                <p syle="text-align: justify;"></p>
                <br>
               </div>
               <div style="page-break-before: always;"></div>
    `;
            const opt = {
                margin:     0,
                filename:     'contrato.pdf',
                image:        { type: 'jpeg', quality: 0.95 },
                html2canvas:  { scale: 2 },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
            };
    // Generar el PDF
    html2pdf()
        .from(pdfContent)
        .set(opt)
        .save();
};

// Agregar el evento al botón

// Agregar el evento al botón de descarga
document.querySelector('.preview-pdf-btn').addEventListener('click', generarPDF);
