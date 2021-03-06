// vars for google maps API
var map;
var markers = [];
var infoWindows = [];
var myLatLng = {lat: 37.703383, lng: -122.472916};

// local data
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
    name: 'Century 20 Daly City',
    position: {lat: 37.702155, lng: -122.470354},
    foursquareID: '4a10653af964a520b8761fe3'
}
];

// markerData2 is for creating myViewModel.markers (an observable array), so when it get cleared, markerData remains for later use
var markerData2 = [];
var populateMarkerData2 = function() {
    for (var x in markerData) {
        markerData2.push(markerData[x]);
    }
};
populateMarkerData2();



// init Google Map API
function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        // because fitBounds is used later, these parameters are not necessary
        /*center: myLatLng,
        zoom: 17*/
    });
    map.fitBounds({ east: -122.470354,
                    north: 37.704003,
                    south: 37.702155,
                    west: -122.475802});

    // create markers and info windows
    for (var i = 0; i < markerData.length; i++) {
        // create marker
        var marker = new google.maps.Marker({
            position: markerData[i].position,
            map: map,
            title: markerData[i].name
        });

        // add info windows
        var contentString = "I'm sorry, the data can't be loaded now."; // this message will be displayed if later AJAX requests fail
        var infoWindow = new google.maps.InfoWindow({
            content: contentString
        });
        // use IIFE to deal with closure problem
        marker.addListener('click', (function(markerCopy, infoWindowCopy){
            return function() {
                closeInfoWindows();
                infoWindowCopy.open(map, markerCopy);
                toggleBounceOffAll();
                toggleBounceOn(markerCopy);
            };
        })(marker, infoWindow));

        // push marker into markers array
        markers.push(marker);
        // push infoWindow into infoWindows array
        infoWindows.push(infoWindow);
    }
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

// functions to toggle markers' BOUNCE animation
var toggleBounceOffAll = function() {
    for (var x in markers) {
        markers[x].setAnimation(null);
    }
};

var toggleBounceOn = function(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
};

// knockout view-model
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
        // close all info windows, toggle all bounce animation off
        closeInfoWindows();
        toggleBounceOffAll();

        for (var x in markerData) {
            if (markerData[x].name.toLowerCase().indexOf(value.name.toLowerCase()) >= 0) {
                //open info window and toggle bounce animation on for the clicked
                infoWindows[x].open(map, markers[x]);
                toggleBounceOn(markers[x]);
            }
        }
    }
};

ko.applyBindings(myViewModel);

myViewModel.searchValue.subscribe(myViewModel.search);

var alertCount = true;

// get foursquare data
for (var x in markerData) {

    var url = 'https://api.foursquare.com/v2/venues/' +
            markerData[x].foursquareID +
            '?client_id=FNMHOGTDEWE10PGKTEBDW5IYWTXLFJKJFH4G232RV3ZEVCVO' +
            '&client_secret=3PFR1W2WZYV5RAP3TSCCYUOXIE5CJSKJSPPFBJUXQDFKORH2' +
            '&v=20160105';

    $.getJSON(url, (function(xCopy){ // IIFE
        return function(data) {
            // use returned JSON here
            markerData[xCopy].foursquareData = data;
            var venue = data.response.venue;

            // create contentString
            var contentString0 = '<div><h4>' + venue.name + '</h4><h5>';
            var contentString2;
            if (venue.rating !== undefined) {
                contentString2 = '</h5><div><span>' + venue.location.formattedAddress[0] + '</span>, <span>' +
                    venue.location.formattedAddress[1] + '</span></div><br><div>Rating: <span>' + venue.rating +
                    '</span>/10 Based on <span>' + venue.ratingSignals + '</span> votes</div></div>';
            } else {
                contentString2 = '</h5><div><span>' + venue.location.formattedAddress[0] + '</span>, <span>' +
                    venue.location.formattedAddress[1] + '</span></div><br><div>Rating not available</div></div>';
            }
            var contentString1 = '';
            var categories = venue.categories;
            for (var i=0; i < categories.length; i++) {
                contentString1 += '<span>' + categories[i].name + '</span>, ';
            }
            // delete last two positions of contentString1
            contentString1 = contentString1.slice(0, -2);

            var contentString = contentString0 + contentString1 + contentString2;

            // change info windows' content
            infoWindows[xCopy].content = contentString;

        };
    })(x)).fail(function(){ // error handling
        if (alertCount === true) {
        alert("Sorry, some data can't be loaded now. Please try later.");
        alertCount = false; // make sure it only alert once
        }
    });

}

var googleError = function() {
    alert("Sorry, Google Maps API can't be loaded now. Please try later.");
    alertCount = false;
};