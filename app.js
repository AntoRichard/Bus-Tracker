const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
const attribution = '&copy; <a href="www.openstreetmap.org/copyright"> ';
const tile_url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const mymap = L.map('Map').setView([0 , 0], 1 );
const tiles = L.tileLayer(tile_url, {attribution});
tiles.addTo(mymap); 

const bus_icon = L.icon({
    iconUrl: 'images/bus.png',
    iconSize: [40, 40],
    iconAnchor: [25, 60]
});
const bus_details = `<h2>BUS NO : 5A</h2>
                     <p style="font-weight : 50px;">Route : CMD - TBM</p>`;

const marker = L.marker([0, 0], {icon: bus_icon}).addTo(mymap);
marker.bindTooltip(bus_details).openTooltip();

let firstTime = true;

async function fetchData()
{
    const response = await fetch(api_url); 
    const data = await response.json();
    const { latitude, longitude } = data; 
    if(firstTime){
        mymap.setView([latitude, longitude],3);
        firstTime = false;
    }
    marker.setLatLng([latitude, longitude]);
    document.getElementById('lat').innerHTML = latitude;
    document.getElementById('lng').innerHTML = longitude;
}

fetchData();

setInterval(fetchData, 1000);
