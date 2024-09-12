import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Home from "./component/Home";
import UserList from "./component/UserList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Adduser from "./component/Adduser";
import Edituser from "./component/Edituser";
import Demo from "./component/Demo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/adduser" element={<Adduser />} />
          <Route path="/edituser/:id" element={<Edituser />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
