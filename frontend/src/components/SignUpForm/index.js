import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './index.css'
import { login, signup } from '../../store/session';
import { Redirect } from 'react-router-dom';
import { checkErrors } from '../../utils';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const SignUpForm = (props) => {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = e => {
        e.preventDefault();
        const newUser = {
            username: username,
            password: password
        };
        dispatch(signup(newUser))
            .catch(async res => {
                let errors = await checkErrors(res)
                console.log(errors)
                setErrors(errors)
            });
    };

    const styles = {
        A: "center",
        B: "create-acc-line",
        C: "form-input-container",
        D: "submit-buttons-container",
        E: "errors"
    }

    return (
        <div className="login-container">
            <h2 className="login-form-title">Create an Account</h2>
            <form onSubmit={handleSubmit} className="form-container">
                <ul className={`${styles.A} ${styles.E}`}>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>

                <div className={`${styles.A} ${styles.C}`}>
                    <div className="input-container">
                        <label >Username
                            <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </label>
                    </div>
                    <div className="input-container">
                        <label>Password
                            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
    )
};

export default SignUpForm;