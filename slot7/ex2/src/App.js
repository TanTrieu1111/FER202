import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import CapNhatSoLuong from './Components/CapNhatSoLuong';
import ModalConfirm from './Components/ModalConfirm';
import ProductForm from './Components/ProductForm';
import TodoList from './Components/TodoList';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Route mặc định */}
        <Route path="/" element={<CapNhatSoLuong />} />

        <Route path="/ex1" element={<CapNhatSoLuong />} />
        <Route path="/ex2" element={<ModalConfirm />} />
        <Route path="/ex3" element={<ProductForm />} />
        <Route path="/ex4" element={<TodoList />} />
      </Routes>
    </>
  );
}

export default App;
