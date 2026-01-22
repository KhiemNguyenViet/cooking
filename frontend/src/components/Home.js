import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from './SEO';
import API_URL from '../config';
import '../styles/Home.css';

function Home() {
	const [data, setData] = useState({
		title: 'Công Thức Làm Bánh',
		description: 'Học làm bánh ngon tại nhà – đơn giản, dễ làm!'
	});

	useEffect(() => {
		fetch(`${API_URL}/api/home`)
			.then(res => res.json())
			.then(setData)
			.catch(() => console.log('Backend chưa chạy'));
	}, []);

	// Fallback values if API returns empty
	const displayTitle = data.title || 'Công Thức Làm Bánh';
	const displayDescription = data.description || 'Học làm bánh ngon tại nhà – đơn giản, dễ làm!';

		return (
			<main className="home-container">
				<SEO
					title="Công Thức Làm Bánh - Hướng Dẫn Chi Tiết Từng Bước"
					description={displayDescription}
					url={window.location.href}
				/>
				<motion.img
					src="/imgs/logo.jpg"
					alt="Logo tiệm bánh"
					className="home-image"
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
				/>
				<header>
					<motion.h1
						className="home-title"
						initial={{ y: -50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.7, delay: 0.3 }}
					>
						{displayTitle}
					</motion.h1>
					<motion.p
						className="home-description"
						initial={{ y: 30, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.7, delay: 0.5 }}
					>
						{displayDescription}
					</motion.p>
				</header>
				<section aria-labelledby="home-intro" className="visually-hidden">
					<h2 id="home-intro">Giới thiệu website công thức làm bánh</h2>
					<p>
						Tiệm Bánh Online là website chia sẻ công thức làm bánh tại nhà,
						hướng dẫn chi tiết từng bước, phù hợp cho người mới bắt đầu.
					</p>
				</section>
				{/* NÚT CÓ HIỆU ỨNG */}
				<motion.div
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					transition={{ type: "spring", stiffness: 400 }}
				>
					<Link to="/recipes" className="view-recipes-btn">
						Xem Công Thức Ngay
					</Link>
				</motion.div>
			</main>
		);
}

export default Home;