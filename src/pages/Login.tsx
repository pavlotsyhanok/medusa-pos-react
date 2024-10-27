import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { medusa } from "../lib/medusa-provider";
import Cookies from "js-cookie";
import "../styles/index.css";
import "../styles/login.css";

const Login = ({ setIsLogged, isLogged }: { isLogged: boolean, setIsLogged: (isLogged: boolean) => void }) => {

    const [visiability, setVisiability] = useState(true);
    const [loginPassword, setLoginPassword] = useState({
        login: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isLogged) {
            navigate("/main");
        }
    }, [isLogged, navigate]);

    const mutation = useMutation({
        mutationFn: (credentials: { email: string; password: string }) =>
            medusa.admin.auth.createSession(credentials, { withCredentials: true }),
        onSuccess: () => {
            createToken()
            queryClient.invalidateQueries({ queryKey: ['admin'] });
        },
        onError: () => {
            setErrorMsg("Invalid credentials");
        },
    });


    function createToken() {
        try {
            medusa.admin.auth.getToken({
                email: loginPassword.login,
                password: loginPassword.password
            }).then(({ access_token }) => {
                const setCookie = Cookies.set("token", access_token, { expires: 7, });
                setIsLogged(!!setCookie);
            })
        } catch (error) {
            setErrorMsg("failed to create token");
        }
    }
    const showPassword = () => {
        setVisiability(!visiability);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({
            email: loginPassword.login,
            password: loginPassword.password,
        });
        navigate("/main");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginPassword((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    return (
        <div className="container-login">
            <div className="left-side">
                <h1>Medusa POS Application</h1>
                <div className="square"></div>
                <img src="/src/assets/Logotype.svg" alt="medusa-logo" />
            </div>
            <div className="right-side">
                <div className="login-form">
                    <h2>Admin Login</h2>
                    <form className="form" onSubmit={handleLogin}>
                        <span>{errorMsg}</span>
                        <input
                            type="text"
                            placeholder="www.example.com"
                            value={loginPassword.login}
                            name="login"
                            onChange={handleChange}
                        />
                        <div className="password-container">
                            <input
                                type={visiability ? "password" : "text"}
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={loginPassword.password}
                                autoComplete={visiability ? "on" : "off"}
                            />
                            <span onClick={showPassword}>
                                <img
                                    src="/src/assets/IconButton.png"
                                    alt="eye icon"
                                    className="icon-toggle-eye"
                                />
                            </span>
                        </div>
                        <a href="">Forgot your password?</a>
                        <button className="btn-login" type="submit">
                            Login
                        </button>
                    </form>
                    <div className="policies">
                        <Link to="https://medusajs.com">User agreement</Link>
                        <Link to="https://medusajs.com">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;