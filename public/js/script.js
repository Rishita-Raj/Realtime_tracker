const socket = io();


if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("send-location", { latitude, longitude });
        },
        (error) => {
            console.error("Geolocation error:", error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
} else {
    alert("Geolocation is not supported by your browser.");
}


const map = L.map("map").setView([0, 0], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "RishitaRaj",
}).addTo(map);


const markers = {};


socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;

    // Update map view to latest position
    map.setView([latitude, longitude]);

    // If marker already exists for this ID, update its location
    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        // Otherwise, create a new marker
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
});


socket.on("user-disconnected", (id) =>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
} );