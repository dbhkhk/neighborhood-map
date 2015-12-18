var map;
var markers = [];
function initMap(){
    var myLatLng = {lat: 37.7030587, lng: -122.4739745};

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 17
    });
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
    });
}