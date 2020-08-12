import React, {useState, useEffect} from 'react';
import './App.css';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";


function App() {
    const [allArtists, setAllArtists] = useState([]);

    const [playlistName, setPlaylistName] = useState("Enter Playlist Name for Spotify");
    const [playlistTracks, setPlaylistTracks] = useState([]);

    const [songs, setSongs] = useState([]);

    function addTrack(track){
        if(playlistTracks.find(song => song.id === track.id)){
            return;
        }
        setPlaylistTracks(playlistTracks.concat([track]));
    }

    function addAllTracks(){
        setPlaylistTracks(songs);
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
            updatePlaylistName("Enter Playlist Name for Spotify");
            setPlaylistTracks([]);
        });
    }

    async function search(searchTerm){
        const result = await Spotify.search(searchTerm);
        setAllArtists(result);
    }

    async function getBestSingerTracks(timeRange){
        const bestArtists = await Spotify.getBestArtists(timeRange);
        const relevantArtists = [];
        for(let artist of bestArtists){
            relevantArtists.push(await Spotify.getRelevantArtist(artist.id))
        }
        const allArtistsFound = bestArtists.concat(relevantArtists)
        setAllArtists(allArtistsFound);

        let songsFromArtists = [];
        for(let artist of allArtistsFound){
            const arr = await Spotify.getTopSongsOfArtist(artist.id);
            songsFromArtists.push(arr);
        }

        let songsToBeAdded = [];
        for(let i = 0; i < songsFromArtists.length; i++){
            //Get ids of top ten songs
            const idList = songsFromArtists[i].map(song => song.id);
            //Get boolean array whether the song is saved or not
            const isSaved = await Spotify.checkSongsAreSaved(idList);
            //Filter unsaved songs
            const unsavedSongs = songsFromArtists[i].filter((song, index) => !isSaved[index]);
            //Get a random element from unsaved songs
            let randomSong;
            if(unsavedSongs.length !== 0){
                randomSong = unsavedSongs[Math.floor(Math.random() * unsavedSongs.length)];
            }
            songsToBeAdded.push(randomSong);
        }


        let recommendedBySpotify1 = await Spotify.getRecommendationsByArtists(bestArtists.slice(0,5).map(artist => artist.id));
        let idList = recommendedBySpotify1.map(song => song.id);
        let isSaved = await Spotify.checkSongsAreSaved(idList);
        let unsavedSongs = recommendedBySpotify1.filter((song, index) => !isSaved[index]);
        let shuffled = unsavedSongs.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, 5);
        console.log(selected);
        songsToBeAdded = songsToBeAdded.concat(selected);

        let recommendedBySpotify2 = await Spotify.getRecommendationsByArtists(bestArtists.slice(5,10).map(artist => artist.id));
        idList = recommendedBySpotify2.map(song => song.id);
        isSaved = await Spotify.checkSongsAreSaved(idList);
        unsavedSongs = recommendedBySpotify2.filter((song, index) => !isSaved[index]);
        shuffled = unsavedSongs.sort(() => 0.5 - Math.random());
        selected = shuffled.slice(0, 5);
        console.log(selected);
        songsToBeAdded = songsToBeAdded.concat(selected);

        setSongs(songsToBeAdded);
    }

    useEffect(() => {
        console.log(`You clicked  times`);
    }, [songs]);


  return (
      <div>
        <h1>Mu<span className="highlight">Si</span>ca!</h1>
        <div className="App">
          <SearchBar onSearch={search} onAction={getBestSingerTracks}/>
          <div className="App-playlist">
              <SearchResults searchResults={songs} onAdd = {addTrack} onAddAll={addAllTracks}/>
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
