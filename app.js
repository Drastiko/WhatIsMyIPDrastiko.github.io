document.addEventListener('DOMContentLoaded', function () {
    const botonIp = document.getElementById("btn-primary");
    botonIp.addEventListener("click", function () {
        fetch('https://api.ipify.org?format=json')
            .then(respuesta => respuesta.json())
            .then(dato => {
                const ipPrivada = dato.ip;
                let direccionPrivada = document.getElementById("direccion-privada");
                direccionPrivada.textContent = `Ip privada real: ${ipPrivada}`;
            })
            .catch(error => {
                console.error("Error al obtener la dirección IP privada: ", error);
                let direccionPrivada = document.getElementById("direccion-privada");
                direccionPrivada.textContent = "Error al obtener la dirección IP privada.";
            });
        const ipPublica = window.location.hostname;
        let direccionPublica = document.getElementById("direccion-publica");
        direccionPublica.textContent = `Ip publica real: ${ipPublica}`;
        const ubicacionLabel = document.getElementById("ubicacion");
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (posicion) {
                const latitud = posicion.coords.latitude;
                const longitud = posicion.coords.longitude;
                ubicacionLabel.textContent = `Ubicación: ${latitud}, ${longitud}`;
                mapboxgl.accessToken = 'pk.eyJ1IjoiZHJheG1lbmkiLCJhIjoiY2xtNml2aGJwM3JvbDNwcGdrOWxxOGk2aCJ9.0ARzSUtOBne80cgTx7CQkg'; // Reemplaza 'your-access-token' con tu token de acceso real
                const mapa = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [longitud, latitud],
                    zoom: 12,
                });
                new mapboxgl.Marker()
                    .setLngLat([longitud, latitud])
                    .addTo(mapa);

            }, function (error) {
                console.error("Error al obtener la ubicación: " + error.message);
                ubicacionLabel.textContent = "Ubicación: Desconocida";
            });
        } else {
            ubicacionLabel.textContent = "La geolocalización no está disponible en este navegador.";
        }
    });
});



