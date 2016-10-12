
// Implement all API calls on submit from the main search bar
$("#search").on("submit", function(e) {
    e.preventDefault();         // prevents propogation of events from affecting this call
    var query = $("#search-input").val();   // grab the string from the search bar

    emptyCurrentResults();      // function to remove current divs of their results
    
    // Begin by executing first call to spotify server api
    $.ajax({
        url: "/spotify",
        method: "POST",
        data: {
            q: query
        },
        success: function(data) {
            $(".ui.spotify.loader").removeClass("active");      // stop showing the loader for Spotify
            var loopLength = (data.tracks.items.length > 7) ? 7 : data.tracks.items.length;
            for (var i = 0; i < loopLength; i++) {
                populateSpotifySection(data.tracks.items[i]);
            }
        }
    });

    // Next, call youtube server api
    $.ajax({
        url: "/youtube",
        method: "POST",
        data: {
            q: query
        },        
        success: function(data) {
            $(".ui.youtube.loader").removeClass("active");      // stop showing the loader for YouTube
            for (var i = 0; i < data.items.length; i++) {
                populateYouTubeSection(data.items[i]);
            }
        }
    });

    // Now begin the call to client-side soundcloud api
    SC.initialize({
        client_id: '4a57a1db8f696c78163c8039d82f447c'
    });
    SC.get('/tracks', {
        q: query
    }).then(function(tracks) {
        $(".ui.soundcloud.loader").removeClass("active");
        var loopLength = (tracks.length > 5) ? 5 : tracks.length;
        for (var i = 0; i < loopLength; i++) {
            populateSoundCloudSection(tracks[i]);
        }
    });
});

function populateSoundCloudSection(cloud) {
    if (cloud.uri) {
        var iFrameSrc = "https://w.soundcloud.com/player/?url=" + cloud.uri;
        var widgetIFramePart1 = "<div class='ui grid'><div class='fifteen wide column'><iframe style='margin-bottom:10px' src='"+ iFrameSrc + "' width='100%' height='120px' scrolling='no' frameborder='no'></iframe></div>"
        var widgetIFramePart2 = "<div class='one wide column'><div class='ui icon button soundcloud' name='" + iFrameSrc + "'><i class='add icon'></i></div></div>"
        var widgetIFramePart3 = "</div>";
        
        $("#soundcloud-results").append(widgetIFramePart1 + widgetIFramePart2 + widgetIFramePart3);
    }
}

function populateYouTubeSection(video) {
    if (video.id.videoId) {
        var iFrameSrc = "http://www.youtube.com/embed/" + video.id.videoId;
        var youtubeVideoPart1 = "<div class='ui grid'><div class='fifteen wide column'><iframe style='margin-bottom:10px' src='" + iFrameSrc + "' width='100%' height='250px' frameborder='0'></iframe></div>";
        var youtubeVideoPart2 = "<div class='one wide column'><div class='ui icon button youtube' name='" + iFrameSrc + "'><i class='add icon'></i></div></div>";
        var youtubeVideoPart3 = "</div>";

        $("#youtube-results").append(youtubeVideoPart1 + youtubeVideoPart2 + youtubeVideoPart3);
    }
}

function populateSpotifySection(track) {
    if (track.uri) {
        var iFrameSrc = "https://embed.spotify.com/?uri=" + track.uri;
        var spotifyTrackPart1 = "<div class='ui grid'><div class='fifteen wide column'><iframe style='margin-bottom:10px' src='" + iFrameSrc + "' width='100%' height='80px' frameborder='0' allowtransparency='true'></iframe></div>";
        var spotifyTrackPart2 = "<div class='one wide column'><div class='ui icon button spotify' name='" + iFrameSrc + "'><i class='add icon'></i></div></div>";
        var spotifyTrackPart3 = "</div>";
        
        $("#spotify-results").append(spotifyTrackPart1 + spotifyTrackPart2 + spotifyTrackPart3);
    }
}

function emptyCurrentResults() {
    $("#youtube-results").empty();
    $("#spotify-results").empty();
    $("#soundcloud-results").empty();

    // Also show the placeholding loaders 
    $(".ui.loader").addClass("active");
}
