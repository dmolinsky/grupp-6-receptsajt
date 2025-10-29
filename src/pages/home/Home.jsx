import SearchBar from '../../components/searchbar/SearchBar.jsx';
import RecipeGrid from '../../components/RecipeGrid/RecipeGrid';
import CategoryList from '../../components/categoryList/CategoryList';
import { useState } from 'react';

function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <main className="home">
            <CategoryList />
            <SearchBar onSearch={(value) => setSearchQuery(value)} />
            <RecipeGrid searchQuery={searchQuery} />
        </main>
    );
}

export default Home;
