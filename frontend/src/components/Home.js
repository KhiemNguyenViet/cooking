import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Home.css';

function Home() {
	const [data, setData] = useState({
		title: 'Công Thức Làm Bánh',
		description: 'Học làm bánh ngon tại nhà – đơn giản, dễ làm!'
	});

	useEffect(() => {
		fetch('http://localhost:8080/api/home')
			.then(res => res.json())
			.then(setData)
			.catch(() => console.log('Backend chưa chạy'));
	}, []);

	return (
		<div className="home-container">
			<motion.img
				src="/imgs/logo.jpg"
				alt="Logo tiệm bánh"
				className="home-image"
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			/>

			<motion.h1
				className="home-title"
				initial={{ y: -50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.7, delay: 0.3 }}
			>
				{data.title}
			</motion.h1>

			<motion.p
				className="home-description"
				initial={{ y: 30, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.7, delay: 0.5 }}
			>
				{data.description}
			</motion.p>

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
		</div>
	);
}

export default Home;