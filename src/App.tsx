import { BrowserRouter, Routes, Route } from "react-router-dom"

import { useLenis } from "./hooks/useLenis"

import Header from "./pages/homePage/Header/Header"
import Homepage from "./pages/homePage/homepage"
import About from "./pages/About/About"
import Footer from "./pages/homePage/components/Footer/Footer"
import LeaderShip from "./pages/Teams"

function App() {
  useLenis()

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/leadership" element={<LeaderShip />} />

      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App