import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Library } from './pages/Library';
import { Stats } from './pages/Stats';
import { BookDetail } from './pages/BookDetail';
import { Login } from './pages/Login';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className='min-h-screen bg-slate-950 flex items-center justify-center'>
        <div className='w-8 h-8 border-2 border-blue-400 border-t-transparent
                        rounded-full animate-spin' />
      </div>
    );
  }

  if (!user) return <Login />;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/library' element={<Library />} />
          <Route path='/stats' element={<Stats />} />
          <Route path='/book/:id' element={<BookDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;