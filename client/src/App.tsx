import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Shortener from './components/Shortener'
import List from './components/List'
import Redirect from './components/assets/Redirect'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Shortener />} />
          <Route path='shortenurls' element={<List />} />
          <Route path='shortenurls/:shorten' element={<Redirect />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
