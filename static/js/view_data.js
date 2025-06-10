document.addEventListener('DOMContentLoaded', function () {
    const dep_select = document.getElementById('departamentos');
    

    if (dep_select.value == 'dep') {
        vista_1()
    }



})

function vista_1() {
    fetch('/data-paciente/')
        .then(response => response.json())
        .then(data => {
            let total_data = data?.length
            mostrarMapa(data, total_data);
        })
}

function vista_2(id_dep) {
    let x = 3
}

function mostrarMapa(data, total) {
    const div_map = document.getElementById('map');
    if (div_map) {
        const dt = agrupar(data);
        let map = L.map('map').setView([4.5709, -74.2973], 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const ht = []
        const cal_data = Object.keys(dt)?.map(key => {
            let item = dt[key]
            item?.map(e => {

                ht.push([e?.latitud?.replace(",","."), e?.longitud?.replace(",","."), item?.length / total])
            })
            const heat = L.heatLayer(ht, {
                radius: 25,
                blur: 15,
                maxZoom: 17,
            }).addTo(map);
        })
        console.log(ht)
    }

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