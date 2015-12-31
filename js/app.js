var map;
var markers = [];
var infoWindows = [];
var myLatLng = {lat: 37.703383, lng: -122.472916};
var markerData = [
{
    name: 'Boulevard Cafe',
    position: {lat: 37.704003, lng: -122.475030}
},
{
    name: '76',
    position: {lat: 37.703646, lng: -122.475802}
},
{
    name: 'Kome Buffet',
    position: {lat: 37.702610, lng: -122.470373}
},
{
    name: 'Subway',
    position: {lat: 37.701400, lng: -122.470252}
},
{
    name: 'Westlake Coffee Shop',
    position: {lat: 37.702359, lng: -122.470520}
},
{
    name: 'Century 20 Daly City and XD',
    position: {lat: 37.702155, lng: -122.470354}
}
];
var markerData2 = [];
var populateMarkerData2 = function() {
    for (var x in markerData) {
        markerData2.push(markerData[x]);
    }
};
populateMarkerData2();

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 17
    });

    for (var i = 0; i < markerData.length; i++) {
        // create marker
        var marker = new google.maps.Marker({
            position: markerData[i].position,
            map: map,
            title: markerData[i].name
        });

        // add info window
        var contentString = '<div>Hello</div>';
        var infoWindow = new google.maps.InfoWindow({
            content: contentString
        });
        // use IIFE to deal with closure problem
        marker.addListener('click', (function(markerCopy){
            return function() {
                infoWindow.open(map, markerCopy);
            };
        })(marker));

        // push every marker into markers array
        markers.push(marker);
        infoWindows.push(infoWindow);
    };
}

// functions to toggle marker's visibility
var toggleOff = function(marker) {
    marker.setMap(null);
};

var toggleOn = function(marker) {
    marker.setMap(map);
};

var toggleOffAll = function() {
    for (var x in markers) {
        markers[x].setMap(null);
    }
};

var myViewModel = {
    // data
    markers: ko.observableArray(markerData2),
    searchValue: ko.observable(''),

    // operations
    search: function(value) {
        //remove all the current markers, which removes them from the view
        myViewModel.markers.removeAll();
        toggleOffAll();

        for (var x in markerData) {
            if (markerData[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                myViewModel.markers.push(markerData[x]);
                toggleOn(markers[x]);
            }
        }
    }
};

ko.applyBindings(myViewModel);

myViewModel.searchValue.subscribe(myViewModel.search);