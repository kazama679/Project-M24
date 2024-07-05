import React, { useState } from 'react';
import '../../styles/LoginAdmin.scss';

const LoginAdmin: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleLogin = () => {
        if (username === 'admin' && password === 'admin') {
            setError('');
            window.location.href = 'http://localhost:5173/Dashboard';
        } else {
            setError('Không đúng tài khoản hoặc mật khẩu');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Admin Login</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="input-group">
                    <label htmlFor="username" className="input-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="input-field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password" className="input-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={handleLogin} className="login-button">Login</button>
            </div>
        </div>
    );
};

export default LoginAdmin;
