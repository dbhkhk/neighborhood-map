var map;
var markers = [];
var myLatLng = {lat: 37.703383, lng: -122.472916};
var markerData = [
{
    name: 'Boulevard Cafe',
    position: {lat: 37.704003, lng: -122.475030},
    ifDisplay: true
},
{
    name: '76',
    position: {lat: 37.703646, lng: -122.475802},
    ifDisplay: true
},
{
    name: 'Kome Buffet',
    position: {lat: 37.702610, lng: -122.470373},
    ifDisplay: true
},
{
    name: 'Subway',
    position: {lat: 37.701400, lng: -122.470252},
    ifDisplay: true
},
{
    name: 'Westlake Coffee Shop',
    position: {lat: 37.702359, lng: -122.470520},
    ifDisplay: true
},
{
    name: 'Century 20 Daly City and XD',
    position: {lat: 37.702155, lng: -122.470354},
    ifDisplay: true
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
        var marker = new google.maps.Marker({
            position: markerData[i].position,
            map: map,
            title: markerData[i].name
        });
        markers.push(marker);
    };
}

// function to toggle marker's visibility

var myViewModel = {
    // data
    markers: ko.observableArray(markerData2),
    searchValue: ko.observable(''),

    // operations
    search: function(value) {
        //remove all the current markers, which removes them from the view
        myViewModel.markers.removeAll();

        // toggleAllOff();

        for (var x in markerData) {
            console.log(markerData[x].name.toLowerCase());
            if (markerData[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                myViewModel.markers.push(markerData[x]);
            }
        }
    }
};

ko.applyBindings(myViewModel);

myViewModel.searchValue.subscribe(myViewModel.search);