import SearchBar from '../../components/searchbar/SearchBar.jsx';
import RecipeGrid from '../../components/RecipeGrid/RecipeGrid';
import CategoryList from '../../components/categoryList/CategoryList';

function Home() {
    return (
        <main className="home">
            <SearchBar />
            <CategoryList />
            <RecipeGrid />
        </main>
    );
}

export default Home;
