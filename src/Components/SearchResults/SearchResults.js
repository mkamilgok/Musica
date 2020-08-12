import React from "react";
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";

function SearchResults(props){
    return (
        <div className="SearchResults">
            <div className="header" ><h2>Discovered Songs ({props.searchResults.length} songs)<button>Add All</button></h2></div>
            <TrackList tracks={props.searchResults} onAdd = {props.onAdd} isRemoval={false}/>
        </div>
    );
}

export default SearchResults;