import { Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header.jsx';
import ScrollToTop from './components/scrollToTop/ScrollToTop.jsx';
import './index.css';
import CategoryPage from './pages/category/CategoryPage.jsx';
import Home from './pages/home/Home.jsx';
import NotFound from './pages/notFound/NotFound.jsx';
import RecipePage from './pages/recipe/RecipePage.jsx';

function App() {
    return (
        <div className="App">
            <ScrollToTop />
            <Header />
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/category/:categoryName"
                        element={<CategoryPage />}
                    />
                    <Route path="/recipe/:recipeId" element={<RecipePage />} />
                    <Route path="/not-found" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
