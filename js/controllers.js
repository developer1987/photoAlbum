'use strict';

/* Controllers */
var photoAlbumApp = angular.module('photoAlbumApp', ['ngRoute', 'ngResource', 'ngAnimate']);

/* Config */
photoAlbumApp.config([
  '$routeProvider', '$locationProvider',
  function($routeProvide, $locationProvider){
    $routeProvide
        .when('/',{
          templateUrl:'template/home.html',
          controller:'PhotoListCtrl'
        })
        .when('/about',{
          templateUrl:'template/about.html',
          controller:'AboutCtrl'
        })
        .when('/contact',{
          templateUrl:'template/contact.html',
          controller:'ContactCtrl'
        })
        .when('/photos/:photoId', {
          templateUrl:'template/photo-detail.html',
          controller:'PhotoDetailCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
  }
]);

/* Factory */
photoAlbumApp.factory('Photo', [
  '$resource', function($resource) {
    return $resource('photos/:photoId.:format', {
      photoId: 'photos',
      format: 'json',
      apiKey: 'someKeyThis'
      /* http://localhost:8888/photos/photos.json?apiKey=someKeyThis */
    }, {
      // action: {method: <?>, params: <?>, isArray: <?>, ...}
      update: {method: 'PUT', params: {photoId: '@photo'}, isArray: true}
    });
    //Photo.update(params, successcb, errorcb);
  }
]);

/* Filter */
photoAlbumApp.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  }
});

photoAlbumApp.controller('PhotoListCtrl',[
  '$scope','$http', '$location', 'Photo',
  function($scope, $http, $location, Photo) {

    Photo.query({photoId: 'photos'}, function(data) {
      $scope.photos = data;
    });
    //Photo.query(params, successcb, errorcb)
    //Photo.get(params, successcb, errorcb)
    //Photo.save(params, payloadData, successcb, errorcb)
    //Photo.delete(params, successcb, errorcb)
  }
]);

/* About Controller */
photoAlbumApp.controller('AboutCtrl',[
  '$scope','$http', '$location',
  function($scope, $http, $location) {

  }
]);

/* Contact Controller */
photoAlbumApp.controller('ContactCtrl',[
  '$scope','$http', '$location',
  function($scope, $http, $location) {

  }
]);

/* Photo Detail Controller */
photoAlbumApp.controller('PhotoDetailCtrl',[
  '$scope','$http', '$location', '$routeParams', 'Photo',
  function($scope, $http, $location, $routeParams, Photo) {
    $scope.photoId = $routeParams.photoId;

    Photo.get({photoId: $routeParams.photoId}, function(data) {
      $scope.photo = data;
      $scope.mainImageUrl = data.images[0];
      //data.$save();
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }

  }
]);


