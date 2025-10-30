import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/scrollToTop/ScrollToTop.jsx';
import Header from './components/header/Header.jsx';
import Home from './pages/home/Home.jsx';
import CategoryPage from './pages/category/CategoryPage.jsx';
import RecipePage from './pages/recipe/RecipePage.jsx';
import NotFound from './pages/notFound/NotFound.jsx';
import Footer from './components/footer/Footer';

function App() {
    return (
        <div className="App">
            <ScrollToTop />
            <Header />
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/category/:categoryId"
                        element={<CategoryPage />}
                    />
                    <Route path="/recipe/:recipeId" element={<RecipePage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
