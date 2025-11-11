import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './store';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

function Home() {
    return (
        <div className="p-8 text-center">
            <h1 className="text-3xl font-bold">Chào mừng!</h1>
            <Link to="/login" className="text-blue-600">Đi đến Login</Link>
        </div>
    );
}

function Dashboard() {
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // React Router hook
    console.log('Welcome to Dashboard');

    useEffect(() => {
        const fetchDashboard = async () => {
            const token = localStorage.getItem('tokenReactHookDemo');
            if (!token) return navigate('/login');

            try {
                const res = await fetch('http://localhost:8000/api/auth/dashboard', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setMessage(data.message);
                } else {
                    localStorage.removeItem('tokenReactHookDemo'); // error token → logout
                    navigate('/login');
                }
            } catch (err) {
                console.error(err);
                navigate('/login');
            }
        };

        fetchDashboard();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('tokenReactHookDemo');
        navigate('/login');
    };

    return (
        <div className="p-8 text-center">
            <h1 className="text-2xl">Xin chào, bạn đã đăng nhập!</h1>
            <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
                Đăng xuất
            </button>
        </div>
    );
}

function LoginForm() {
    const [email, setEmail] = useState(''); // (1) react hook useState
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const dispatch = useDispatch(); // (2) React hook của Redux
    const navigate = useNavigate(); // (3) React Router hook
    const user = useSelector((state) => state.auth.user); // (4) react hook userSelector  

    useEffect(() => {   // (5) React hook useEffect
        if (localStorage.getItem('tokenReactHookDemo')) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                console.log('Đăng nhập thành công');
                localStorage.setItem('tokenReactHookDemo', data.token);
                navigate('/dashboard');
            } else {
                console.log(data.message);
                setMsg(data.message);
            }
        } catch (err) {
            console.error(err);
            setMsg('Lỗi kết nối server');
        }
    };

    return (
        <div className="from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md h-screen flex flex-col justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Đăng nhập</h2>
                        <p className="text-gray-500 mt-2">Chào mừng quay lại!</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="text"
                                placeholder="admin"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
                            <input
                                type="password"
                                placeholder="123"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                                required
                            />
                        </div>

                        {msg && (
                            <div className="text-center text-sm font-medium p-3 rounded-lg bg-red-50 text-red-700 border border-red-200">
                                {msg}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-3 rounded-lg hover:from-indigo-700 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md"
                        >
                            Đăng nhập
                        </button>
                    </form>

                    <p className="mt-6 text-center text-xs text-gray-500">
                        Gợi ý: <span className="font-mono bg-gray-100 px-2 py-1 rounded">admin</span> / <span className="font-mono bg-gray-100 px-2 py-1 rounded">123</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </>
    );
}