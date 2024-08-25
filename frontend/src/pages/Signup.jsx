import React, { useState, useCallback } from "react";
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
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = useCallback(async () => {
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
    }, [firstName, lastName, username, password, navigate]);

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign Up"} />
                    <SubHeading label={"Create a new account"} />

                    <InputBox
                        placeholder={"John"}
                        label={"First Name"}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <InputBox
                        placeholder={"Doe"}
                        label={"Last Name"}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <InputBox
                        placeholder={"johndoe"}
                        label={"Username"}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="relative">
                        <InputBox
                            placeholder={"******"}
                            label={"Password"}
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-10"
                            onClick={togglePasswordVisibility}>
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>

                    {error && <p className="text-red-500">{error}</p>}

                    <div className="pt-4">
                        <Button
                            label={loading ? "Signing up..." : "Sign Up"}
                            click={handleSignup}
                            disabled={loading}
                        />
                        <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"} />
                    </div>
                </div>
            </div>
        </div>
    );
};
