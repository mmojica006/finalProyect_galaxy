import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import { HashRouter as Router } from "react-router-dom";
import RouteConfig from './Routes/RouteConfig'
import { NavbarPage } from './Pages';
import Footer from "./Components/Footer";

function App() {

  return (
    <>
      <Router>
        <NavbarPage />
        <RouteConfig />
        <Footer/>
      </Router>

    </>
  )
}

export default App
