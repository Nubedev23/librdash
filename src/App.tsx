import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Library } from './pages/Library';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/library' element={<Library />} />
          {/* Agregar más rutas aquí */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;