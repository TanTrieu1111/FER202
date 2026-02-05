import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar';
import DangKy from './components/DangKy';
import Home from './components/Home';
import SlideBar from './components/SlideBar';
import NewPage from './pages/NewList';
import Contact from './pages/Contact';
import Quiz from './pages/Quiz';
function App() {
  return (
    <Router>
      {/* Thanh điều hướng cho ứng dụng đặt pizza */}
      <NavBar />
      <SlideBar/>
    {/*Điều hướng ứng dụng đặt pizza với các liên kết đến các trang khác nhau*/}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news" element={<NewPage />} />
      <Route path="/register" element={<DangKy />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>   
  </Router> 
  );
}

export default App;