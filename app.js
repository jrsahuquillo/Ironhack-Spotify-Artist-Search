$(document).ready(function(){

  // GET ARTISTS DATA
    $('form').on('submit', function(){
      event.preventDefault();
      getArtists();
    });

    $('.js-image-result').on('click', function(){
      var name = $(event.target).closest('li').find('.artist_name').text();
      getAlbums(name);
    });

    $('.js-album-result').on('click', function(){
      console.log('objeto target:');
      var name = $(event.target).closest('li').find('.album_name').text();
      console.log('hola' + name);
      $('#myModal').modal('show');
      getTracks(name);
    });

});

function getArtists(){
  $.ajax({
    type:"GET",
    url:"https://api.spotify.com/v1/search?type=artist&query="+$('#name').val(),
    success: showArtists,
    error: handleError
  });
}

function showArtists (response){
  console.log("Success!");
  console.log(response);

  var artistsArray = response.artists.items;
  console.log(artistsArray);
  $('.js-image-result').empty();
  $('.js-album-result').empty();
  artistsArray.forEach(function(artist){
    var img = artist.images[0].url;
    $('.js-image-result').append();
    var html = "<li>" +"<img src =" + img + " />" + "<span class='artist_name'>" + artist.name + "</span>" + " </li><br>";
    $('.js-search-result').append(html);
  });
}

function getAlbums(name){
  // $('.js-album-result').empty();
  $.ajax({
    type:"GET",
    url:"https://api.spotify.com/v1/search?type=album&query="+name,
    success: showAlbums,
    error: handleError
  });
}

function showAlbums (response){
  console.log("Success!");
  console.log(response);

  var albumsArray = response.albums.items;
  console.log(albumsArray);
  console.log("albumsArray!");
  $('.js-album-result').empty();
  albumsArray.forEach(function(album){
    var html = "<li>" + "<span class='album_name'>" + album.name + "</span>" + " </li>";
    $('.js-album-result').append(html);
  });
}

function getTracks(name){
  // $('.js-album-result').empty();
  $.ajax({
    type:"GET",
    url:"https://api.spotify.com/v1/search?type=track&query="+name,
    success: showTracks,
    error: handleError
  });
}

function showTracks (response){
  console.log("Success!");
  console.log(response);

  var tracksArray = response.tracks.items;
  console.log(tracksArray);
  console.log("tracksArray!");
  $('.js-tracks-result').empty();
  tracksArray.forEach(function(track){
    var html = "<li>" + "<span class='track_name'>" + track.name + "</span>" + " </li>";
    $('.js-tracks-result').append(html);
  });
}

function handleError (error) {
  console.log("Error!");
  console.log(error.responseText);
}
