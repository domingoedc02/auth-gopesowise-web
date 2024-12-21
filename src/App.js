import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter as Router, Routes, Navigate} from "react-router-dom";
import Verification from "./Verification";
import Password from "./Password";


function App() {
  return (
    <Router>
        <Routes>
            <Route path={"/verification"} element={<Verification/>}/>
            {/*<Route path="/*" element={ window.location.href = "https://gopesowise.com"} />*/}
        </Routes>
    </Router>
  );
}

export default App;
