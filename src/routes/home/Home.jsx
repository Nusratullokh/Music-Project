import React from 'react'
import "./Home.scss"
import Header from "../../components/header/Header"
import YourTopMixes from '../../components/YourTopMixes/YourTopMixes'
import MadeForYou from '../../components/MadeForYou/MadeForYou'
import RecentlyPlayed from '../../components/RecentlyPlayed/RecentlyPlayed'
import JumpBackIn from '../../components/JumpBackIn/JumpBackIn'
import UniquelyYours from '../../components/UniquelyYours/UniquelyYours'
import Sidebar from '../../components/sidebar/Sidebar'
import SidebarFriends from '../../components/SidebarFriends/SidebarFriends'


const Home = () => {
    return (
        <div className='home-wrapper'>
            <div className="home__wrapper">
                <Sidebar />
                <div className="home__content">
                    <Header />
                    <YourTopMixes />
                    <MadeForYou />
                    <RecentlyPlayed />
                    <JumpBackIn />
                    <UniquelyYours />
                </div>
                <SidebarFriends />
            </div>
        </div>
    )
}

export default Home
