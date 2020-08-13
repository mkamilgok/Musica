const clientId = 'a423bae17aa242d3a0bc2d598defd0b6';
const redirectUri = 'https://musica-discover.herokuapp.com/';

let accessToken = "";

let Spotify = {

    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }
        const hasAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const hasExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (hasAccessToken && hasExpiresIn) {
            accessToken = hasAccessToken[1];
            const expiresIn = Number(hasExpiresIn[1]);
            //After the expiration, accessToken becomes empty value
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public%20user-top-read%20user-library-read&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    savePlaylist(name, trackUris) {
        if (name && trackUris) {
            const accessToken = Spotify.getAccessToken();
            const headers = {
                Authorization: `Bearer ${accessToken}`
            };
            let userId;

            return fetch('https://api.spotify.com/v1/me', { headers: headers })
                .then(response => response.json())
                .then(jsonResponse => {
                    userId = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({ name: name })
                    })
                        .then(response => response.json())
                        .then(jsonResponse => {
                            //Store playlist ID
                            const playlistId = jsonResponse.id;

                            return fetch(
                                `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                                {
                                    headers: headers,
                                    method: 'POST',
                                    body: JSON.stringify({ uris: trackUris })
                                }
                            );
                        });
                });
        } else {
            return;
        }
    },

    getBestArtists(timeRange) {
        const accessToken = Spotify.getAccessToken();
        let myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + accessToken);
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        return fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=10&offset=0`, requestOptions)
            .then(response => response.json())
            .then(result => result.items)
            .then(theArtists => {
                return theArtists.map(artist => ({
                    id : artist.id,
                    name : artist.name,
                    genre : artist.genres
                }));
            });
    },

    getRelevantArtist(artistId) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                let artists = jsonResponse.artists;
                let rawArtist = artists[Math.floor(Math.random() * artists.length)];
                let artist = {
                    id: rawArtist.id,
                    name : rawArtist.name,
                    genre : rawArtist.genres
                };
                return artist;
            });
    },
    getTopSongsOfArtist(artistId) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=from_token`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                let rawSongs = jsonResponse.tracks;
                const songs = [];
                for(let song of rawSongs){
                    songs.push({
                        id: song.id,
                        name: song.name,
                        artist: song.artists[0].name,
                        album: song.album.name,
                        uri: song.uri,
                        url: song.external_urls.spotify
                    });
                }
                return songs;
            });
    },
    checkSongsAreSaved(songIdList) {
        const accessToken = Spotify.getAccessToken();
        let idString = songIdList[0];
        for(let i = 1; i < songIdList.length; i++){
            idString += "%2C" + songIdList[i];
        }
        return fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${idString}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                return jsonResponse;
            });
    },
    getRecommendationsByArtists(artistIdList) {
        const accessToken = Spotify.getAccessToken();
        let artistIDs = artistIdList[0];
        for(let i = 1; i < artistIdList.length; i++){
            artistIDs += "%2C" + artistIdList[i];
        }
        return fetch(`https://api.spotify.com/v1/recommendations?limit=40&market=from_token&seed_artists=${artistIDs}&min_popularity=40`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                let rawSongs = jsonResponse.tracks;
                const songs = [];
                for(let song of rawSongs){
                    songs.push({
                        id: song.id,
                        name: song.name,
                        artist: song.artists[0].name,
                        album: song.album.name,
                        uri: song.uri,
                        url: song.external_urls.spotify
                    });
                }
                return songs;
            });
    }
};

export default Spotify;
