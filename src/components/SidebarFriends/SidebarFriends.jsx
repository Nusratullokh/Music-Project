import React from 'react'
import "./SidebarFriends.scss"
import Container from '../../utils/Utils'
import addFriend from "../../assets/addFriend.svg"
import User from "../../assets/user.svg"
import { FiX } from "react-icons/fi";

const SidebarFriends = () => {
  return (
    <div className='add__friend'>
      <Container>

        <b className='saidebar__friends-title'>Friend Activity
          <div className="icons">
            <img src={addFriend} alt="" />
            <FiX />
          </div>
        </b>
        <p className='saidebar__desc'>Let friends and followers on Spotify see what you’re listening to.</p>


        <img src={User} alt="" className='user-photo'/>
        <img src={User} alt="" className='user-photo'/>
        <img src={User} alt="" className='user-photo'/>
        <p className='saidebar__desc'>Go to Settings {`>`} Social and enable “Share my listening activity on Spotify.’ You can turn this off at any time.</p>
        <button className='settings-btn'>SETTINGS</button>
      </Container>
    </div>
  )
}

export default SidebarFriends
