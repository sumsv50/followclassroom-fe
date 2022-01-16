import './App.css';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Home from './components/RoomList/Home';
import ClassDetail from './components/ClassDetail/ClassDetail';
import UserList from './components/ClassDetail/UserList';
import SignUpByLink from './components/SignUp/SignUpByClassLink';
import SignInByLink from './components/SignIn/SignInByClassLink';
import Checkout from './components/UserDetail/CheckOut';
import Success from './components/UserDetail/Successform';
import ClassLink from './components/ClassDetail/GetClassLink';
import CreateGrade from './components/EditGrade/CreateGrade';
import EditGrade from './components/EditGrade/EditGrade';
import GradeTab from './components/ClassDetail/GradeTab';
import GradeBoard from './components/ClassDetail/GradeBoard';
import GradeReview from './components/ClassDetail/GradeReview';
import DetailGradeReview from './components/ClassDetail/DetailGradeReview';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/classes/:id" element={<ClassDetail />} />
          <Route path="/classes/:id/userclass" element={<UserList />} />
          <Route path="/classlink/sign-up/:id" element={<SignUpByLink />} />
          <Route path="/classlink/sign-in/:id" element={<SignInByLink />} />
          <Route path="/user" element={<Checkout />} />
          <Route path="/user/success" element={<Success />} />
          <Route path="/classes/:id/getlink" element={<ClassLink />} />
          <Route path="/classes/:id/create-grade" element={<CreateGrade />} />
          <Route path="/classes/:id/grade" element={<GradeTab />} />
          <Route path="/classes/:id/gradeboard" element={<GradeBoard />} />
          <Route path="/classes/:class_id/:id/edit" element={<EditGrade />} />
          <Route path="/classes/:id/gradereview" element={<GradeReview />} />
          <Route path="/classes/:class_id/:id/gradereview" element={<DetailGradeReview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
