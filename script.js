// Cargar los datos de transportistas desde el archivo JSON
async function cargarDatos() {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
}

// Filtrar los transportistas según la búsqueda
function filtrarTransportistas(transportistas, carga_lugar, carga_pais, descarga_lugar, descarga_pais) {
    return transportistas.filter(transportista => {
        return transportista.Carga_Lugar.toLowerCase().includes(carga_lugar.toLowerCase()) &&
            transportista.Carga_Pais.toLowerCase().includes(carga_pais.toLowerCase()) &&
            transportista.Descarga_Lugar.toLowerCase().includes(descarga_lugar.toLowerCase()) &&
            transportista.Descarga_Pais.toLowerCase().includes(descarga_pais.toLowerCase());
    });
}

// Mostrar los resultados en la página
function mostrarResultados(resultados) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = ''; // Limpiar resultados anteriores

    if (resultados.length === 0) {
        resultadosDiv.innerHTML = '<p>No se encontraron transportistas que coincidan con los criterios.</p>';
        return;
    }

    const listaResultados = document.createElement('ul');
    resultados.forEach(transportista => {
        const li = document.createElement('li');
        li.textContent = `${transportista.Transportista} - Carga: ${transportista.Carga_Lugar}, ${transportista.Carga_Pais} | Descarga: ${transportista.Descarga_Lugar}, ${transportista.Descarga_Pais}`;
        listaResultados.appendChild(li);
    });
    resultadosDiv.appendChild(listaResultados);
}

// Manejar la búsqueda
document.getElementById('formBusqueda').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    const carga_lugar = document.getElementById('carga_lugar').value;
    const carga_pais = document.getElementById('carga_pais').value;
    const descarga_lugar = document.getElementById('descarga_lugar').value;
    const descarga_pais = document.getElementById('descarga_pais').value;

    const transportistas = await cargarDatos();
    const resultados = filtrarTransportistas(transportistas, carga_lugar, carga_pais, descarga_lugar, descarga_pais);
    mostrarResultados(resultados);
});
