import { useLenis } from "./hooks/useLenis"
import Header from "./pages/homePage/Header/Header"
import Homepage from "./pages/homePage/homepage"

function App() {
  useLenis()
  return (
    <>
    <Header/>
    <Homepage/>
    </>
  )
}

export default App
