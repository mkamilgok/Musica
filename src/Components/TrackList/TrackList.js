import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

function TrackList(props){
    if (!props.tracks) {
        return <span>Loading...</span>;
    }
    else{
        return (
            <PerfectScrollbar>
                <div className="TrackList">
                    {props.tracks.map(track =>
                        <Track
                            key={track.id}
                            name={track.name}
                            artist={track.artist}
                            album={track.album}
                            /*onAdd = {props.onAdd}
                                onRemove={props.onRemove}
                                isRemoval={props.isRemoval}*/
                        />)}
                </div>
            </PerfectScrollbar>
        );
    }

}

export default TrackList;