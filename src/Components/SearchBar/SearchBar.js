import React, {useState} from "react";
import "./SearchBar.css";
;


function SearchBar(props){

    const timeRanges = {
        "Lately Listened (Last 4 weeks)" : "short_term",
        "Medium Time Range (Last 6 months)" : "medium_term",
        "All Of My Spotify History" : "long_term"
    };
    const[timeRange, setTimeRange] = useState("medium_term");



    const getDiscoveredSongs = () => {
        props.onAction(timeRange);
    }

    function getSearchByClass(searchByOption){
        if(timeRange === searchByOption){
            return "active";
        }
        return "";
    }

    const handleTimeRangeChange = (timeRange) =>{
        setTimeRange(timeRange);
    }

    return(
        <div>
            <div className="SearchBar-search-options">
                <ul>
                    {Object.keys(timeRanges).map(searchByOption => {
                        let searchByOptionValue = timeRanges[searchByOption];
                        return <li
                                    onClick={() => handleTimeRangeChange(searchByOptionValue)}
                                    className={getSearchByClass(searchByOptionValue)}
                                    key={searchByOptionValue}
                                >
                                    {searchByOption}
                                </li>
                    })}
                </ul>
            </div>
            <div className="SearchBar">
                <button className="SearchButton" onClick={getDiscoveredSongs}>Get Your Recommended Playlist</button>
                <div className="WrapperChat">
                    <div class="bubble" />
                    <div class="bubble2 b2" />
                </div>
            </div>
        </div>

    );
}

export default SearchBar;