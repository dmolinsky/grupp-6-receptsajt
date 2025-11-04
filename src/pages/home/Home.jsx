import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RecipeGridContainer } from '../../components/RecipeGrid/RecipeGrid';
import CategoryList from '../../components/categoryList/CategoryList';
import SearchBar from '../../components/searchbar/SearchBar.jsx';

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

            <RecipeGridContainer searchQuery={searchQuery} />
        </main>
    );
}

export default Home;
