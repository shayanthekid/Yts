// Import necessary libraries
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Login component
const Login = () => {
    // State to hold username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    // Handle login button click
    const handleLogin = () => {
        // Check if username and password are correct
        if (username === 'admin' && password === 'admin') {
            // Redirect to /admin/createItem on successful login
            // You can use Link to navigate as well
        } else {
            // Display error or handle unsuccessful login
            setInvalidCredentials(true);
            console.log('Invalid credentials');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-gray-100 p-8 rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="w-full px-3 py-2 border rounded-md"
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="w-full px-3 py-2 border rounded-md"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {/* Display invalid credentials message */}
                {invalidCredentials && (
                    <p className="text-red-500 text-sm mb-4">Invalid credentials. Please try again.</p>
                )}
                {/* Use Link to navigate to /admin/createItem */}
                <Link to={username === 'admin' && password === 'admin' ? '/admin/createItem' : ''}>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Login;
