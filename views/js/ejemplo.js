document.querySelector('.preview-pdf-btn').addEventListener('click', async function() {
    const empleadoId = document.getElementById('empleados_id').value;
    const directivoId = document.getElementById('directivos_id').value;
    const tipoCiudadano = document.getElementById('tipo_ciudadano').value; 
    const contratado = document.getElementById('contratado').value;



    // Verifica que se haya seleccionado un empleado y un directivo
    if (!empleadoId || !directivoId) {
        alert("Por favor, selecciona un empleado y un directivo.");
        return;
    }

    try {
        // Obtener datos del empleado
        const empleadoRes = await fetch(`http://localhost:5600/empleados/${empleadoId}`);
        if (!empleadoRes.ok) throw new Error(`Error al obtener empleado: ${empleadoRes.status}`);
        const empleado = await empleadoRes.json();

        // Obtener datos del directivo
        const directivoRes = await fetch(`http://localhost:5600/directivos/${directivoId}`);
        if (!directivoRes.ok) throw new Error(`Error al obtener directivo: ${directivoRes.status}`);
        const directivo = await directivoRes.json();

        // Crea un nuevo objeto de imagen
        const img = new Image();
        img.src = "/views/img/cintillo_gobierno.png"; // Cambia a la ruta correcta

        img.onload = async () => {
            // Actualiza el contenido del PDF con los datos obtenidos
            const element = document.getElementById('pdf-content');
            element.classList.remove('hidden'); // Asegúrate de que el contenido sea visible
            //element.innerHTML = `prueba`;
   
            // Establece el contenido del PDF
            element.innerHTML = `
                <div style="">
                <img src="${img.src}" alt="Cintillo Gobierno" style="width: 100%; height: auto;">
                </br>
                <h1 style="text-align: center; font-weight: bold;">Contrato a Tiempo Determinado</h1>
                <h1 style="text-align: center; font-weight: bold;">CTD. No. ${empleado.pto_cuenta}</h1>
                </br>
                <p style="text-align: justify;">Entre la <b>CORPORACIÓN PARA EL DESARROLLO CIENTÍFICO Y TECNOLÓGICO, CODECYT S.A, </b>empresa del Estado cuya creación fue autorizada mediante el Decreto No. 5.382 de fecha 12 de junio de 2007, publicado en la Gaceta Oficial de la República Bolivariana de Venezuela No. 38.703, de fecha 12 de junio de 2007, adscrita al Ministerio del Poder Popular para la Ciencia y Tecnología, según establece el artículo 6 del mismo Decreto, protocolizados sus Estatutos ante la Oficina de Registro Mercantil VII de esta Circunscripción Judicial, de fecha 28 de marzo de 2008, quedando anotados bajo el No. 44, Tomo 856-A-VII, cuyas últimas reformas se efectuaron ante el mencionado Registro en fecha 2 de noviembre de 2012, bajo el No. 9, Tomo 121-A MERCANTIL VII; publicado en la Gaceta Oficial de la República Bolivariana de Venezuela No. 40.080, de fecha 28 de diciembre de 2012 y en fecha 10 de abril de 2015, bajo el número 8, Tomo 65-A Registro Mercantil Séptimo, e inscrita en el Registro de Información Fiscal (R.I.F.) 
                <b> No.G-20008400-6,</b> representado en este acto por su ${directivo.cargo} <b>${directivo.nombre_directivo} </b> <span text-align: justify; page-break-before: always;">${document.getElementById('gaceta').value}</span> quien en lo adelante se denominará <span>CODECYT, S.A</span> por una parte, y por la otra, , <span style="font-weight: bold;">${empleado.nombre_apellido},</span> ${empleado.nacionalidad}, mayor de edad, de este domicilio de estado civil ${empleado.estado_civil}, titular de la cédula de Identidad Nº <span style="font-weight: bold;">${empleado.cedula}</span> de profesion ${empleado.profesion}, quien en lo adelante se denominará <span style="font-weight: bold;" >${contratado}</span>  y en conjunto se denominarán LAS PARTES, se ha convenido en suscribir el presente Contrato de Trabajo a Tiempo Determinado, de conformidad con el Punto de Cuenta <span style="font-weight: bold;" >${empleado.pto_cuenta}</span> de fecha <span style="font-weight: bold;" >${empleado.vigencia},</span> con fundamento en lo previsto en el artículo 64 de la Ley Orgánica del Trabajo, Las Trabajadoras y Los Trabajadores (LOTTT)literal ”a”, ${document.getElementById('proyecto').value}, el cual se regirá por las cláusulas siguientes:</p>
               </div>
                <!-- Agrega más campos según sea necesario -->
            `;

            const opt = {
                margin:     1,
                filename:     'contrato.pdf',
                image:        { type: 'jpeg', quality: 0.95 },
                html2canvas:  { scale: 2 },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
                //pagebreak: { mode: ['avoid-all', 'css', 'letter']}
            };

            // Genera el PDF
            html2pdf().from(element).set(opt).save().then(() => {
                console.log('PDF generado correctamente.');
            }).catch(err => {
                console.error('Error al generar el PDF:', err);
            });
        };

        img.onerror = () => {
            console.error('Error al cargar la imagen.');
            alert("No se pudo cargar la imagen. Verifica la ruta.");
        };

    } catch (error) {
        console.error('Error al obtener datos:', error);
        alert("Ocurrió un error al obtener los datos. Revisa la consola para más detalles.");
    }
});


