
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom' 
import { useAuthContext } from './hooks/useAuthContext';

// Importing pages and components 
import HeaderComponent from './components/HeaderComponent';
import HomePage from './pages/HomePage';
import LoginPage from "./pages/LoginPage"; 
import RegisterPage from './pages/RegisterPage';
import VaultPage from "./pages/VaultPage"; 
import FooterComponent from './components/FooterComponent';


function App() {

  const {user} = useAuthContext(); 

  return (
    <div className="App">
      <Router>
        <HeaderComponent></HeaderComponent>
        <Routes>
          <Route path="/" element={user ? <HomePage></HomePage> : <Navigate to="/login"></Navigate>}></Route>
          <Route path="/login" element={!user ? <LoginPage></LoginPage> : <Navigate to="/"></Navigate>}></Route>
          <Route path="/register" element={!user ? <RegisterPage></RegisterPage> : <Navigate to="/"></Navigate>}></Route>
          <Route path="/vault" element={user ? <VaultPage></VaultPage> : <Navigate to="/login"></Navigate>}></Route>
        </Routes>
        <FooterComponent></FooterComponent>
      </Router>
    </div>
  );
}

export default App;
