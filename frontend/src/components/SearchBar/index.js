import { useEffect, useState } from 'react';
import './index.css'
import { clearSearchesErrors, fetchSearches } from '../../store/search';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { clearSearches } from '../../store/search';
import { checkErrors } from '../../utils';

const SearchBar = ({location}) => {
    const dispatch = useDispatch()
    const history = useHistory();

    const [search, setSearch] = useState("");
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (location) {
            setSearch(location);
            dispatch(fetchSearches({location: location}))
        }
    }, [])

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        dispatch(clearSearchesErrors())
        dispatch(clearSearches());
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

    const capitalize = (string) => {
        return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')
    }
    
    return (
        <div className={`${styles.B} ${styles.center}`}>
            <form className={`${styles.C} ${styles.center}`} onSubmit={handleSearchSubmit}>
                <input 
                    className={`${styles.A}`} 
                    type="text" 
                    value={search} 
                    placeholder="enter a city" 
                    onChange={(e) => setSearch(capitalize(e.target.value))}/>
            </form>
        </div>
    )
};
export default SearchBar