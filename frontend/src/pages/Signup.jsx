import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName
            });
            localStorage.setItem("token", response.data.token);
            navigate("/signin");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle between showing and hiding password
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        placeholder="John"
                        label={"First Name"}
                    />
                    <InputBox
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        placeholder="Doe"
                        label={"Last Name"}
                    />
                    <InputBox
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        placeholder="john@gmail.com"
                        label={"Email"}
                    />

                    {/* Password field with toggle visibility */}
                    <div className="relative">
                        <InputBox
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            type={showPassword ? "text" : "password"}  // Toggle password visibility
                            placeholder="******"  // Asterisk placeholders
                            label={"Password"}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-10"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "🙈" : "👁️"}  {/* Toggle icon */}
                        </button>
                    </div>

                    {error && <p className="text-red-500">{error}</p>}

                    <div className="pt-4">
                        <Button
                            click={handleSignup}
                            label={loading ? "Signing up..." : "Sign up"}
                            disabled={loading}
                        />
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>
        </div>
    );
};