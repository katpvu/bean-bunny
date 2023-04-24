import './index.css'

const SearchBar = (props) => {

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
        }
      };

    const handleSearchSubmit = () => {
        fetch('https://api.yelp.com/v3/businesses/search?location=San%20Jose&term=coffee&radius=5000&open_now=true&sort_by=best_match&limit=10', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }

      


    const styles = {
        center: "center",
        A: "search-bar",
        B: "search-bar-container"
    }
    return (
        <div className={`${styles.B} ${styles.center}`}>
            {/* <form onSubmit={handleSearchSubmit}> */}
                <input className={`${styles.A}`} type="text" placeholder="search bar" />
            {/* </form> */}
        </div>
    )
};
export default SearchBar