
document.addEventListener('DOMContentLoaded', function() { // funcion nativa de javascript que se ejecuta cuando el DOM esta cargado
    // Selecciona el elemento select con id 'departamentos'

    const dep_select = document.getElementById('departamentos');

    if (dep_select) {
        fetch('/departamentos') // Realiza una solicitud GET a la ruta '/departamentos'
            .then(response => response.json()) // Convierte la respuesta a formato JSON
            .then(data => { // Procesa los datos recibidos
                data.forEach(dep => { // Itera sobre cada departamento recibido
                    const option = document.createElement('option');
                    option.value = dep.id;
                    option.textContent = dep.nombre_departamento;
                    dep_select.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching departments:', error));
    }

})