import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/home/Home';
import Playlist from './routes/playlist/Playlist';
import LikedSongs from './routes/likedsongs/LikedSongs';
import { useState,useEffect } from 'react';

function App() {
  const [data, setData] = useState([])
  const CLIENT_ID = '3c17ee06e9b5420e8ef9dfa82ddf2751'
  const SECRET_ID = 'b0f0585a5c1e4a69b94e2313d3390afe'

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + SECRET_ID)
        },
        body: 'grant_type=client_credentials'
      })
      const auth = await response.json()
      localStorage.setItem('token', `${ auth.token_type } ${ auth.access_token }`);
      setData(auth.access_token)
    }
    fetchData()

  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/mixes/:id' element={<Playlist/>} />
        <Route path='/liked-songs' element={<LikedSongs/>} />
      </Routes>
    </>
  );
}

export default App;
