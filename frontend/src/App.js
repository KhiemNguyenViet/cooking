import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Import components
import Home from './components/Home';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumbs from './components/Breadcrumbs';

function App() {
  const location = useLocation(); // Lấy URL hiện tại
  const hideLayout = location.pathname === '/';

  return (
    <div className="app-root">
      {!hideLayout && <Header />}
      {!hideLayout && <Breadcrumbs />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/recipes"
          element={
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <RecipeList />
            </motion.div>
          }
        />
        <Route
          path="/recipe/:id"
          element={
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <RecipeDetail />
            </motion.div>
          }
        />
        <Route
          path="*"
          element={
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <main style={{ padding: 24 }}>
                <h2>404 — Không tìm thấy trang</h2>
                <p>Trang bạn yêu cầu không tồn tại. Quay lại <a href="/">trang chủ</a>.</p>
              </main>
            </motion.div>
          }
        />
      </Routes>
      </AnimatePresence>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;