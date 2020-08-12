import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

function TrackList(props){
    if ((!props.tracks || props.tracks.length < 10) && !props.isRemoval) {
        return <span className="waiting-prompt">Waiting...<br/><br/>
                - You may need to click 2 times to the "Get Recommended Playlist" button at the beginning.<br/><br/>
                - The process can take A COUPLE OF SECONDS depending on your network service.
               </span>;
    }

    if ((!props.tracks || props.tracks.length < 1) && props.isRemoval) {
        return <span className="user-prompt"> Click "+" button on the left panel for adding songs to your playlist.</span>;
    }

    else{
        return (
            <PerfectScrollbar>
                <div className="TrackList">
                    {props.tracks.map(track =>
                        <Track
                            key={track.id}
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