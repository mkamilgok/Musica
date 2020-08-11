import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";

function TrackList(props){
    if (!props.artists) {
        return <span>Loading...</span>;
    }
    else{
        return (
            <div className="TrackList">
                {props.artists.map(artist =>
                    <Track
                        key={artist.id}
                        artist={artist}
                        /*onAdd = {props.onAdd}
                            onRemove={props.onRemove}
                            isRemoval={props.isRemoval}*/
                    />)}
            </div>
        );
    }

}

export default TrackList;