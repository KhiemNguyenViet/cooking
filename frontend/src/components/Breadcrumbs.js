import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import API_URL from '../config';
import '../styles/Breadcrumbs.css';

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  const [recipeTitle, setRecipeTitle] = useState(null);

  // Fetch recipe title khi URL thay đổi
  useEffect(() => {
    if (pathnames[0] === 'recipe' && pathnames[1]) {
      const recipeId = pathnames[1];
      fetch(`${API_URL}/api/recipes/${recipeId}`)
        .then(res => res.json())
        .then(data => setRecipeTitle(data.title))
        .catch(() => setRecipeTitle(null));
    } else {
      setRecipeTitle(null);
    }
  }, [pathnames]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Trang chủ",
        "item": window.location.origin + "/recipes"
      },
      ...pathnames.map((name, idx) => ({
        "@type": "ListItem",
        "position": idx + 2,
        "name":
          idx === 1 && pathnames[0] === 'recipe' && recipeTitle
            ? recipeTitle
            : decodeURIComponent(name),
        "item": window.location.origin + '/' + pathnames.slice(0, idx + 1).join('/')
      }))
    ]
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <nav aria-label="breadcrumb" className="breadcrumbs">
        <ol>
          <li><Link to="/recipes">Trang chủ</Link></li>
          {pathnames.map((name, idx) => {
            const routeTo = '/' + pathnames.slice(0, idx + 1).join('/');
            const isLast = idx === pathnames.length - 1;

            const displayName =
              idx === 1 && pathnames[0] === 'recipe' && recipeTitle
                ? recipeTitle
                : decodeURIComponent(name);

            return isLast ? (
              <li key={routeTo} aria-current="page">
                {displayName}
              </li>
            ) : (
              <li key={routeTo}>
                <Link to={routeTo}>{displayName}</Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );

}

export default Breadcrumbs;