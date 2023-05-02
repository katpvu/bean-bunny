import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './index.css'
import { signup } from '../../store/session';
import { Redirect } from 'react-router-dom';
import { checkErrors } from '../../utils';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import bean from '../../assets/bean-logo-black.png'
import loginBeans from '../../assets/login-beans.jpg'

const SignUpForm = (props) => {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = e => {
        e.preventDefault();
        const newUser = {
            username: username,
            email: email,
            password: password
        };
        dispatch(signup(newUser))
            .catch(async res => {
                let errors = await checkErrors(res)
                setErrors(errors)
            });
    };

    const styles = {
        A: "center",
        B: "create-acc-line",
        C: "form-input-container",
        D: "submit-buttons-container",
        E: "errors",
        F: "bunny-logo",
        G: "input-container",
        H: "login-container"
    }


    return (
        <div className={`${styles.A} ${styles.H}`}>
            <div className="left-half">
                <img src={loginBeans} />
            </div>

            <div className="right-half">
                <div className={`${styles.A}`}><img src={bean} className={`${styles.F}`} alt="logo"/></div>
                <h2 className="login-form-title">Create an Account</h2>
                <form onSubmit={handleSubmit} className="form-container">
                    <ul className={`${styles.A} ${styles.E}`}>
                        {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>

                    <div className={`${styles.A} ${styles.C}`}>
                        <div className={`${styles.G} ${styles.A}`}>
                            <label >Email
                                <input required className="sign-in-text-box" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </label>
                        </div>
                        <div className={`${styles.G} ${styles.A}`}>
                            <label >Username
                                <input required className="sign-in-text-box" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </label>
                        </div>
                        <div className={`${styles.G} ${styles.A}`}>
                            <label>Password
                                <input required className="sign-in-text-box" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </label>
                        </div>
                    </div>
                    <div className={`${styles.A} ${styles.B}`}>
                        <p >Already have an account? <Link to="/login">Sign in here!</Link></p>
                    </div>
                    <div className={`${styles.A} ${styles.D}`}>
                        <button className="login-button">Sign Up</button>
                    </div>
                </form>


            </div>
        </div>
    )
};

export default SignUpForm;