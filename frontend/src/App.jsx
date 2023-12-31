import { BrowserRouter, Routes, Route, HashRouter, MemoryRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState'
import './App.css'
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
          {/* Use MemoryRouter if you are building spa on other hosted server where you are not allowed to configure the server */}
        <MemoryRouter>  
          <Navbar />
          <Alert alert={alert} />
          <div className="container mt-2">
            <Routes>
              <Route path='/' element={<Home showAlert={showAlert} />}></Route>
              <Route path='/about' element={<About />}></Route>
              <Route path='/login' element={<Login showAlert={showAlert} />}></Route>
              <Route path='/signup' element={<Signup showAlert={showAlert} />}></Route>

            </Routes>
          </div>
        </MemoryRouter>
      </NoteState>
      
    </>
  )
}

export default App
