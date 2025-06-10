document.addEventListener('DOMContentLoaded', function () {
    const dep_select = document.getElementById('departamentos');
    const bt_consultar = document.getElementById('consulta')


    if (dep_select.value == 'dep') {
        vista_1()
    }

    if (bt_consultar) {
        bt_consultar.addEventListener('click', function () {
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

function vista_1() {
    fetch('/data-paciente/')
        .then(response => response.json())
        .then(data => {
            let total_data = data?.length
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

async function vista_2(id_dep) {
    const muncp = await getMunicipios(id_dep)
    fetch(`/data-paciente/?dep=${id_dep}`)
        .then(response => response.json())
        .then(data => {
            let total_data = data?.length
            if (total_data > 0) {
                const gr = document.getElementById('graphs')
                if (gr) {
                    gr.classList.remove('ocultar')
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
    const chart = echarts.init(div_clas)
    const legend = ["M", "F"]
    let dt = agrupar(data)

    let dr_series = []

    for (let i = 1; i <= 2; i++) {
        let aux = {
            name: legend[i - 1],
            type: 'bar',
            stack: 'total',
            data: muncp?.map(m => {
                let item = dt[m?.id]?.filter(e => e?.sexo === legend[i - 1])
                return item?.length || 0
            })
        }
        dr_series.push(aux)
    }

    console.log(dr_series)


    let option = {
        title: {
            text: 'Sexo',
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

    chart.setOption(option)

}


let map;
function mostrarMapa(data, total) {
    const div_map = document.getElementById('map');
    if (div_map) {

        if (map) {
            map.remove()
        }

        const dt = agrupar(data);
        map = L.map('map').setView([4.5709, -74.2973], 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const ht = []
        const cal_data = Object.keys(dt)?.map(key => {
            let item = dt[key]
            item?.map(e => {

                ht.push([e?.latitud?.replace(",", "."), e?.longitud?.replace(",", "."), item?.length / total])
            })
            const heat = L.heatLayer(ht, {
                radius: 25,
                blur: 15,
                maxZoom: 17,
            }).addTo(map);
        })
    }

}

async function getMunicipios(id_dep) {
    const response = await fetch(`/municipios/${id_dep}`);
    const data = await response.json()
    return data
}

function agrupar(data) {
    const agrupado = data?.reduce((acc, item) => {
        const key = item.municipio;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {});
    return agrupado
}