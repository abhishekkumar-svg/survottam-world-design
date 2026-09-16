import { useLenis } from "./hooks/useLenis"
import Header from "./pages/homePage/header/header"
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
