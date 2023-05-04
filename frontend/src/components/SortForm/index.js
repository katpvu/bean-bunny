const SortForm = ({setCurrentSort}) => {
    return (
        <form>
            <label>Sort by:
                <select onChange={(e) => setCurrentSort(e.target.value)}>
                    <option value="Highest Rating">Highest Rating</option>
                    <option value="Lowest Rating">Lowest Rating</option>
                </select>
            </label>
        </form>
    )
};

export default SortForm;