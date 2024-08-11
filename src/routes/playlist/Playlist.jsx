import React, { useState, audioRef, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from "../../components/sidebar/Sidebar"
import "./Playlist.scss"
import { FiHeart } from "react-icons/fi";
import { useDispatch } from 'react-redux'
import { IoMdDownload } from "react-icons/io"; 
import { BiSearch } from "react-icons/bi"; 
import { AiFillCaretRight } from "react-icons/ai"; 
import { BsThreeDots } from "react-icons/bs"; 
import { AiFillHeart } from "react-icons/ai"; 
import { AiOutlineHeart } from "react-icons/ai"; 
import { AiFillPauseCircle } from "react-icons/ai"; 
import { AiFillPlayCircle } from "react-icons/ai"; 

const Playlist = () => {
    const dispatch = useDispatch()
    const TOKEN = localStorage.getItem("token");
    const [playlistData, setPlaylistData] = useState([]);
    const audioRef = useRef([]);  // Array of audio element refs

        const [isLiked, setIsLiked] = useState([]);
    const [isPause, setIsPause] = useState([]);

    let playlist = useParams();

    useEffect(() => {
        fetch(`https://api.spotify.com/v1/playlists/${playlist.id} `, {
            headers: {
                "Authorization": TOKEN,
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => setPlaylistData(data))
    }, [playlist.id, TOKEN])

    const playSong = (index) => {
        // Pause all audio tracks
        audioRef.current.forEach(audio => audio.pause());

        // Play the selected track
        if (audioRef.current[index]) {
            audioRef.current[index].play();
        }
    };



    

    function likeTheSong(addProduct) {
        dispatch({ payload: addProduct, type: "ADD_TO_LIKED" })
    }

    return (
        <div className='playlist__body'>
            <div className="main-playlistPg-flex">
                <Sidebar />
                <div className="main-playlist-wrapper">
                    <div className="playlist-wrapper-data">
                        <div className='container'>
                            <img src={playlistData.images?.[0]?.url} alt="" />
                            <div className="playlist-wrapper-data-text">
                                <p>{playlistData.type}</p>
                                <h1>{playlistData.name}</h1>
                                <p>{playlistData.description}</p>
                            </div>
                        </div>
                    </div>
                   



                   

                    <div className="playlist__actions">
             <div className="playlist__actions__left">
               <p>
                {isPause ? (
                  <AiFillPlayCircle  onClick={() => playSong(0)} />
                ) : (
                  <AiFillPauseCircle  onClick={() => setIsPause(false)} />
                )}
              </p>
              <p>
                {isLiked ? (
                  <AiOutlineHeart  onClick={() => setIsLiked(false)} />
                ) : (
                  <AiFillHeart  onClick={() => setIsLiked(true)} />
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
                  <AiFillCaretRight  className="order__triangle" />
                </span>
              </p>
            </div>
          </div>



                    <div className="tracks-section">
                        {playlistData?.tracks?.items.map((links, index) => (
                            <div className="track__single" key={links.track.id}>
                                <audio
                                    ref={el => audioRef.current[index] = el}
                                    className="audioPlayer"
                                    controls
                                    src={links.track.preview_url}
                                ></audio>
                                <audio className="audioPlayer" controls src={links.track.preview_url}></audio>
                                <img className="songImage" src={links.track.album.images?.[0]?.url} alt="" />
                                <div className="track__main_text">
                                    <h4 className="songTitle">
                                        {links.track.name.length > 20 ? links.track.name.slice(0, 20) + '...' : links.track.name}
                                    </h4>
                                    <p>{links.track.artists[0].name}</p>
                                    <p>{links.track.name}</p> {/* Display the track name */}
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Playlist;

