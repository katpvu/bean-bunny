import { useEffect, useState } from 'react';
import './index.css'
import { fetchSearches } from '../../store/search';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { clearSearches } from '../../store/search';

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

    useEffect(() => {
        return () => {
            dispatch(clearSearches());
        }
    }, [])

    const styles = {
        center: "center",
        A: "search-bar",
        B: "search-bar-container",
        C: "search-form"
    }

    const capitalize = (string) => {
        return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')
    }
    
    return (
        <div className={`${styles.B} ${styles.center}`}>
            <form className={`${styles.C} ${styles.center}`} onSubmit={handleSearchSubmit}>
                <input className={`${styles.A}`} type="text" placeholder="Search a city" onChange={(e) => setSearch(capitalize(e.target.value))}/>
            </form>
        </div>
    )
};
export default SearchBar