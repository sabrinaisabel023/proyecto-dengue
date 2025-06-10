
document.addEventListener('DOMContentLoaded', function() {

    const dep_select = document.getElementById('departamentos');

    if (dep_select) {
        fetch('/departamentos')
            .then(response => response.json())
            .then(data => {
                data.forEach(dep => {
                    const option = document.createElement('option');
                    option.value = dep.id;
                    option.textContent = dep.nombre_departamento;
                    dep_select.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching departments:', error));
    }

})