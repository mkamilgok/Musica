import React, {useState, useEffect} from 'react';
import './App.css';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

function App() {
    const [searchResults, setSearchResults] = useState(
        [{id: 1, name:"Yorulma", artist:"Athena", album:"Genclik"}
                 ,{id: 2, name:"k", artist:"Athena", album:"Genclik"}
                 ,{id: 3, name:"Olmaz", artist:"Athena", album:"Genclik"}]);

    const [playlistName, setPlaylistName] = useState("Yıkık");
    const [playlistTracks, setPlaylistTracks] = useState(searchResults.filter(track => track.id % 2 == 1));

    function addTrack(track){
        if(playlistTracks.find(song => song.id === track.id)){
            return;
        }
        setPlaylistTracks(playlistTracks.concat([track]));
    }

    function removeTrack(track){
        setPlaylistTracks(playlistTracks.filter(savedTrack => savedTrack.id != track.id));
    }

    function updatePlaylistName(name){
        setPlaylistName(name);
    }

  return (
      <div>
        <h1>Mu<span className="highlight">Si</span>ca!</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={searchResults} onAdd={addTrack}/>
            <Playlist
                playlistName={playlistName}
                playlistTracks={playlistTracks}
                onRemove={removeTrack}
                onNameChange={updatePlaylistName}
            />
          </div>
        </div>
      </div>
  );
}

export default App;
