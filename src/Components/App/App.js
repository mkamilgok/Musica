import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

function App() {
    const [searchResults, setSearchResults] = useState(
        [{id: 1, name:"Yorulma", artist:"Athena", album:"Genclik"}
                 ,{id: 2, name:"k", artist:"Athena", album:"Genclik"}
                 ,{id: 3, name:"Olmaz", artist:"Athena", album:"Genclik"}]);

  return (
      <div>
        <h1>Mu<span className="highlight">Si</span>ca!</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={searchResults}/>
            <Playlist />
          </div>
        </div>
      </div>
  );
}

export default App;
