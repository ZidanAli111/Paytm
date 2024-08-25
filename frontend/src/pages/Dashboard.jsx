import React, { useEffect, useState } from 'react';
import { Appbar } from '../components/Appbar';
import { Balance } from '../components/Balance';
import { Users } from '../components/Users';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const balanceResponse = await axios.get('http://localhost:3000/api/v1/account/balance', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const roundedBalance = balanceResponse.data.balance.toFixed(2);
                setBalance(roundedBalance);

                // Fetch users only after balance is fetched
                const usersResponse = await axios.get('http://localhost:3000/api/v1/user/bulk', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUsers(usersResponse.data.user);
            } catch (error) {
                if (error.response?.status === 403) {
                    localStorage.removeItem('token');
                    navigate('/signin');
                } else {
                    setError(error.response?.data?.message || "An error occurred while fetching data.");
                }
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div>
            <Appbar />
            <div className='m-8'>
                {error && <p className='text-red-500'>{error}</p>}
                {balance !== null ? <Balance value={balance} /> : <p>Loading balance...</p>}
                <Users />
            </div>
        </div>
    );
};
