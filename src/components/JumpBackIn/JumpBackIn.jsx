import React from 'react'
import "./JumpBackIn.scss"
import Container from '../../utils/Utils'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const JumpBackIn = () => {
  const TOKEN = localStorage.getItem("token")
  const [playlistMain, setPlaylistMain] = useState([])

  useEffect(() => {
    fetch("https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFLVaM30PMBm4/playlists", {
      headers: {
        "Authorization": TOKEN,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => { data.playlists.items = data.playlists.items.slice(0, 4); setPlaylistMain(data); });
  }, []);

  console.log(playlistMain);

  return (
    <div className='playlist__wrapper'>
      <Container>
        <h3 className='playlist__title'>Jump Back In</h3>
        <div className="playlist__content">
          {
            playlistMain?.playlists?.items.map(links =>
              <Link className='playlist__main playlist__item' key={links.id} to={`/mixes/${links.id}`}>
                <img src={links.images[0].url} alt="" />
                <b className=''>{links.name}</b>
                <p>{links.description}</p>
              </Link>
            )
          }
        </div>
      </Container>
    </div>
  )
}

export default JumpBackIn

