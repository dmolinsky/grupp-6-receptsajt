import SearchBar from '../../components/searchbar/SearchBar.jsx';
import RecipeGrid from '../../components/RecipeGrid/RecipeGrid';
import CategoryList from '../../components/categoryList/CategoryList';

function Home() {
    return (
        <main className="home">
            <CategoryList />
            <SearchBar />
            <RecipeGrid />
        </main>
    );
}

export default Home;
