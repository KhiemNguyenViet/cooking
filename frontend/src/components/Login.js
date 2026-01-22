import '../styles/Login.css';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		setError('');
		if (!email || !password) {
			setError('Vui lòng nhập đầy đủ thông tin.');
			return;
		}
		// Đăng nhập giả lập: chỉ cần nhập bất kỳ
		login({ email, name: email.split('@')[0] });
		navigate('/recipes');
	};

	return (
		<div className="auth-container">
			<form className="auth-form" onSubmit={handleSubmit}>
				<h2>Đăng nhập</h2>
				{error && <div className="auth-error">{error}</div>}
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Mật khẩu"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button type="submit">Đăng nhập</button>
				<div className="auth-link">
					Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
				</div>
			</form>
		</div>
	);
}

export default Login;
