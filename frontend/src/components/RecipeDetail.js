import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from './SEO';
import SchemaRecipe from './SchemaRecipe';
import Checklist from './Checklist';
import '../styles/RecipeDetail.css';

function RecipeDetail() {
	const { id } = useParams();
	const [recipe, setRecipe] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isGuiding, setIsGuiding] = useState(false); // Chế độ hướng dẫn
	const [currentStep, setCurrentStep] = useState(0);
	const [timer, setTimer] = useState(0);
	const [isTimerRunning, setIsTimerRunning] = useState(false);

	useEffect(() => {
		fetch(`http://localhost:8080/api/recipes/${id}`)
			.then(res => res.json())
			.then(data => {
				setRecipe(data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, [id]);

	// Timer đếm ngược
	useEffect(() => {
		if (isTimerRunning && timer > 0) {
			const interval = setInterval(() => {
				setTimer(t => t - 1);
			}, 1000);
			return () => clearInterval(interval);
		} else if (timer === 0) {
			setIsTimerRunning(false);
		}
	}, [isTimerRunning, timer]);

	if (loading) return <div className="detail-loading"><div className="spinner"></div><p>Đang tải...</p></div>;
	if (!recipe) return <div className="detail-notfound"><h2>Không tìm thấy công thức</h2><Link to="/recipes" className="back-btn">Quay lại</Link></div>;

	const steps = JSON.parse(recipe.steps);

	const startGuiding = () => {
		setIsGuiding(true);
		setCurrentStep(0);
		const firstTime = steps[0].time || 0;
		setTimer(firstTime);
		setIsTimerRunning(firstTime > 0); // ← Đảm bảo timer bật/tắt đúng
	};

	const nextStep = () => {
		if (currentStep < steps.length - 1) {
			const next = currentStep + 1;
			setCurrentStep(next);
			const nextTime = steps[next].time || 0;
			setTimer(nextTime);
			setIsTimerRunning(nextTime > 0); // Tự động chạy nếu có thời gian
		}
	};

	const prevStep = () => {
		if (currentStep > 0) {
			const prev = currentStep - 1;
			setCurrentStep(prev);
			const prevTime = steps[prev].time || 0;
			setTimer(prevTime);
			setIsTimerRunning(prevTime > 0); // Tự động chạy lại timer của bước trước
		}
	};

	const formatTime = (seconds) => {
		const m = Math.floor(seconds / 60);
		const s = seconds % 60;
		return `${m}:${s < 10 ? '0' : ''}${s}`;
	};

		return (
			<main className="detail-page" itemScope itemType="https://schema.org/Recipe">
				<SEO
					title={`${recipe.title} - Công Thức Làm Bánh`}
					description={recipe.shortDescription}
					image={recipe.imageUrl ? `http://localhost:8080${recipe.imageUrl}` : ''}
					url={window.location.href}
				/>
				<SchemaRecipe recipe={recipe} />
				{!isGuiding ? (
					// CHẾ ĐỘ XEM THƯỜNG
					<>
						<header className="detail-hero">
							<img src={recipe.imageUrl ? `${recipe.imageUrl}` : ''} alt={recipe.title} className="detail-hero-img" itemProp="image" />
							<div className="hero-overlay">
								<span className={`type-badge type-${recipe.type}`}>{recipe.type.toUpperCase()}</span>
								<h1 className="detail-title" itemProp="name">{recipe.title}</h1>
								<p className="detail-desc" itemProp="description">{recipe.shortDescription}</p>
							</div>
						</header>
						<article className="detail-content">
							<section className="ingredients-section" itemProp="recipeIngredient">
								<h2>Nguyên liệu</h2>
								<pre className="ingredients-text">{recipe.ingredients}</pre>
							</section>

							{/* Checklist: split ingredients into array and pass to Checklist */}
							<Checklist ingredients={(recipe.ingredients || '').split('\n').map(s => s.trim()).filter(Boolean)} />
							<div className="start-button-container">
								<motion.button
									whileHover={{ scale: 1.08 }}
									whileTap={{ scale: 0.95 }}
									className="start-baking-btn"
									onClick={startGuiding}
								>
									Bắt Đầu Làm Bánh Ngay!
								</motion.button>
							</div>
						</article>
					</>
				) : (
					// CHẾ ĐỘ HƯỚNG DẪN TỪNG BƯỚC
					<section className="guiding-mode">
						<div className="step-counter">
							Bước {currentStep + 1} / {steps.length}
						</div>
						{timer > 0 && (
							<div className="timer-display">
								{formatTime(timer)}
							</div>
						)}
						<motion.div
							key={currentStep}
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							className="step-content"
						>
							<h2>{steps[currentStep].description}</h2>
						</motion.div>
						<div className="step-controls">
							<button onClick={prevStep} disabled={currentStep === 0} className="step-btn">← Bước trước</button>
							{currentStep < steps.length - 1 ? (
								<button onClick={nextStep} className="step-btn next">Tiếp theo →</button>
							) : (
								<button onClick={() => setIsGuiding(false)} className="step-btn finish">Hoàn thành!</button>
							)}
						</div>
					</section>
				)}
				<nav className="detail-actions">
					<Link to="/recipes" className="back-btn">Quay lại danh sách</Link>
				</nav>
			</main>
		);
}

export default RecipeDetail;