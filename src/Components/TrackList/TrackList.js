import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";

function TrackList(props){
    return (
        <div className="TrackList">
            {props.tracks.map(track =>
                <Track track={track} />
            )}
        </div>
    );
}

export default TrackList;