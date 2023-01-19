import React from "react";
import './playlist.css';
import { TrackList } from "../TrackList/TrackList";


export class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <input onChange={this.handleNameChange} value="New Playlist"/>
                {/*<!-- Add a TrackList component -->*/}
                <TrackList tracks = {this.props.playlistTracks} onRemove = {this.props.onRemove} isRemoval = {true} />
                <button onClick = {this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
};