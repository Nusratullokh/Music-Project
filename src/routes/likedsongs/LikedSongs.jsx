import React from 'react';
import "./LikedSongs.scss";
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from "../../components/sidebar/Sidebar";
import likedSongs from "../../assets/likedSongs.png";
import PlayIcon from "../../assets/playIcon.svg";
import Download from "../../assets/dwnl.svg";
import { FiHeart, FiMoreHorizontal, FiSearch } from "react-icons/fi";
import { AiFillCaretDown } from "react-icons/ai";
import { addLikedSong } from './action'; 

const LikedSongs = () => {
  const dispatch = useDispatch();
   const likedSongsData = useSelector(state => state.like.likeReducer);

  const likeTheSong = (song) => {
    dispatch(addLikedSong(song)); 
  };

  return (
    <div className='likedSongs'>
      <Sidebar />
      <div className="liked__wrapper">
        <div className="liked__header">
          <img src={likedSongs} alt="Liked Songs" />
          <div className="liked__text">
            <p>PUBLIC PLAYLIST</p>
            <h1>Liked Songs</h1>
          </div>
        </div>

        <div className="liked__funksion">
          <div className="controls">
            <div className="play">
              <img src={PlayIcon} alt="Play" />
              <FiHeart />
              <img src={Download} alt="Download" />
              <FiMoreHorizontal />
            </div>
            <div className="filter">
              <FiSearch className='searchIcon' />
              <p>Custom order <AiFillCaretDown /></p>
            </div>
          </div>

          <div className="liked__songs">
            <div className="liked-content">
              {likedSongsData?.map((item) => (
                <div className="music" key={item.id}>
                  <div className="msc-main">
                    <img src={item.album.images[0]?.url} alt={item.name} />
                  </div>
                  <div className="music-info">
                    <p className='music-name'>{item.name}</p>
                    {item.artists.length > 0 && (
                      <p className='music-artist'>{item.artists[0].name}</p>
                    )}
                  </div>
                  <FiHeart onClick={() => likeTheSong(item)} />
                </div>
              ))}
              {likedSongsData?.length === 0 && (
                <p className='no-liked-songs'>You haven't liked any songs yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedSongs;


