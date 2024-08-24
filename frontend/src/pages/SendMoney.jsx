import axios from 'axios';
import { useState } from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleTransfer = async () => {
        // Input validation
        if (amount <= 0 || isNaN(amount)) {
            setErrorMessage("Please enter a valid amount.");
            return;
        }

        setIsSubmitting(true);  // Disable multiple submissions
        setErrorMessage('');  // Clear previous errors

        try {
            await axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: id,
                amount: parseFloat(amount) // Convert string input to float
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            // Redirect after successful transfer
            navigate("/dashboard");
        } catch (error) {
            // Handle errors such as insufficient balance, invalid account, or server errors
            const message = error.response?.data?.message || "An error occurred while processing your request.";
            setErrorMessage(message);
        } finally {
            setIsSubmitting(false);  // Re-enable the button
        }
    };

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name?.charAt(0).toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>} {/* Error message display */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="amount">
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => setAmount(e.target.value)}
                                    value={amount}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                    min="0"
                                    disabled={isSubmitting}  // Disable input when submitting
                                />
                            </div>
                            <button
                                onClick={handleTransfer}
                                disabled={isSubmitting}
                                className={`justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full ${isSubmitting ? "bg-gray-400" : "bg-green-500"} text-white`}>
                                {isSubmitting ? "Processing..." : "Initiate Transfer"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};