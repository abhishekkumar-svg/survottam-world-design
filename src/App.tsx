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
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails"
import ScrollToTop from "./components/scrollToTop"
import BlogDetail from "./pages/BlogDetails/BlogDetails"

function App() {
  useLenis()

  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop/>

      <Routes>
        {/* For CPanel Deployment */}
        {/* <Route path="/test/" element={<Homepage />} />
        <Route path="/test/about" element={<About />} />
        <Route path="/test/leadership" element={<LeaderShip />} />
        <Route path="/test/projects" element={<Projects/>}/>
        <Route path="/test/blogs"element={<Blogs/>}/>
        <Route path="/test/media" element={<NewsArticles/>}/>
        <Route path="/test/career" element={<Careers/>}/>
        <Route path="/test/contact" element={<Contact/>} /> */}



        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/leadership" element={<LeaderShip />} />
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/projects/:projectName" element={<ProjectDetails/>} />
        <Route path="/blogs"element={<Blogs/>}/>
        <Route path="/blogs/:blogName" element={<BlogDetail/>}/>
        <Route path="/media" element={<NewsArticles/>}/>
        <Route path="/career" element={<Careers/>}/>
        <Route path="/contact" element={<Contact/>} />
        <Route path="*" element={<Homepage/>} />



      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App