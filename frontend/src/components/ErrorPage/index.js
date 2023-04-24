import "./index.css"
const ErrorPage = () => {

    const styles = {
        center: "center",
        A: "error-content-container"
    }
    return (
        <div className={`${styles.center} ${styles.A}`}>
            <h1 className="sorry">Sorry!</h1>
            <h2 className="page-not-found">Page not found.</h2>
        </div>
    )
};

export default ErrorPage;