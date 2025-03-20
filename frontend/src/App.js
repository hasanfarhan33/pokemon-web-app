
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom' 

// Importing pages and components 
import HeaderComponent from './components/HeaderComponent';
import HomePage from './pages/HomePage';
import LoginPage from "./pages/LoginPage"; 


function App() {
  return (
    <div className="App">
      <Router>
        {/* TODO: Add the header component here */}
        <HeaderComponent></HeaderComponent>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          {/* <Route path="/register" element={<RegisterPage></RegisterPage>}></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
