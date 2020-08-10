import React from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";

function Playlist(props) {

    const handleNameChange = (event) => {
        //event.preventDefault(); //check this later
        props.onNameChange(event.target.value);
    }

    const saveList = async (event) => {
        await props.onSave();
    }

    return (
        <div className="Playlist">
            <input value={props.playlistName} onChange={handleNameChange}/>
            <TrackList tracks={props.playlistTracks} onRemove={props.onRemove} isRemoval={true}/>
            <button className="Playlist-save" onClick={saveList}>SAVE TO SPOTIFY</button>
        </div>
    );
}

export default Playlist;