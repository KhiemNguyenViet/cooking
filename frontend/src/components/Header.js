import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
	return (
		<header className="header">
			<div className="header-container">
				<Link to="/" className="header-logo">
					<img
						src="/imgs/logo-tiem-lam-banh-chat-luong-cao.jpg"
						alt="Logo"
						className="header-logo-img"
					/>
					<h1 className="header-title">Tiệm Bánh Online</h1>
				</Link>
				<nav className="header-nav">
					<Link to="/" className="nav-link">Trang Chủ</Link>
					<Link to="/recipes" className="nav-link active">Công Thức</Link>
				</nav>
			</div>
		</header>
	);
}

export default Header;