import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RecipeList.css';
import Header from './Header';
import Footer from './Footer';

function RecipeList() {
	const [recipes, setRecipes] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch('http://localhost:8080/api/recipes')
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
		<div>
			{<Header />}
			{/* list of recipes */}
			<div className="recipes-container">
				<div className="recipes-header">
					<h1 className="recipes-title">Danh Sách Công Thức Làm Bánh</h1>
					<p className="recipes-subtitle">Chọn món bạn thích để xem chi tiết!</p>
				</div>

				<div className="recipes-grid">
					{recipes.map(recipe => (
						<Link
							key={recipe.id}
							to={`/recipe/${recipe.id}`}
							className="recipe-card-link"
						>
							<div className="recipe-card">
								<img
									src={`${recipe.imgURL}`}
									alt={recipe.name}
									className="recipe-image"
								/>
								<div className="recipe-overlay">
									<span className={`type-badge type-${recipe.type}`}>
										{recipe.type.toUpperCase()}
									</span>
								</div>
								<div className="recipe-content">
									<h3 className="recipe-title">{recipe.name}</h3>
									<p className="recipe-desc">{recipe.description}</p>
								</div>
							</div>
						</Link>
					))}
				</div>

				<div className="back-home">
					<Link to="/" className="back-home-btn">Về Trang Chủ</Link>
				</div>
			</div>
			{<Footer />}
		</div>
	);
}

export default RecipeList;