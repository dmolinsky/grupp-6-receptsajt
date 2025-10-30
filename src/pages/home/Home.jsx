import SearchBar from '../../components/searchbar/SearchBar.jsx';
import RecipeGrid from '../../components/RecipeGrid/RecipeGrid';
import CategoryList from '../../components/categoryList/CategoryList';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchbarKey, setSearchbarKey] = useState(0);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.clearSearch) {
            setSearchQuery('');
            setSearchbarKey((k) => k + 1);
        }
    }, [location.state]);

    const hasActiveSearch = searchQuery.trim().length > 0;

    return (
        <main className="home">
            <CategoryList />
            <SearchBar key={searchbarKey} onSearch={setSearchQuery} />
            <div className="searchbar__reset-wrapper">
                {hasActiveSearch && (
                    <button
                        className="searchbar__reset"
                        onClick={() => {
                            setSearchQuery('');
                            setSearchbarKey((k) => k + 1);
                        }}
                    >
                        Rensa sökning
                    </button>
                )}
            </div>

            <RecipeGrid searchQuery={searchQuery} />
        </main>
    );
}

export default Home;
