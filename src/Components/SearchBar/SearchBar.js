import React, {useState} from "react";
import "./SearchBar.css";

function SearchBar(props){

    const timeRanges = {
        "Lately Listened (Last 4 weeks)" : "sort_term",
        "Medium Time Range (Last 6 months)" : "medium_term",
        "All Of My Spotify History" : "long_term"
    };

    const[term, setTerm] = useState("");
    const[timeRange, setTimeRange] = useState("medium_term");

    const search = () => {
        props.onSearch(term);
    }

    const handleTermChange = (event) => {
        setTerm(event.target.value);
    }

    function getSearchByClass(searchByOption){
        if(timeRange === searchByOption){
            return "active";
        }
        return "";
    }

    return(
        <div>
            <div className="SearchBar-search-options">
                <ul>
                    {Object.keys(timeRanges).map(searchByOption => {
                        let searchByOptionValue = timeRanges[searchByOption];
                        return <li
                                    onClick={() => setTimeRange(searchByOptionValue)}
                                    className={getSearchByClass(searchByOptionValue)}
                                    key={searchByOptionValue}
                                >
                                    {searchByOption}
                                </li>
                    })}
                </ul>
            </div>
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange}/>
                <button className="SearchButton" onClick={search}>SEARCH</button>
            </div>
        </div>

    );
}

export default SearchBar;