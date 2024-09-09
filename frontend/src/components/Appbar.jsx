import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const Appbar = React.memo(() => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4 font-medium text-2xl text-gray-500">
                PayTM App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center font-semibold text-xl h-full mr-4">
                    Hello
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl font-semibold">U</div>
                </div>
                <div className="mr-4 mt-2">
                    <Button label={"Logout"} click={handleLogout} />
                </div>
            </div>
        </div>
    );
});