import React, {useState, useEffect} from 'react';
import './App.css';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

function App() {
    const [searchResults, setSearchResults] = useState([]);

    const [playlistName, setPlaylistName] = useState("Yıkık");
    const [playlistTracks, setPlaylistTracks] = useState([]);

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

    async function savePlaylist(){
        const trackURIs = playlistTracks.map(track => track.uri);
        Spotify.savePlaylist(playlistName, trackURIs).then(() => {
            updatePlaylistName("New Playlist");
            setPlaylistTracks([]);
        });
    }

    async function search(searchTerm){
        const result = await Spotify.search(searchTerm);
        setSearchResults(result);
    }

    async function getBestSingerTracks(timeRange){
        const artists = await Spotify.getBestSingerTracks(timeRange);
        setSearchResults(artists);
    }

  return (
      <div>
        <h1>Mu<span className="highlight">Si</span>ca!</h1>
        <div className="App">
          <SearchBar onSearch={search} onAction={getBestSingerTracks}/>
          <div className="App-playlist">
              <SearchResults searchResults={searchResults} /*onAdd = {addTrack}*//>
            <Playlist
                playlistName={playlistName}
                playlistTracks={playlistTracks}
                onRemove={removeTrack}
                onNameChange={updatePlaylistName}
                onSave={savePlaylist}
            />
          </div>
        </div>
      </div>
  );
}

export default App;
