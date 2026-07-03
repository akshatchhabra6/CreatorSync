import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as authService from '../services/authService';

const Login = () => {
  const [role, setRole] = useState('creator');
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await authService.login(form);
      if (data.user.role !== role) {
        setError(`This account is registered as a ${data.user.role}, not a ${role}.`);
        setLoading(false);
        return;
      }
      login(data);
      navigate(data.user.role === 'brand' ? '/brand/dashboard' : '/creator/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-sky-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary">
            <i className="fa-solid fa-bolt"></i> CreatorSync
          </Link>
          <h2 className="text-xl font-semibold mt-4">Welcome Back</h2>
          <p className="text-slate-500 text-sm">Enter your credentials to access your dashboard.</p>
        </div>

        <div className="card">
          <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
            {['creator', 'brand'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                  role === r ? 'bg-white shadow text-primary' : 'text-slate-500'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2 mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium block mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                className="input-field"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Password</label>
              <input
                type="password"
                name="password"
                className="input-field"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary justify-center mt-2">
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary font-medium">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
