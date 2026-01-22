
import '../styles/Register.css';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		name: '',
		email: '',
		phone: '',
		address: '',
		password: '',
		confirm: '',
		// role không cho nhập, luôn là USER
		avatarUrl: ''
	});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');
		// Validate
		if (!form.name || !form.email || !form.phone || !form.address || !form.password || !form.confirm) {
			setError('Vui lòng nhập đầy đủ thông tin (trừ avatar).');
			return;
		}
		if (form.password !== form.confirm) {
			setError('Mật khẩu xác nhận không khớp.');
			return;
		}
		// Gọi API đăng ký
		try {
			const res = await fetch('http://localhost:8080/api/customers/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: form.name,
					email: form.email,
					phone: form.phone,
					address: form.address,
					password: form.password,
					role: 'USER',
					avatarUrl: form.avatarUrl
				})
			});
			if (!res.ok) {
				const msg = await res.text();
				setError(msg || 'Đăng ký thất bại.');
				return;
			}
			setSuccess('Đăng ký thành công! Chuyển sang trang đăng nhập...');
			setTimeout(() => navigate('/login'), 1500);
		} catch (err) {
			setError('Lỗi kết nối máy chủ.');
		}
	};

	return (
		<div className="auth-container">
			<form className="auth-form" onSubmit={handleSubmit}>
				<h2>Đăng ký</h2>
				{error && <div className="auth-error">{error}</div>}
				{success && <div className="auth-success">{success}</div>}
				<input type="text" name="name" placeholder="Tên hiển thị" value={form.name} onChange={handleChange} />
				<input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
				<input type="text" name="phone" placeholder="Số điện thoại" value={form.phone} onChange={handleChange} />
				<input type="text" name="address" placeholder="Địa chỉ" value={form.address} onChange={handleChange} />
				<input type="password" name="password" placeholder="Mật khẩu" value={form.password} onChange={handleChange} />
				<input type="password" name="confirm" placeholder="Xác nhận mật khẩu" value={form.confirm} onChange={handleChange} />
				{/* Trường role bị ẩn, luôn là USER */}
				<input type="text" name="avatarUrl" placeholder="Avatar URL (tùy chọn)" value={form.avatarUrl} onChange={handleChange} />
				<button type="submit">Đăng ký</button>
				<div className="auth-link">
					Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
				</div>
			</form>
		</div>
	);
}

export default Register;
