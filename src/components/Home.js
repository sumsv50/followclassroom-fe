import '../App.css';
import AppBar from './AppBar';
import RoomList from './RoomList'
import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Home() {
    const [reRenderRoomList, setRerenderRoomList] = useState(false);

    const toggleRerenderRoomList = () => {
        setRerenderRoomList(curr => !curr);
    }
    return (
        <>
            <AppBar toggleRerenderRoomList={toggleRerenderRoomList} />
            {/* <CreateRoomDialog handleClose={handleClose} isOpen={openCreateDialog} toggleRerenderRoomList={toggleRerenderRoomList} /> */}
            <RoomList reRender={reRenderRoomList} />
        </>
    );
}

export default Home;
