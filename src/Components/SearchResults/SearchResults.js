import React from "react";
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";

function SearchResults(props){
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks={props.searchResults}/>
        </div>
    );
}

export default SearchResults;