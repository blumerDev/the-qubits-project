import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import FoodsPage from './pages/FoodsPage';
import MenusPage from './pages/MenusPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/foods" element={<FoodsPage />} />
          <Route path="/menus" element={<MenusPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;