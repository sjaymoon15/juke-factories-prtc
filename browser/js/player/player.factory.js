'use strict';

juke.factory('PlayerFactory', function($rootScope){
  var factoryObj = {
  	playing: false,
  	currentSong: null,
  	songList: null,
  	progress: 0
  };

  factoryObj.start = function(song, songList){

  	if(!songList){
			factoryObj.pause();
	  	factoryObj.currentSong = song;
	  	audio.src = song.audioUrl;
	  	audio.load();
	    audio.play();
	  	factoryObj.playing = true;
  	}
  	factoryObj.songList = songList;
  	factoryObj.pause();
  	factoryObj.currentSong = song;
  	audio.src = song.audioUrl;
  	audio.load();
    audio.play();
  	factoryObj.playing = true;
  }

  factoryObj.pause = function(){
  	audio.pause();
  	factoryObj.playing = false;
  }

  factoryObj.resume = function(){
  	audio.play();
  	factoryObj.playing = true;
  }
  
  factoryObj.isPlaying = function(){
  	return factoryObj.playing;
  }
  
  factoryObj.getCurrentSong = function(){
  	return factoryObj.currentSong;
  }
  
  factoryObj.next = function(){
  	if(factoryObj.songList.indexOf(factoryObj.currentSong) !== factoryObj.songList.length - 1){
  		factoryObj.start(factoryObj.songList[factoryObj.songList.indexOf(factoryObj.currentSong)+1], factoryObj.songList);
  	}
  	factoryObj.start(factoryObj.songList[0]);
  }

  factoryObj.previous = function(){
  	if(factoryObj.songList.indexOf(factoryObj.currentSong) !== 0){
  		factoryObj.start(factoryObj.songList[factoryObj.songList.indexOf(factoryObj.currentSong)-1], factoryObj.songList);
  	}
  	factoryObj.start(factoryObj.songList[factoryObj.songList.length - 1]);
  }

  factoryObj.getProgress = function(){
  	return factoryObj.progress;
  }

  var audio = document.createElement('audio');
	audio.addEventListener('ended', function () {
    factoryObj.next();
    $rootScope.$evalAsync(); // likely best, schedules digest if none happening
 	});
	  audio.addEventListener('timeupdate', function () {
    factoryObj.progress = audio.currentTime / audio.duration;
    $rootScope.$evalAsync(); // likely best, schedules digest if none happening
  });


  return factoryObj;
});
