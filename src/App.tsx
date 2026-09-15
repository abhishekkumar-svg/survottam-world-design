import { useLenis } from "./hooks/useLenis"
import Homepage from "./pages/homePage/homepage"

function App() {
  useLenis()
  return (
    <>
    <Homepage/>
    </>
  )
}

export default App
