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

function ViewModel() {
    // data
    var self = this;
    self.markers = ko.observableArray(markerData);
    self.searchValue = ko.observable('');
};

ko.applyBindings(new ViewModel());