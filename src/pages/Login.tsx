import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { medusa } from "../lib/medusa-provider";
import Cookies from "js-cookie";
import Logotype from "../assets/Logotype.svg";
import { Button, Heading, Input } from "@medusajs/ui";

const Login = ({ setIsLogged, isLogged }: { isLogged: boolean, setIsLogged: (isLogged: boolean) => void }) => {
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
            setErrorMsg("Invalid email or password. Please try again.");
            setLoginPassword({
                login: "",
                password: ""
            });
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
                if (!!setCookie) {
                    navigate("/main");
                }
            })
        } catch (error) {
            setErrorMsg("Failed to authenticate. Please try again.");
            setLoginPassword({
                login: "",
                password: ""
            });
        }
    }
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!loginPassword.login || !loginPassword.password) {
            setErrorMsg("Please enter both email and password");
            return;
        }
        try {
            await mutation.mutateAsync({
                email: loginPassword.login,
                password: loginPassword.password,
            });
        } catch (error) {
            return;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginPassword((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    return (
        <div className="flex flex-col md:flex-row h-screen p-0 m-0 w-full relative">
            <div className="flex-1 md:bg-[#D9D9D9] flex flex-col items-center justify-around box-border p-5 md:p-[30px_20px]">
                <Heading level="h1" className="text-center font-medium m-0 text-[clamp(1.5rem,3vw,2rem)]">
                    Medusa POS Application
                </Heading>
                <div className="bg-black w-[min(289px,80%)] h-[min(339px,40vh)]"></div>
                <img src={Logotype} alt="medusa-logo" className="md:block pt-[25px] max-w-full h-auto md:static absolute bottom-4 left-1/2 transform -translate-x-1/2 md:transform-none" />
            </div>
            <div className="flex-[1.3] flex justify-center items-center p-3 sm:p-5">
                <div className="w-[95%] max-w-[440px] h-auto min-h-[520px] bg-[#D9D9D9] flex flex-col justify-evenly items-center p-4 sm:p-[clamp(25px,6vw,50px)_clamp(30px,10vw,55px)] rounded-[11px]">
                    <Heading level="h1" className="text-[20px] sm:text-[24px] font-semibold text-center w-full">Admin Login</Heading>
                    <form onSubmit={handleLogin} className="w-full max-w-[330px]">
                        {errorMsg && <span className="text-black text-sm sm:text-base mb-2 block">{errorMsg}</span>}
                        <Input
                            type="text"
                            placeholder="www.example.com"
                            value={loginPassword.login}
                            name="login"
                            onChange={handleChange}
                            className="mb-4 w-full"
                        />
                        <div className="w-full">
                            <Input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={loginPassword.password}
                                className="w-full"
                                defaultValue="supersecret"
                            />
                        </div>
                        <Button
                            className="mt-6 sm:mt-9 w-full p-2 sm:p-[10px] font-semibold text-sm sm:text-base"
                            type="submit"
                        >
                            Login
                        </Button>
                    </form>
                    <div className="text-center w-full mt-4 sm:-mt-[30px] flex flex-wrap justify-center gap-2 sm:gap-[10px]">
                        <Link to="https://medusajs.com" className="no-underline text-black text-xs sm:text-[14px] hover:text-gray-600 transition-colors">
                            User agreement
                        </Link>
                        <Link to="https://medusajs.com" className="no-underline border-l border-black pl-2 sm:pl-[10px] text-black text-xs sm:text-[14px] hover:text-gray-600 transition-colors">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;