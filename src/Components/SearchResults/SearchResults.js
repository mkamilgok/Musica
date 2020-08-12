import React from "react";
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";

function SearchResults(props){
    return (
        <div className="SearchResults">
            <h2>Discovered Songs ({props.searchResults.length} songs)</h2>
            <TrackList tracks={props.searchResults} onAdd = {props.onAdd} isRemoval={false}/>
        </div>
    );
}

export default SearchResults;