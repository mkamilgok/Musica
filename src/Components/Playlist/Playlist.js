import React from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";

function Playlist(props) {

    const handleNameChange = (event) => {
        event.preventDefault(); //check this later
        props.onNameChange(event.target.value);
    }

    return (
        <div className="Playlist">
            <input defaultValue={props.playlistName} onChange={handleNameChange}/>
            <TrackList tracks={props.playlistTracks} onRemove={props.onRemove} isRemoval={true}/>
            <button className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
    );
}

export default Playlist;