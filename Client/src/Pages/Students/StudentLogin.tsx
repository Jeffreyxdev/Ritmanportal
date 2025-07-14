
// 📁 src/pages/student/StudentLogin.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../Content/AuthContent';
import { loginUser } from '../Services/authAPI';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  login: (data: any) => void;
  // add other properties if needed
};

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext) as AuthContextType | undefined;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ email, password });
      if (data.user.role !== 'student') return alert('Students only');
      if (authContext && authContext.login) {
        authContext.login(data);
        navigate('/student/dashboard');
      } else {
        alert('Auth context not available');
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Student Login</h2>
      <input className="block w-full mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="block w-full mb-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="bg-green-500 text-white px-4 py-2" type="submit">Login</button>
    </form>
  );
};

export default StudentLogin;