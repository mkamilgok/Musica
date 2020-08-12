import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

function TrackList(props){
    if ((!props.tracks || props.tracks.length < 10) && !props.isRemoval) {
        return <span className="waiting-prompt">Waiting...</span>;
    }

    if ((!props.tracks || props.tracks.length < 1) && props.isRemoval) {
        return <span className="user-prompt">Click + button to add songs to your playlist.</span>;
    }

    else{
        return (
            <PerfectScrollbar>
                <div className="TrackList">
                    {props.tracks.map(track =>
                        <Track
                            track={track}
                            onAdd = {props.onAdd}
                            onRemove={props.onRemove}
                            isRemoval={props.isRemoval}
                        />)}
                </div>
            </PerfectScrollbar>
        );
    }

}

export default TrackList;