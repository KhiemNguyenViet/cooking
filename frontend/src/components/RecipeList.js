import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RecipeList.css';
import SEO from './SEO';
import API_URL from '../config';

function RecipeList() {
	const [recipes, setRecipes] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`${API_URL}/api/recipes`)
			.then(res => res.json())
			.then(data => {
				setRecipes(data);
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
				alert('Không kết nối được backend!');
			});
	}, []);

	if (loading) {
		return <div className="loading">Đang tải công thức...</div>;
	}

		return (
			<main className="recipes-container">
				{/* SEO meta */}
				<SEO
					title="Công Thức Làm Bánh - Tổng Hợp Hướng Dẫn Chi Tiết"
					description="Khám phá các công thức làm bánh đa dạng với hướng dẫn từng bước chi tiết, danh sách nguyên liệu, và kỹ thuật nướng."
					url={window.location.href}
				/>
				<header className="recipes-header">
					<h1 className="recipes-title">Danh Sách Công Thức Làm Bánh</h1>
					<p className="recipes-subtitle">Chọn món bạn thích để xem chi tiết!</p>
				</header>
				<section className="recipes-grid" aria-label="Danh sách công thức">
					{recipes.map(recipe => (
						<Link
							key={recipe.id}
							to={`/recipe/${recipe.id}`}
							className="recipe-card-link"
						>
							<article className="recipe-card">
								<img
									src={recipe.imageUrl}
									alt={recipe.title}
									className="recipe-image"
								/>
								<div className="recipe-overlay">
									<span className={`type-badge type-${recipe.type}`}>
										{recipe.type && recipe.type.toUpperCase()}
									</span>
								</div>
								<div className="recipe-content">
									<h3 className="recipe-title">{recipe.title}</h3>
									<p className="recipe-desc">{recipe.shortDescription}</p>
								</div>
							</article>
						</Link>
					))}
				</section>
				{/* <div className="back-home">
					<Link to="/recipes" className="back-home-btn">Về Trang Chủ</Link>
				</div> */}
			</main>
		);
}

export default RecipeList;