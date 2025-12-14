import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Breadcrumbs.css';

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav aria-label="breadcrumb" className="breadcrumbs">
      <ol>
        <li><Link to="/recipes">Trang chủ</Link></li>
        {pathnames.map((name, idx) => {
          const routeTo = '/' + pathnames.slice(0, idx + 1).join('/');
          const isLast = idx === pathnames.length - 1;
          return isLast ? (
            <li key={routeTo} aria-current="page">{decodeURIComponent(name)}</li>
          ) : (
            <li key={routeTo}><Link to={routeTo}>{decodeURIComponent(name)}</Link></li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
