var mymap = L.map('mapid').setView([41.14961, -8.61099], 5);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiaHJzY29ycmVpYSIsImEiOiJjangxMm44bjEwNTJkM3lxZm1rd3Y3amJ2In0.tY-buwU89a-B_sI2QKuAwQ'
}).addTo(mymap);

var x = document.getElementById("loc");

function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation nao suportada pelo browser";
    }
}

function showPosition(position) {

    document.getElementById("latitude").value = position.coords.latitude;
    document.getElementById("longitude").value = position.coords.longitude;
    
    var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap);
}
