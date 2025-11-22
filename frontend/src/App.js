import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Import components
import Home from './components/Home';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import Header from './components/Header';

function App() {
  const location = useLocation(); // Lấy URL hiện tại

  return (
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
      </Routes>
    </AnimatePresence>
  );
}

export default App;