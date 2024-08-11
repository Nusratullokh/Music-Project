import React from 'react'
import "./Header.scss"
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import Container from '../../utils/Utils';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

  const TOKEN = localStorage.getItem("token");
  const [headerData, setHeaderData] = useState([]);

  useEffect(() => {
    fetch("https://api.spotify.com/v1/browse/categories/toplists/playlists", {
      headers: {
        "Authorization": TOKEN,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {data.playlists.items = data.playlists.items.slice(0, 6); setHeaderData(data);});
  }, []);



  return (
    <div className="header">
      <Container>
        <div className="arrows__group">
          <div className="arrow__wrapper"><FiChevronLeft /></div>
          <div className="arrow__wrapper"><FiChevronRight /></div>
        </div>

        <h2 className='header__title'>Good afternoon</h2>

        <div className="playlists__group">
          {
            headerData?.playlists?.items.map(links =>
              <Link className='top-playlist' key={links.id} to={`/mixes/${links.id}`}>
                <img src={links.images[0].url} alt="" />
                {links.name}
              </Link>
            )
          }
        </div>
      </Container>


    </div>
  )
}

export default Header
