import './App.css';
import { SearchBar } from '../SearchBar/searchBar';
import React from 'react';
import { SearchResults } from '../SearchResults/searchResults';
import { Playlist } from '../Playlist/playlist';
import Spotify from '../../util/Spotify';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: []};
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let newState = this.state.playlistTracks;
  
    if (this.state.playlistTracks.find(existingTrack => existingTrack.id === track.id)) {
      return;
    } else {
      newState.push(track);
      this.setState({playlistTracks: newState});
    }
  }

  removeTrack(track) {
    let newState = this.state.playlistTracks;

    newState.filter(existingTrack => existingTrack !== track);
    this.setState({playlistTracks: newState});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    let trackURIs = [];
    this.state.playlistTracks.map(track => trackURIs.push(track.uri));
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(searchResults => {
    this.setState({searchResults: searchResults})
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/*<!-- Add a SearchBar component -->*/}
          <SearchBar onSearch = {this.search} />
          <div className="App-playlist">
            {/*<!-- Add a SearchResults component -->*/}
            <SearchResults searchResults = {this.state.searchResults} onAdd = {this.addTrack} />
            {/*<!-- Add a Playlist component -->*/}
            <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks} onRemove = {this.onRemove} onNameChange = {this.updatePlaylistName} onSave = {this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}
