import React, { useState, useCallback } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignIn = useCallback(async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username: email,
                password: password
            });

            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            setError(error.response?.data?.message || "Signin failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }, [email, password, isSubmitting, navigate]);

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />

                    <InputBox
                        placeholder={"abc@gmail.com"}
                        label={"Email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                            {showPassword ? "👁️" : "🙈"}
                        </button>
                    </div>

                    {error && <p className="text-red-500">{error}</p>}

                    <div className="pt-4">
                        <Button
                            label={isSubmitting ? "Signing in..." : "Sign in"}
                            click={handleSignIn}
                            disabled={isSubmitting}
                        />
                        <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
                    </div>
                </div>
            </div>
        </div>
    );
};