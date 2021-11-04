import './App.css';
import AppBar from './components/AppBar';
import RoomList from './components/RoomList'
import CreateRoomDialog from './components/CreateRoomDialog'
import { useState } from 'react';

function App() {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [reRenderRoomList, setRerenderRoomList] = useState(false);

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleClose = () => {
    setOpenCreateDialog(false);
  };

  const toggleRerenderRoomList = () => {
    setRerenderRoomList(curr => !curr);
  }
  console.log("App re-render");
  return (
    <div className="App">
      <AppBar handleOpenCreateDialog={handleOpenCreateDialog}/>
      <RoomList reRender={reRenderRoomList}/>
      <CreateRoomDialog isOpen={openCreateDialog}
        toggleRerenderRoomList={toggleRerenderRoomList}
        handleClose={handleClose}
      />
    </div>
  );
}

export default App;
