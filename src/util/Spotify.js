const clientId = 'a423bae17aa242d3a0bc2d598defd0b6';
const redirectUri = 'http://localhost:3000/';

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
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return [];
                }
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            });
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
    }

};

export default Spotify;