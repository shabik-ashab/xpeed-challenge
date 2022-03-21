import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import GetForm from './Pages/GetForm';
import UpdateForm from './Pages/UpdateForm';


function App() {
 
 
  return (
    <BrowserRouter>
      <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      {/* <Route path="/form" element={<Form formData={formData} />} /> */}
      <Route path='/getForm' element={<GetForm />} />
      <Route path='/form/:id' element={<UpdateForm />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
