import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/Main'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className = "pages">
          <Routes>
            <Route
              path='/'
              element={<Main />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
