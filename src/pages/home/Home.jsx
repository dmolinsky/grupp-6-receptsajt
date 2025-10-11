import SearchBar from '../../components/searchbar/SearchBar.jsx';
import RecipeGrid from "../../components/RecipeGrid/RecipeGrid";

function Home() {
    return (
        <main className="home">
             <SearchBar />
            <p>Home Page</p>
            <RecipeGrid />
        </main>
    );
}

export default Home;
