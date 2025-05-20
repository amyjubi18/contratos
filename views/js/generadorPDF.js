// Evento para el botón de previsualización
document.querySelector('.preview-pdf-btn').addEventListener('click', () => {
    
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    const frame = document.querySelector('#frame');

    const img = new Image();
    img.src = '/views/img/prueba.jpg';

    img.onload = function() {
        pdf.addImage(img, 'JPG',10, 10, 190, 20);

        // Obtener valores del formulario
        const cedula = document.getElementById('cedula').value;
        const nombreApellido = document.getElementById('nombre_apellido').value;
        const ptoCuenta = document.getElementById('pto_cuenta').value;
        const fechaPto = document.getElementById('fecha_pto').value;
        const ocupacion = document.getElementById('ocupacion').value;
        const direccion = document.getElementById('direccion').value;
        const telefono = document.getElementById('telefono').value;
        const funciones = document.getElementById('funciones').value;
        const vigencia = document.getElementById('vigencia').value;
        const profesion = document.getElementById('profesion').value;
        const nacionalidad = document.getElementById('nacionalidad').value;
        const estadoCivil = document.getElementById('estado_civil').value;
        const correo = document.getElementById('correo').value;
        const gerencia = document.getElementById('gerencia').value;
        const cedulaDirectivos = document.getElementById('cedula_directivos').value;
        const nombreDirectivo = document.getElementById('nombre_directivo').value;
        const cargo = document.getElementById('cargo').value;
        const gaceta = document.getElementById('gaceta').value;

        // Párrafo largo
        const parrafoLargo = `empresa del Estado cuya creación fue autorizada mediante el Decreto No. 5.382 de fecha 12 de  junio de 2007, publicado en la Gaceta Oficial de la República Bolivariana de Venezuela No. 38.703, de fecha 12 de junio de 2007, adscrita al Ministerio del Poder Popular para la Ciencia y Tecnología, según establece el artículo 6 del mismo Decreto, protocolizados sus Estatutos ante la Oficina de Registro Mercantil VII de esta Circunscripción Judicial, de fecha 28 de marzo de 2008, quedando anotados bajo el No. 44, Tomo 856-A-VII, cuyas últimas reformas se efectuaron ante el mencionado Registro en fecha 2 de noviembre de 2012, bajo el No. 9, Tomo 121-A MERCANTIL VII; publicado en la Gaceta Oficial de la República Bolivariana de Venezuela No. 40.080, de fecha 28 de diciembre de 2012 y en fecha 10 de abril de 2015, bajo el número 8, Tomo 65-A Registro Mercantil Séptimo, e inscrita en el Registro de Información Fiscal (R.I.F) No. G-20008400-6, representado en este acto por su  `;

        // Dividir párrafo largo para ajustar ancho
        const lines = pdf.splitTextToSize(parrafoLargo, 275);

        // Añadir textos para previsualización
        pdf.setFontSize(12);
        pdf.setFont("arial", "bold");
        pdf.text('Contrato a Tiempo Determinado', 76, 40);
        pdf.setFontSize(12);
        pdf.setFont("arial", "bold");
        pdf.text('CTD. No. ', 87, 45);
        pdf.text(`${ptoCuenta}`, 105, 45);

        pdf.setFontSize(12);
        pdf.setFont("arial", "normal");

        pdf.text('Entre la', 13, 55);
        pdf.setFontSize(12);
        pdf.setFont("arial", "bold");
        pdf.text('CORPORACIÓN PARA EL DESARROLLO CIENTÍFICO Y TECNOLÓGICO, CODECYT ', 28, 55, 'justify');
        pdf.text('S.A, ', 13, 60, 'justify');
        pdf.setFontSize(12);
        pdf.setFont("arial", "normal");
        pdf.text('empresa del Estado cuya creación fue autorizada mediante el Decreto No. 5.382 de fecha 12 de junio', 22, 60, 'justify');
        pdf.text('2007, publicado en la Gaceta Oficial de la República Bolivariana de Venezuela No. 38.703, de fecha 12 de ', 13, 65, 'justify');
        pdf.text('junio de 2007, adscrita al Ministerio del Poder Popular para la Ciencia y Tecnología, según establece el artículo', 13, 70, 'justify');
        pdf.text('6 del mismo Decreto, protocolizados sus Estatutos ante la Oficina de Registro Mercantil VII de esta Circunscripción,', 13, 75, 'justify');

        pdf.setFontSize(12);
        pdf.setFont("arial", "normal");
        pdf.text(`${cargo}`, 68, 104.5);
        pdf.setFontSize(12);
        pdf.setFont("arial", "bold");
        pdf.text(`${nombreDirectivo}`, 121, 104.5);

        // Mostrar el PDF en el iframe en la misma página
        const pdfData = pdf.output('bloburl');
        frame.src = pdfData;
        

        /* const pdfData = pdf.output('bloburl');
        frame.src = pdfData;
        window.open(pdfData, '_blank');
        return; */
    };
});

// Evento para el envío del formulario que genera el PDF y previene el envío tradicional
document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();
    // Si quieres que también se genere el PDF al enviar el formulario, puedes llamar a la función del botón aquí
    document.querySelector('.preview-pdf-btn').click();
});

