
import { initializeApp } from "firebase/app";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import SignUp from './components/login/LogIn';
import Home from './components/home/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
