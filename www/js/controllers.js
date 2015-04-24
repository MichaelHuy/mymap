angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading, $timeout) {

    $scope.positions = [];

    $scope.$on('mapInitialized', function(event, map) {
        $scope.map = map;
    });

    $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      var currentPosition = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

      $scope.positions.push({lat: pos.coords.latitude,lng: pos.coords.longitude});

      $scope.map.setCenter(currentPosition);
        // $scope.map .. this exists after the map is initialized
      // To add the marker to the map, use the 'map' property
      var marker = new google.maps.Marker({
          position: currentPosition,
          map: $scope.map,
          title:"My position!"
      });

    marker.setPosition(currentPosition);
    marker.setMap($scope.map);
      $scope.loading.hide();


      var directionsDisplay = new google.maps.DirectionsRenderer();;
      var directionsService = new google.maps.DirectionsService();


      console.log($scope.map);
      directionsDisplay.setMap($scope.map);

      function calcRoute() {
        //var start = "10.78627,106.64538";
        var start = new google.maps.LatLng(10.78627, 106.64538);

        var request = {
          origin: start,
          destination: currentPosition,
          optimizeWaypoints: true,
          travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        directionsService.route(request, function(response, status) {
          console.log('route enter!');  
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);            
            console.log('status OK enter!');  
          }
        });
      }

      calcRoute();



    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };

  $scope.mapCreated = function(map) {
    $scope.map = map;
    $scope.centerOnMe();
  };


/*
// to load many marker
// $scope.map .. this exists after the map is initialized
var markers = [];
for (var i=0; i<8 ; i++) {
  markers[i] = new google.maps.Marker({
    title: "Hi marker " + i
  })
}
$scope.GenerateMapMarkers = function() {
  $scope.date = Date(); // Just to show that we are updating

  var numMarkers = Math.floor(Math.random() * 4) + 4;  // betwween 4 & 8 of them
  for (i = 0; i < numMarkers; i++) {
    var lat =   1.280095 + (Math.random()/100);
    var lng = 103.850949 + (Math.random()/100);
    // You need to set markers according to google api instruction
    // you don't need to learn ngMap, but you need to learn google map api v3
    // https://developers.google.com/maps/documentation/javascript/marker
    var latlng = new google.maps.LatLng(lat, lng);
    markers[i].setPosition(latlng);
    markers[i].setMap($scope.map)
  }      

  $timeout(function() {
    $scope.GenerateMapMarkers(); 
  }, 2000);  // update every 2 seconds
};  

$scope.GenerateMapMarkers(); 
*/
  
});
