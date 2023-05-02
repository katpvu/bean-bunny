import { useState } from 'react';
import './index.css'
import { fetchSearches } from '../../store/search';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const SearchBar = (props) => {
    const dispatch = useDispatch()
    const history = useHistory();
    const [search, setSearch] = useState("");


    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const location = {
            location: encodeURIComponent(search)
        }
        history.push(`/search/${location?.location}`)
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
                <input className={`${styles.A}`} type="text" placeholder="Search a city" onChange={(e) => setSearch(e.target.value)}/>
            </form>
        </div>
    )
};
export default SearchBar