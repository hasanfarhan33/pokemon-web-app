
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom' 
import { useAuthContext } from './hooks/useAuthContext';

// Importing pages and components 
import HeaderComponent from './components/HeaderComponent';
import HomePage from './pages/HomePage';
import LoginPage from "./pages/LoginPage"; 
import RegisterPage from './pages/RegisterPage';


function App() {

  // TODO: Come back to this later
  // const {user} = useAuthContext(); 

  return (
    <div className="App">
      <Router>
        <HeaderComponent></HeaderComponent>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
