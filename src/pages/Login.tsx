import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Loader2 } from 'lucide-react';

export function Login() {
    const {signIn, signUp } = useAuth();
    const [mode, setMode] = useState<'login' | 'register'> ('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email || !password) return;
        setLoading(true);
        setError(null);
        try {
            if (mode === 'login') {
                await signIn(email, password);

            }else {
                await signUp(email, password);
            }
        } catch (err: any) {
            setError(err.message || 'Ocurrió un error');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='min-h-screen bg-slate-950 flex items-center justify-center p-4'>
            <div className='w-full max-w-sm space-y-8'>

                {/* Logo */}
                <div className='text-center'>
                    <div className='flex items-center justify-center gap-2 mb-2'>
                        <BookOpen size={32} className='text-blue-400' />
                        <h1 className='text-3xl font-bold text-white'>BookDash</h1>
                    </div>
                    <p className='text-slate-400 text-sm'>Tu biblioteca personal</p>
                </div>

                {/* Card */}
                <div className='bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6'>
                    <h2 className='text-lg font-semibold text-white text-center'>
                        {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
                    </h2>

                    <div className='space-y-4'>
                        <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className='w-full px-4 py-3 bg-slate-800 border border-slate-700
                                    rounded-lg text-white placeholder-slate-500 text-sm
                                    focus:outline-none focus:border-blue-500'
                        />
                        <input
                        type='password'
                        placeholder='Contraseña'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        className='w-full px-4 py-3 bg-slate-800 border border-slate-700
                                    rounded-lg text-white placeholder-slate-500 text-sm
                                    focus:outline-none focus:border-blue-500'
                        />
                    </div>

                    {error && (
                        <p className='text-red-400 text-sm text-center'>{error}</p>
                    )}

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className='w-full flex items-center justify-center gap-2 py-3
                                bg-blue-600 hover:bg-blue-700 disabled:opacity-50
                                text-white text-sm font-medium rounded-lg transition-colors'>
                        {loading && <Loader2 size={16} className='animate-spin' />}
                        {mode === 'login' ? 'Entrar' : 'Registrarse'}
                    </button>

                    <p className='text-center text-sm text-slate-500'>
                        {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                        {' '}
                        <button
                        onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(null); }}
                        className='text-blue-400 hover:underline'>
                        {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
  );
}