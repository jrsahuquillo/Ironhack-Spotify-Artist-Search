$(document).ready(function(){

  // GET DATA OnClick
    $('form').on('submit', function(){
      event.preventDefault();
      getArtists();
    });

    $('.js-image-result').on('click', function(){
      var name = $(event.target).closest('li').find('.artist_name').text();
      getAlbums(name);
    });

    $('.js-album-result').on('click', function(){
      var name = $(event.target).closest('li').find('.album_name').text();
      $('#myModal').modal('show');
      getTracks(name);
    });
    $('.track_name').on('click', function(){
      var name = $(event.target).closest('li').find('.album_name').text();
      console.log("test");
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

  console.log(response);

  var artistsArray = response.artists.items;
  console.log(artistsArray);
  $('.js-image-result').empty();
  $('.js-album-result').empty();
  artistsArray.forEach(function(artist){
    var img = artist.images[0].url;
    $('.js-image-result').append();
    var html = "<li>" +"<img class='album_picture' src =" + img + " />" + "<span class='artist_name'>" + artist.name + "</span>" + " </li><br>";
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
  console.log(response);

  var albumsArray = response.albums.items;
  console.log(albumsArray);
  $('.js-album-result').empty();
  albumsArray.forEach(function(album){
    var html = "<li>" + "<a class='album_name'>" + album.name + "</a>" + " </li>";
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
  console.log(response);

  var tracksArray = response.tracks.items;
  console.log(tracksArray);
  $('.js-tracks-result').empty();
  tracksArray.forEach(function(track){
    var html = "<li>" + '<a href=" '+ track.preview_url +' " target="_blank" class="track_name">' + track.name + "</a>" + " </li>";
    $('.js-tracks-result').append(html);
  });
}

function handleError (error) {
  console.log("Error!");
  console.log(error.responseText);
}
