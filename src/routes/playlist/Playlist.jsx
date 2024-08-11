import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from "../../components/sidebar/Sidebar";
import "./Playlist.scss";
import { FiHeart } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { IoMdDownload } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import { AiFillCaretRight } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart, AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";

const Playlist = () => {
  const dispatch = useDispatch();
  const TOKEN = localStorage.getItem("token");
  const [playlistData, setPlaylistData] = useState([]);
  const audioRef = useRef([]); 

  const [isPlaying, setIsPlaying] = useState(null); 
  const [isLiked, setIsLiked] = useState([]);

  let playlist = useParams();

  useEffect(() => {
    fetch(`https://api.spotify.com/v1/playlists/${playlist.id} `, {
      headers: {
        "Authorization": TOKEN,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => setPlaylistData(data));
  }, [playlist.id, TOKEN]);

  const playSong = (index) => {
    if (isPlaying === index) {
      // If the clicked song is currently playing, pause it
      audioRef.current[index].pause();
      setIsPlaying(null);
    } else {
      // Pause all other tracks
      audioRef.current.forEach((audio, i) => {
        if (audio && i !== index) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
      // Play the selected track
      if (audioRef.current[index]) {
        audioRef.current[index].play();
        setIsPlaying(index);
      }
    }
  };

  const likeTheSong = (addProduct) => {
    dispatch({ payload: addProduct, type: "ADD_TO_LIKED" });
  };

  return (
    <div className='playlist'>
      <div className="main-playlistPg-flex">
        <Sidebar />
        <div className="playlist__wrapper">
          <div className="playlist__data">
            <div className='container'>
              <img src={playlistData.images?.[0]?.url} alt="" />
              <div className="playlist__data-text">
                <p>{playlistData.type}</p>
                <h1>{playlistData.name}</h1>
                <p>{playlistData.description}</p>
              </div>
            </div>
          </div>

          <div className="playlist__actions">
            <div className="playlist__actions__left">
              <p>
                {isPlaying !== null ? (
                  <AiFillPauseCircle onClick={() => playSong(isPlaying)} />
                ) : (
                  <AiFillPlayCircle onClick={() => playSong(0)} />
                )}
              </p>
              <p>
                {isLiked ? (
                  <AiOutlineHeart onClick={() => setIsLiked(false)} />
                ) : (
                  <AiFillHeart onClick={() => setIsLiked(true)} />
                )}
              </p>
              <p>
                <IoMdDownload />
              </p>
              <p>
                <BsThreeDots />
              </p>
            </div>
            <div className="playlist__actions__right">
              <p>
                <BiSearch />
              </p>
              <p>
                Custom order{" "}
                <span>
                  <AiFillCaretRight className="order__triangle" />
                </span>
              </p>
            </div>
          </div>

          <div className="tracks">
            {playlistData?.tracks?.items.map((links, index) => (
              <div className="track__single" key={links.track.id}>
                <audio
                  ref={el => audioRef.current[index] = el}
                  className="audioPlayer"
                  src={links.track.preview_url}
                ></audio>
                <img className="songImage" src={links.track.album.images?.[0]?.url} alt="" />
                <div className="track__main-text">
                  <h4 >
                    {links.track.name.length > 20 ? links.track.name.slice(0, 20) + '...' : links.track.name}
                  </h4>
                  <p>{links.track.artists[0].name}</p>
                </div>
                <p className="album__name">{links.track.album.name}</p>

                <div className='animation'>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <FiHeart onClick={() => likeTheSong(links)} className="heart-single__song" />
                <p className="track__length">
                  {Math.floor(links.track.duration_ms / 60000).toString() + ":" +
                    (Math.floor((links.track.duration_ms % 60000) / 1000)).toString().padStart(2, "0")}
                </p>

                <p className="play__button">
                  {isPlaying === index ? (
                    <AiFillPauseCircle onClick={() => playSong(index)} />
                  ) : (
                    <AiFillPlayCircle onClick={() => playSong(index)} />
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;

