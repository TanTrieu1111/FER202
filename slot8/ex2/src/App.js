import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quantity from './components/Quantity';
import OrderModal from './components/OrderModal';
import ProductForm from './components/ProductForm';
import TodoList from './components/TodoList';
import NavBar from './components/NavBar';
function App() {
  
  return (
    <BrowserRouter>
      <NavBar />
      
       <Routes>
        <Route path="/ex1" element={<Quantity />} />
        <Route path="/ex2" element={<OrderModal />} />
        <Route path="/ex3" element={<ProductForm />} />
        <Route path="/ex4" element={<TodoList />} />
      </Routes>
   
    
    </BrowserRouter>
  );
}

export default App;
