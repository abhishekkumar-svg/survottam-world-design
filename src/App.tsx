import { BrowserRouter, Routes, Route } from "react-router-dom"

import { useLenis } from "./hooks/useLenis"

import Header from "./pages/homePage/header/Header"
import Homepage from "./pages/homePage/homepage"
import About from "./pages/About/About"
import Footer from "./pages/homePage/components/Footer/Footer"
import LeaderShip from "./pages/Teams"
import Projects from "./pages/ProjectsList/Projects"
import Blogs from "./pages/Blogs/Blogs"
import { NewsArticles } from "./pages/NewsArticles/NewsArticles"
import Careers from "./pages/Careers/Careers"
import Contact from "./pages/Contact/Contact"

function App() {
  useLenis()

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/leadership" element={<LeaderShip />} />
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/blogs"element={<Blogs/>}/>
        <Route path="/media" element={<NewsArticles/>}/>
        <Route path="/career" element={<Careers/>}/>
        <Route path="/contact" element={<Contact/>} />

      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App