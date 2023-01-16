import React from 'react';
import './searchResults.css';
import { TrackList } from '../TrackList/TrackList';



export class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                {/*<!-- Add a TrackList component -->*/}
                <TrackList searchResults = {this.props.searchResults} onAdd = {this.props.onAdd} isRemoval = {false} />
            </div>
        );
    }
};