import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import debounce from 'lodash.debounce';

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchUsers = useCallback(async (filterValue) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filterValue}`);
            setUsers(response.data.user);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const debouncedFetchUsers = useCallback(
        debounce((filterValue) => fetchUsers(filterValue), 500), [fetchUsers]
    );

    useEffect(() => {
        debouncedFetchUsers(filter);
        return () => {
            debouncedFetchUsers.cancel();
        };
    }, [filter, debouncedFetchUsers]);

    return (
        <div className="mt-6">
            <div className="font-bold text-lg">Users</div>
            <div className="my-2">
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded border-slate-300"
                />
            </div>
            {loading ? (
                <div className="items-center">Loading users...</div>
            ) : (
                <div>
                    {users.length > 0 ? (
                        users.map((user) => <MemoizedUser user={user} key={user._id} />)
                    ) : (
                        <div>No users found</div>
                    )}
                </div>
            )}
        </div>
    );
};

const User = ({ user }) => {
    const navigate = useNavigate();
    const [isSending, setIsSending] = useState(false);

    const handleSendMoney = () => {
        setIsSending(true);
        navigate(`/send?id=${user._id}&name=${user.firstName}`);
        setIsSending(false);
    };

    return (
        <div className="flex justify-center my-2">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mt-1 mr-2">
                    <span className="text-xl">{user.firstName[0]}</span>
                </div>
                <div className="flex flex-col justify-center">
                    <div>{`${user.firstName} ${user.lastName}`}</div>
                </div>
            </div>
            <div className="flex flex-col justify-center ml-4">
                <Button
                    click={handleSendMoney}
                    label={isSending ? "Sending..." : "Send Money"}
                    disabled={isSending}
                />
            </div>
        </div>
    );
};

// Memoized User component to prevent unnecessary re-renders
const MemoizedUser = React.memo(User);
