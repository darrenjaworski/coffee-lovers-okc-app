'use strict';

angular.module('okcCoffee.map.map-directive', [])

.directive('mapLeaflet', ['mapData', function(mapData) {
  function link(scope, elm, attrs) {

    var zoom = 12;

    var cafeIcon = L.icon({
      iconUrl: './../../assets/images/ic_local_cafe_white_24dp_1x.png',
      iconRetinaUrl: './../../assets/images/ic_local_cafe_white_24dp_2x.png',
      iconSize: [12, 12],
      iconAnchor: [0, 0],
      popupAnchor: [0, 0]
    });

    var map = L.map('map', {
      center: new L.LatLng(35.467560, -97.516428),
      zoom: zoom,
      minZoom: zoom - 2,
      maxZoom: zoom + 6
    });

    var layer = new L.StamenTileLayer("toner");
    map.addLayer(layer);

    var layerGroups = {
      ids: {},
      all : new L.layerGroup(),
      expresso : new L.layerGroup(),
      drip : new L.layerGroup(),
      roaster : new L.layerGroup(),
      speciality : new L.layerGroup(),
      food : new L.layerGroup(),
      tea : new L.layerGroup(),
      study_hall : new L.layerGroup(),
      noisey : new L.layerGroup(),
      casual : new L.layerGroup(),
      hipster : new L.layerGroup(),
    };

    // populate map with markers and data
    mapData.getData().success( function(response){
      response.forEach( function(d){

        sortShop(d)
        var popup = '<h5>'+d['name']+'</h5><p>'+ d['location_street'] +'</p>';
        layerGroups.ids[d.id] = new L.marker( [ d['location_lat'], d['location_long'] ] ).bindPopup(popup);
        layerGroups.all.addLayer( layerGroups.ids[d.id] );
        map.addLayer(layerGroups.all);

      });
    });

    // center the map on the cafe from the view's controller message
    scope.$on("centerMap", function(event, message) {

      var options = {
        animate: true
      }
      var leafletID = layerGroups.ids[message + 1]._leaflet_id;
      var selectedMarker = layerGroups.all._layers[leafletID];
      map.addLayer( selectedMarker );
      map.setView( selectedMarker.getLatLng(), 16, options );
      selectedMarker.openPopup();

    });

    scope.$on('zoomMap', function(event) {
      map.setView( [35.467560, -97.516428], 12 );
    })

    scope.$on('resetMap', function(event) {

      removeLayers()
      map.addLayer(layerGroups.all);
    });

    scope.$on('filterMap', function(event, message){

      if (message == null) {
        return;
      }

      removeLayers();
      map.addLayer(layerGroups[message]);

    });

    // sort the shop into a layergroup based upon values from each shop
    // parameter is shop
    function sortShop(shop) {

      var popup = '<h5>'+shop['name']+'</h5><p>'+ shop['location_street'] +'</p>';
      var shopMarker = new L.marker( [ shop['location_lat'], shop['location_long'] ] ).bindPopup(popup);

      if (shop.expresso) {
        layerGroups.expresso.addLayer( shopMarker );
      }
      if (shop.drip) {
        layerGroups.drip.addLayer( shopMarker );
      }
      if (shop.roaster) {
        layerGroups.roaster.addLayer( shopMarker );
      }
      if (shop.speciality) {
        layerGroups.speciality.addLayer( shopMarker );
      }
      if (shop.food) {
        layerGroups.food.addLayer( shopMarker );
      }
      if (shop.tea) {
        layerGroups.tea.addLayer( shopMarker );
      }
      if (shop.study_hall) {
        layerGroups.study_hall.addLayer( shopMarker );
      }
      if (shop.noisey) {
        layerGroups.noisey.addLayer( shopMarker );
      }
      if (shop.casual) {
        layerGroups.casual.addLayer( shopMarker );
      }
      if (shop.hipster) {
        layerGroups.hipster.addLayer( shopMarker );
      }

    };

    // function to remove layers from map
    function removeLayers() {
      map.eachLayer(function(layer) {
        if (layer._tiles) {
          return;
        }
        map.removeLayer(layer);
      });
    };

  }

  return {
    link: link,
    restrict: 'E',
    replace: true
  }
}]);
