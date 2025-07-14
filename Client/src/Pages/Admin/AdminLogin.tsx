// 📁 src/pages/admin/AdminLogin.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../Content/AuthContent';
import { loginUser } from '../Services/authAPI';
import { useNavigate } from 'react-router-dom';

// Define the AuthContextType interface if not already defined elsewhere
interface AuthContextType {
  login: (data: any) => void;
  // add other properties if needed
}

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext) as AuthContextType | undefined;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!authContext || typeof authContext.login !== 'function') {
      alert('Auth context not available');
      return;
    }
    try {
      const { data } = await loginUser({ email, password });
      if (data.user.role !== 'admin') return alert('Admins only');
      authContext.login(data);
      navigate('/admin/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <input className="block w-full mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="block w-full mb-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2" type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;
