$(document).ready(function(){

  // GET ARTISTS DATA
    $('form').on('submit', function(){
      event.preventDefault();
      getArtists();
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
  artistsArray.forEach(function(artist){
    var html = "<li>" + artist.name + " </li>";
    $('.js-search-result').append(html);
    var img = artist.images[0].url;
    $('.js-image-result').append("<img src =" + img + ">");
  });
}


function getAlbums(){
  $.ajax({
    type:"GET",
    url:"https://api.spotify.com/v1/search?type=album&query="+$('#name').val(),
    success: showAlbums,
    error: handleError
  });
}

function showAlbums (response){
  console.log("Success!");
  console.log(response);

  var albumsArray = response.albums.items;
  console.log(albumsArray);
  artistsArray.forEach(function(album){
    var html = "<li>" + album.name + "</li>";
    $('.js-album-result').append(html);
  });
}

function handleError (error) {
  console.log("Error!");
  console.log(error.responseText);
}
