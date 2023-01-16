import React from "react";


let clientID = "4f102ff0a5ff4212a64d6d7a2e826c8c";
let redirectURI = "http://localhost:3000/";
var userAccessToken;

export class Spotify extends React.Component {

    getAccessToken() {
        if (userAccessToken === '') {
            let url = window.location.href;
            let token = url.match('/access_token=([^&]*)/');
            let expires = url.match('/expires_in=([^&]*)/');
            
            if (token && expires !== '') {
                userAccessToken = token;
                window.setTimeout(() => userAccessToken = '', expires * 1000);
                window.history.pushState('Access Token', null, '/');
            } else {
                window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            };
        } ;
    }

    search(searchTerm) {
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {headers: {Authorization: `Bearer ${userAccessToken}`}})
            .then((response) => {
                let apiResponse = response.json();
                let retrievedTracks = [{}];
                apiResponse.map(track => retrievedTracks.push(track));
            });
    }
};