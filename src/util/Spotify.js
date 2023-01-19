import React from "react";


const clientID = "4f102ff0a5ff4212a64d6d7a2e826c8c";
const redirectURI = "http://localhost:3000/";
var userAccessToken;

const Spotify = {

    getAccessToken() {
        if (userAccessToken) {
            return userAccessToken;
        };

        let url = window.location.href;
        let token = url.match('/access_token=([^&]*)/');
        let expires = url.match('/expires_in=([^&]*)/');
            
        if (token && expires) {
            userAccessToken = token[1];
            const expiresTime = Number(expires[1]);
            window.setTimeout(() => userAccessToken = '', expiresTime * 1000);
            window.history.pushState('Access Token', null, '/');
            return userAccessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        };
    },

    async search(searchTerm) {
        const userAccessToken = Spotify.getAccessToken();

        return await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {headers: {Authorization: `Bearer ${userAccessToken}`}})
            .then((response) => {
                return response.json();
            }).then((jsonResponse) => {
                if (!jsonResponse) {
                    return [];
                }
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }))
            });
    },

    savePlaylist(playlistName, trackUris) {
        if (!playlistName || !trackUris.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', { headers: headers })
        .then(response => response.json())
        .then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/me/v1/users/${userId}/playlists`, 
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: playlistName})         
            })
            .then(response => response.json())
            .then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`/v1/users/${userId}/playlists/${playlistId}/tracks`, 
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                })
            })
        })
    }
};

export default Spotify;