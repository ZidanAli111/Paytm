import { Heading } from '../components/Heading';
import { SubHeading } from '../components/SubHeading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { BottomWarning } from '../components/BottomWarning';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async () => {
        if (isSubmitting) return; // Prevent multiple submissions
        setIsSubmitting(true); // Indicate that submission is in progress
        setError(""); // Clear previous errors

        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username: email,
                password: password
            });

            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            // Handle and display error message
            setError(error.response?.data?.message || "Signin failed. Please try again.");
        } finally {
            setIsSubmitting(false); // Reset submission state after request completes
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle between showing and hiding password
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />

                    {/* Email input */}
                    <InputBox
                        placeholder={"abc@gmail.com"}
                        label={"Email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Password input with toggle visibility */}
                    <div className="relative">
                        <InputBox
                            placeholder={"******"}
                            label={"Password"}
                            type={showPassword ? "text" : "password"} // Toggle password visibility
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-10"
                            onClick={togglePasswordVisibility}>
                            {showPassword ? "🙈" : "👁️"} {/* Toggle icon */}
                        </button>
                    </div>

                    {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

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
