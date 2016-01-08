var map;
var markers = [];
var infoWindows = [];
var myLatLng = {lat: 37.703383, lng: -122.472916};
var markerData = [
{
    name: 'Boulevard Cafe',
    position: {lat: 37.704003, lng: -122.475030},
    foursquareID: '49e9de32f964a52006661fe3'
},
{
    name: '76',
    position: {lat: 37.703646, lng: -122.475802},
    foursquareID: '4b74e8e7f964a520b6f72de3'
},
{
    name: 'Kome Buffet',
    position: {lat: 37.702610, lng: -122.470373},
    foursquareID: '4b2d94d3f964a52031d924e3'
},
{
    name: 'Westlake Coffee Shop',
    position: {lat: 37.702359, lng: -122.470520},
    foursquareID: '531288f7498e077a666756fe'
},
{
    name: 'Century 20 Daly City and XD',
    position: {lat: 37.702155, lng: -122.470354},
    foursquareID: '4a10653af964a520b8761fe3'
}
];
var markerData2 = [];
var populateMarkerData2 = function() {
    for (var x in markerData) {
        markerData2.push(markerData[x]);
    }
};
populateMarkerData2();

// get foursquare data
for (var x in markerData) {

    var url = 'https://api.foursquare.com/v2/venues/' +
            markerData[x].foursquareID +
            '?client_id=FNMHOGTDEWE10PGKTEBDW5IYWTXLFJKJFH4G232RV3ZEVCVO' +
            '&client_secret=3PFR1W2WZYV5RAP3TSCCYUOXIE5CJSKJSPPFBJUXQDFKORH2' +
            '&v=20160105';

    $.getJSON(url, function(data){
        console.log(data);
        // IIFE
        (function(xCopy){markerData[xCopy].foursquareData = data;})(x);
        

    }).error(function(){

        console.log(markerData[x].name + ' getJSON error');

    });

}

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
        var venue = markerData[i].foursquareData.response.venue;
        var contentString = '<div><h3>' + venue.name +
        '</h3><div><span>Diner</span>, <span>Cafe</span>, <span>American Restaurant</span></div><div><span>' +
        venue.location.formattedAddress[0] + '</span><span>' + venue.location.formattedAddress[1] +
        '</span></div><div>Rating: <span>' + venue.rating + '</span>/10 Based on <span>' + venue.ratingSignals + 
        '</span> votes</div></div>';
        var infoWindow = new google.maps.InfoWindow({
            content: contentString
        });
        // use IIFE to deal with closure problem
        marker.addListener('click', (function(markerCopy){
            return function() {
                closeInfoWindows();
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

// function to close all info windows
var closeInfoWindows = function() {
    for (var x in infoWindows) {
        infoWindows[x].close();
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
    },
    listClick: function(value) {
        // close all info windows
        closeInfoWindows();
        for (var x in markerData) {
            if (markerData[x].name.toLowerCase().indexOf(value.name.toLowerCase()) >= 0) {
                infoWindows[x].open(map, markers[x]);
            }
        }
    }
};

ko.applyBindings(myViewModel);

myViewModel.searchValue.subscribe(myViewModel.search);