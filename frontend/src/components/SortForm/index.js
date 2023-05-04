const SortForm = () => {
    return (
        <form>
            <label>Sort by:
                <select>
                    <option value="highest-rating">Highest Rating</option>
                    <option value="lowest-rating">Lowest Rating</option>
                </select>
            </label>
        </form>
    )
};

export default SortForm;