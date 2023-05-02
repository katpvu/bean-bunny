import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './index.css'
import { login } from '../../store/session';
import { Redirect } from 'react-router-dom';
import { checkErrors } from '../../utils';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import bean from '../../assets/bean-logo-black.png'
import loginBeans from '../../assets/login-beans.jpg'
import SplashPage from "../SplashPage"

const LoginFormPage = (props) => {
    // hooks
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [splash, setSplash] = useState(true);

    if (sessionUser) return <Redirect to="/" />;


    const handleSubmit = e => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        };
        dispatch(login(user))
            .catch(async res => {
                let errors = await checkErrors(res)
                setErrors(errors)
            });
    };

    const handleDemoLogIn = (e) => {
        e.preventDefault();
        const demoUser = {
            username: 'demobunny',
            password: 'password'
        }
        dispatch(login(demoUser))
            .then(history.push("/"))
    };

    const styles = {
        center: "center",
        B: "create-acc-line",
        C: "form-input-container",
        D: "submit-buttons-container",
        E: "bunny-logo",
        F: "center",
        G: "errors",
        H: "login-container"
    };

    const eventHandler = {
        onGetStarted: () => setSplash(false) 
    }

    return (

        <>

        {splash && (
            <SplashPage eHandler={eventHandler}/>
            
        )}
        
        {!splash && (
        <div className={`${styles.H}`}>
            <div className="left-half">
                <img src={loginBeans} />
            </div>

            <div className="right-half">
                <div className={`${styles.F}`}>
                    <img src={bean} className={`${styles.E}`} alt="logo"/>
                </div>
                <h2 className="login-form-title">Welcome back!</h2>
                <form onSubmit={handleSubmit} className="form-container">
                    <ul>
                        {errors.map(error => <li className={`${styles.G} ${styles.center}`}key={error}>{error}</li>)}
                    </ul>

                    <div className={`${styles.center} ${styles.C}`}>
                        <div className="input-container">
                            <label >Username
                                <input required className="sign-in-text-box" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </label>
                        </div>
                        <div className="input-container">
                            <label>Password
                                <input required className="sign-in-text-box" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </label>
                        </div>
                    </div>
                    <div className={`${styles.center} ${styles.B}`} >
                        <p >Not a member yet? <Link to="/signup">Create an account</Link></p>
                    </div>
                    <div className={`${styles.center} ${styles.D}`}>
                        <button className="login-button">Sign In</button>

                        <button className="login-button" onClick={handleDemoLogIn}>Log In as Demo User!</button>
                    </div>
                </form>
            </div>
        </div>
        )}
        </>
    )

};

export default LoginFormPage;