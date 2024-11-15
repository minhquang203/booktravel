import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Profile from "./pages/Profile";

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<HomePage/>}></Route>
         <Route path="/register" element={<RegisterPage/>}></Route>
         <Route path="/login" element={<LoginPage/>}></Route>
         <Route path="/profile" element={<Profile/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;