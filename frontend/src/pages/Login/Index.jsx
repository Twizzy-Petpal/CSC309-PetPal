import React from 'react';
import { useNavigate } from 'react-router-dom/';
import { useState } from 'react';

function Login() {
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleClick = (event) =>
        navigate("/accounts/registration")


    function handle_login(event) {
        let data = new FormData(event.target);

        fetch('http://localhost:8000/accounts/', {
            method: 'POST',
            body: data
        })
            .then(function (response) {
                return response.json()
            }
            )
            .then(json => {
                if ('access_token' in json) {
                    localStorage.setItem('access_token', json.access_token);
                    localStorage.setItem('username', data.get('username'));
                    localStorage.setItem('accounttype', json.accounttype);
                    localStorage.setItem('user_id', json.user_id);
                    navigate('/');
                    // navigate to the landing page
                }
                else if ('message' in json) {
                    setError(json.message.toString());
                }
                else {
                    setError("Unknown error while signing in.")
                }
            })
            .catch(error => {
                console.error("catch")
                setError(error.toString());
            });

        event.preventDefault();
    }


    return (
        <>
            <div data-bs-theme="petpal">
                <div className="main mh-100 d-flex justify-content-center mx-0">
                    <div className="d-flex w-75 justify-center align-items-center bg-primary-brown mx-5">
                        {/* <LoginForm handle_login={handle_login} error={error}/> */}
                        <form className="w-100 align-items-center" id="login" onSubmit={handle_login}>
                            <h1 className="text-primary-cream">Welcome Back!</h1>
                            <div className="form-group row text-primary-cream">
                                <label className="row-form-label h5" htmlFor="username">Username</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control bg-primary-cream font-plain" id="username" name="username" placeholder="username123" required />
                                </div>
                            </div>
                            <div className="form-group row text-primary-cream">
                                <label className="row-form-label h5" htmlFor="password">Password</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control bg-primary-cream font-plain" id="password" name="password" required />
                                </div>
                            </div>
                            <p class="smallpar">{error}</p>
                            <button type="submit" className="btn btn-lg btn-primary-orange m-3 ms-0 shadow-sm" required>Login</button>
                            <div className="signupcontainer">
                                <p className="h6 font-plain text-primary-cream">Don't have an account?</p>
                                <button type="button" className="btn btn-lg btn-primary-cream m-3 ms-0 shadow-sm" onClick={handleClick}>Sign Up</button>
                            </div>
                        </form>
                    </div>

                    <div className="align-self-end justify-content-right w-25 hide-md">
                        <img src="/imgs/bunny.png" class="bunny" width="100%" height="100%" alt=""></img>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;