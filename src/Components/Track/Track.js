import React from "react";
import "./Track.css";

function Track(props){

    const AddOrRemove = (track, isRemoval) => {
        if(isRemoval){
            props.onRemove(track);
        }
        else{
            props.onAdd(track);
        }
    }

    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{props.track.name}</h3>
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
            <button
                className="Track-action"
                onClick={() => AddOrRemove(props.track, props.isRemoval)}
            >
                {props.isRemoval ? "-" : "+"}
            </button>
        </div>
    );
}

export default Track;