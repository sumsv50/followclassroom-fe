import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import SignUpByLink from './components/SignUpByClassLink';
import SignInByLink from './components/SignInByClassLink';
import Checkout from './components/UserDetail/CheckOut';
import Success from './components/UserDetail/Successform';
import ClassLink from './components/ClassDetail/GetClassLink';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path= "/classlink/sign-up/:id" element={<SignUpByLink/>}/>
          <Route path= "/classlink/sign-in/:id" element={<SignInByLink/>}/>
          <Route path= "/user" element={<Checkout/>} />
          <Route path= "/user/success" element={<Success/>} />
          <Route path= "/classes/:id/getlink" element={<ClassLink/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
