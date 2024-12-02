import React, { useState, FormEvent } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './loginPage.css';
import { useStudent } from '../../components/useStudent/useStudent';

const LoginPage: React.FC = () => {
  const { updateStudent } = useStudent();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = { id: '1', name: 'Test Student', username }; // Mocked successful login
    if (result.id) {
      updateStudent(result);
      navigate('/calendar');
    } else {
      setPassword('');
      setError('Login Error');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 className="form-title">Sign In</h1>
      <div className="input-group">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="input-group password-container">
        <label>Password:</label>
        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="eye-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
      </div>
      <div className="auth-links">
        <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
        <a href="/create-user" className="create-account">Create new account</a>
      </div>
{error && <span className="error-message">{error}</span>}

      <button className="submit-button" type="submit">Sign In</button>
    </form>
  );
};

export default LoginPage;
