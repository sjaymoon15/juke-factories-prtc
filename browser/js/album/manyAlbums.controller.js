'use strict';

juke.controller("manyAlbumCtrl", function($scope, $http, $log, AlbumFactory){

	AlbumFactory.fetchAll()
  .then(function(albums){
  	// console.log(albums);
  	albums.map(function(album){
  		album.imageUrl = '/api/albums/' + album.id + '/image';
  		AlbumFactory.fetchById(album.id)
  		.then(function(res){
  			album.songs = res.songs;
  		})
  	})
  	$scope.albums = albums;
  	console.log($scope.albums);
  })
  .catch($log.error); 
  
})