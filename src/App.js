import './App.css';
import AppBar from './components/AppBar';
import RoomList from './components/RoomList'
import CreateRoomDialog from './components/CreateRoomDialog'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

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
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/sign-in" element={<SignIn/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
