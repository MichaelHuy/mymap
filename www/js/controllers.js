angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading, $timeout) {

    $scope.positions = [];

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
      var myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

      $scope.positions.push({lat: pos.coords.latitude,lng: pos.coords.longitude});
      $scope.lat = pos.coords.latitude;
      $scope.lon = pos.coords.longitude;
      $scope.$apply();

      $scope.map.setCenter(myLatlng);
        // $scope.map .. this exists after the map is initialized
      // To add the marker to the map, use the 'map' property
      var marker = new google.maps.Marker({
          position: myLatlng,
          map: $scope.map,
          title:"My position!"
      });

    marker.setPosition(myLatlng);
    marker.setMap($scope.map);


      $scope.loading.hide();
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
