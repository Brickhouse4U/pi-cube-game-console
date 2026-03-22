import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import MainMenu from './pages/MainMenu'
import Games from './pages/Games';
import Options from './pages/Options';


function App() {
  return (
      <HashRouter>
        {/* Routes swap out the entire cube */}
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/games" element={<Games />} />
          <Route path="/options" element={<Options />} />
        </Routes>
      </HashRouter>
  )
}

export default App