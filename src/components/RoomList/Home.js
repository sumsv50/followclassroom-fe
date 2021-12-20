import AppBar from '../Common/AppBar';
import RoomList from './RoomList'
import React, { useState } from 'react';

function Home() {
    const [reRenderRoomList, setRerenderRoomList] = useState(false);

    const toggleRerenderRoomList = () => {
        setRerenderRoomList(curr => !curr);
    }
    return (
        <>
            <AppBar toggleRerenderRoomList={toggleRerenderRoomList} />
            <RoomList reRender={reRenderRoomList} />
        </>
    );
}

export default Home;
