document.addEventListener('DOMContentLoaded', function () { // funcion nativa de javascript que se ejecuta cuando el DOM esta cargado
    const dep_select = document.getElementById('departamentos');
    const bt_consultar = document.getElementById('consulta')


    if (dep_select.value == 'dep') { // si el valor del select es 'dep' significa que no se ha seleccionado un departamento
        vista_1() 
    }

    if (bt_consultar) { 
        bt_consultar.addEventListener('click', function () {// funcion que se ejecuta cuando se hace click en el boton consultar
            if (dep_select.value == 'dep') {
                Swal.fire({
                    title: 'Seleccione un departamento',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar'
                })
            } else {
                vista_2(dep_select.value)
            }
        })
    }


})

function vista_1() { // funcion que se ejecuta cuando no se ha seleccionado un departamento
    fetch('/data-paciente/')
        .then(response => response.json())
        .then(data => {
            let total_data = data?.length // si no hay datos, total_data sera 0
            mostrarMapa(data, total_data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            Swal.fire({
                title: 'Error al cargar los datos',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        });
}

async function vista_2(id_dep) { // funcion que se ejecuta cuando se ha seleccionado un departamento
    const muncp = await getMunicipios(id_dep) // obtiene los municipios del departamento seleccionado
    fetch(`/data-paciente/?dep=${id_dep}`) // Realiza una solicitud GET a la ruta '/data-paciente/?dep={id_dep}'
        .then(response => response.json()) // Convierte la respuesta a formato JSON
        .then(data => { // Procesa los datos recibidos
            let total_data = data?.length // si no hay datos, total_data sera 0
            if (total_data > 0) {
                const gr = document.getElementById('graphs') // graphs es el id del div que contiene los graficos
                if (gr) {
                    gr.classList.remove('ocultar') // si el div existe, se le quita la clase ocultar
                    gr.classList.add('mostrar')
                }
                mostrarMapa(data, total_data);
                garficaClasificacion(data, muncp)
                garficaEstrato(data, muncp)
                garficaSexo(data, muncp)

            } else {
                Swal.fire({
                    title: 'No hay datos para el departamento seleccionado',
                    icon: 'info',
                    confirmButtonText: 'Aceptar'
                })
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            Swal.fire({
                title: 'Error al cargar los datos',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        });
}

function garficaClasificacion(data, muncp) {
    const div_clas = document.getElementById('clasificacion')
    const chart = echarts.init(div_clas)
    const legend = ['Dengue clasico sin signos de alarma', 'dengue clasico con signos de alarma', 'dengue grave']
    let dt = agrupar(data)

    let dr_series = []

    for (let i = 1; i <= 3; i++) {
        let aux = {
            name: legend[i - 1],
            type: 'bar',
            stack: 'total',
            data: muncp?.map(m => {
                let item = dt[m?.id]?.filter(e => parseInt(e?.clasificacion) === i)
                return item?.length || 0
            })
        }
        dr_series.push(aux)
    }

    console.log(dr_series)


    let option = {
        title: {
            text: 'Clasificación de tipo de dengue por municipio',
            top: 10
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        // toolbox: {
        //     show: true,
        //     orient: 'vertical',
        //     left: 'right',
        //     top: 'center',
        //     feature: {
        //         mark: { show: true },
        //         dataView: { show: true, readOnly: false },
        //         magicType: { show: true, type: ['line', 'bar', 'stack'] },
        //         restore: { show: true },
        //         saveAsImage: { show: true }
        //     }
        // },
        legend: {
            data: legend,
            top: 40
        },
        grid: {
            top: 80
        },
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                data: muncp?.map(m => m?.nombre_municipio),
                axisLabel: {
                    rotate: 90
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: dr_series

    }

    chart.setOption(option)

}

function garficaEstrato(data, muncp) {
    const div_clas = document.getElementById('estrato')
    const chart = echarts.init(div_clas)
    const legend = ["1", "2", "3", "4", "5", "6"]
    let dt = agrupar(data)

    let dr_series = []

    for (let i = 1; i <= 6; i++) {
        let aux = {
            name: legend[i - 1],
            type: 'bar',
            data: muncp?.map(m => {
                let item = dt[m?.id]?.filter(e => parseInt(e?.estrato) === i)
                return item?.length || 0
            })
        }
        dr_series.push(aux)
    }

    console.log(dr_series)


    let option = {
        title: {
            text: 'Clasificación por estrato',
            top: 10
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        // toolbox: {
        //     show: true,
        //     orient: 'vertical',
        //     left: 'right',
        //     top: 'center',
        //     feature: {
        //         mark: { show: true },
        //         dataView: { show: true, readOnly: false },
        //         magicType: { show: true, type: ['line', 'bar', 'stack'] },
        //         restore: { show: true },
        //         saveAsImage: { show: true }
        //     }
        // },
        legend: {
            data: legend,
            top: 40
        },
        grid: {
            top: 80
        },
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                data: muncp?.map(m => m?.nombre_municipio),
                axisLabel: {
                    rotate: 90
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: dr_series

    }

    chart.setOption(option)

}

function garficaSexo(data, muncp) { 
    const div_clas = document.getElementById('sexo') 
    const chart = echarts.init(div_clas) // echarts es una libreria de graficos
    const legend = ["M", "F"]
    let dt = agrupar(data) // agrupa los datos por municipio

    let dr_series = []

    for (let i = 1; i <= 2; i++) {
        let aux = {
            name: legend[i - 1],
            type: 'bar',
            stack: 'total',
            data: muncp?.map(m => { // m es el municipio
                // filtra los datos por sexo y municipio
                let item = dt[m?.id]?.filter(e => e?.sexo === legend[i - 1]) // e es el item del municipio
                return item?.length || 0
            })
        }
        dr_series.push(aux) //push meter datos dentro del array
    }

    console.log(dr_series)


    let option = { // carga las opciones del grafico
        title: {
            text: 'Sexo', 
            top: 10
        },
        tooltip: { // carga las opciones del tooltip
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        // toolbox: {
        //     show: true,
        //     orient: 'vertical',
        //     left: 'right',
        //     top: 'center',
        //     feature: {
        //         mark: { show: true },
        //         dataView: { show: true, readOnly: false },
        //         magicType: { show: true, type: ['line', 'bar', 'stack'] },
        //         restore: { show: true },
        //         saveAsImage: { show: true }
        //     }
        // },
        legend: {
            data: ['M', 'F'],
            top: 40
        },
        grid: {
            top: 80 
        },
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                data: muncp?.map(m => m?.nombre_municipio),
                axisLabel: {
                    rotate: 90
                }
            }
        ],
        yAxis: [ 
            {
                type: 'value' 
            }
        ],
        series: dr_series

    }

    chart.setOption(option) // establece las opciones del grafico

}


let map; // Variable cambiante global para el mapa
function mostrarMapa(data, total) {
    const div_map = document.getElementById('map');

    if (div_map) { // Verifica si el div del mapa existe

        if (map) {
            map.remove()
        }

        const dt = agrupar(data); // Agrupa los datos por municipio
        map = L.map('map').setView([4.5709, -74.2973], 6); // Inicializa el mapa centrado en Colombia
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { // Carga las capas de OpenStreetMap por medio de la url
            attribution: '&copy; OpenStreetMap contributors' 
        }).addTo(map); 

        const ht = [] // Array para almacenar las coordenadas y el peso de cada punto
        const cal_data = Object.keys(dt)?.map(key => { //  Itera sobre las claves del objeto agrupado .map recorremos el array y devulve como si fuera una nueva
            let item = dt[key]
            item?.map(e => {

                ht.push([e?.latitud?.replace(",", "."), e?.longitud?.replace(",", "."), item?.length / total]) // Agrega las coordenadas y el peso al array ht
            })
            const heat = L.heatLayer(ht, { // Crea una capa de calor con las coordenadas y el peso
                radius: 25,
                blur: 15,
                maxZoom: 17,
            }).addTo(map); // Agrega la capa de calor al mapa
        })
    }

}

async function getMunicipios(id_dep) { // funcion que obtiene los municipios de un departamento
    const response = await fetch(`/municipios/${id_dep}`); // Realiza una solicitud GET a la ruta '/municipios/{id_dep}'
    const data = await response.json() 
    return data
}

function agrupar(data) { // funcion que agrupa los datos por municipio
    const agrupado = data?.reduce((acc, item) => { // reduce es una funcion que itera sobre un array y devuelve un objeto
        const key = item.municipio;
        if (!acc[key]) { // si el objeto no tiene la clave del municipio, la crea
            acc[key] = [];
        }
        acc[key].push(item); // agrega el item al array del municipio correspondiente
        return acc; // devuelve el objeto acumulador
    }, {});
    return agrupado
}