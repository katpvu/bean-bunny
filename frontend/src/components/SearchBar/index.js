import { useState } from 'react';
import './index.css'
import { fetchSearches } from '../../store/search';
import { useDispatch } from 'react-redux';


const SearchBar = (props) => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState("");


    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const location = {
            location: encodeURIComponent(search)
        }
        console.log(location)
        dispatch(fetchSearches(location))
    }

    const styles = {
        center: "center",
        A: "search-bar",
        B: "search-bar-container",
        C: "search-form"
    }
    
    return (
        <div className={`${styles.B} ${styles.center}`}>
            <form className={`${styles.C} ${styles.center}`} onSubmit={handleSearchSubmit}>
                <input className={`${styles.A}`} type="text" placeholder="search bar" onChange={(e) => setSearch(e.target.value)}/>
            </form>
        </div>
    )
};
export default SearchBar