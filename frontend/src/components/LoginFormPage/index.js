import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './index.css'
import { login } from '../../store/session';
import { Redirect } from 'react-router-dom';
// import { checkErrors } from '../../utils';

const LoginFormPage = (props) => {
    // hooks
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = e => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        };
        dispatch(login(user))
            // .catch(res => {
            //     let errors = await checkErrors(res)
            //     console.log(errors)
            //     setErrors(errors)
            // })
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            })
    };

    const handleDemoLogIn = (e) => {
        e.preventDefault();
        const demoUser = {
            username: 'demobunny',
            password: 'password'
        }
        dispatch(login(demoUser));
    }

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} className="form-container">
                <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>

                <div className="form-input-container">
                    <div className="input-container">
                        <label forhtml="username">Username
                            <input required id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </label>
                    </div>
                    <div className="input-container">
                        <label>Password
                            <input required type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                    </div>
                </div>
                
                <div className="submit-buttons-container">
                    <button>Sign In</button>
                    <br></br>
                    <button onClick={handleDemoLogIn}>Log In as Demo User!</button>
                </div>
            </form>
        </div>
    )

};

export default LoginFormPage;