import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Library } from './pages/Library';
import { Stats } from './pages/Stats';
import { BookDetail } from './pages/BookDetail';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/library' element={<Library />} />
          <Route path='/stats' element={<Stats />} />
          <Route path='/book/:id' element={<BookDetail/>}/>
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;