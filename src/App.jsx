import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'

function App() {

  return (
    <>
      <BrowserRouter>

        <Header />

        <Routes>
          <Route path="/" element={<div className="Dbg-red-500">Hola</div>} />
        </Routes>

        <Footer />

      </BrowserRouter>
    </>
  )
}

export default App
